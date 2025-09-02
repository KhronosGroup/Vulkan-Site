#!/usr/bin/env node
/*
 * antora-sources-parallel: per-source fan-out orchestrator (experimental)
 *
 * Usage (from docs-site/):
 *   node ./extensions/antora-sources-parallel/bin/fanout.js antora-playbook.yml
 *
 * Behavior:
 *   - Reads the provided playbook
 *   - Splits content.sources into one playbook per source
 *   - Runs `npx antora <temp-playbook>` for each in parallel (bounded by worker limit)
 *   - Each run outputs into build/.fanout/<idx>
 *   - After completion, merges all into build/site (last write wins on collisions)
 *
 * Notes:
 *   - This is an optional runner; it does not modify Antora itself.
 *   - Requires dev deps: @antora/cli, @antora/site-generator in docs-site
 *   - Uses js-yaml as a dependency of the local extension package.
 */

const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const { spawn } = require('child_process')
const yaml = require('js-yaml')
const os = require('os')

function cpuWorkers (min = 3) {
  const cores = Array.isArray(os.cpus()) ? os.cpus().length : 1
  return Math.max(min, cores || 1)
}

function getWorkersFromEnv () {
  const envKeys = ['ANTORA_SOURCES_PARALLEL_WORKERS', 'ANTORA_CONCURRENCY', 'ANTORA_FETCH_CONCURRENCY']
  for (const k of envKeys) {
    const v = process.env[k]
    if (v && +v > 0) return +v
  }
  return cpuWorkers(3)
}

async function readYaml (file) {
  const text = await fsp.readFile(file, 'utf8')
  return yaml.load(text)
}

async function writeYaml (file, obj) {
  const text = yaml.dump(obj, { noRefs: true, lineWidth: 120 })
  await fsp.writeFile(file, text, 'utf8')
}

async function rimraf (p) {
  await fsp.rm(p, { recursive: true, force: true })
}

async function mkdirp (p) {
  await fsp.mkdir(p, { recursive: true })
}

function runAntora (cwd, playbookPath) {
  return new Promise((resolve, reject) => {
    const cacheDir = process.env.ANTORA_CACHE_DIR
    const args = ['antora', playbookPath, '--stacktrace']
    if (cacheDir) {
      args.push('--cache-dir', cacheDir)
    }
    const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, {
      cwd,
      stdio: 'inherit',
      env: process.env,
    })
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`antora exited with code ${code}`))
    })
    child.on('error', reject)
  })
}

async function copyRecursive (src, dest) {
  const st = await fsp.stat(src)
  if (st.isDirectory()) {
    await mkdirp(dest)
    const entries = await fsp.readdir(src)
    for (const e of entries) {
      await copyRecursive(path.join(src, e), path.join(dest, e))
    }
  } else if (st.isFile()) {
    await mkdirp(path.dirname(dest))
    await fsp.copyFile(src, dest)
  }
}

async function mergeDirs (srcDir, dstDir) {
  await mkdirp(dstDir)
  const entries = await fsp.readdir(srcDir)
  for (const e of entries) {
    await copyRecursive(path.join(srcDir, e), path.join(dstDir, e))
  }
}

function isLikelyUrl (val) {
  return typeof val === 'string' && /^(https?:)?\/\//i.test(val)
}

function isRelativePath (val) {
  return typeof val === 'string' && (val.startsWith('./') || val.startsWith('../'))
}

function rebasePlaybookPaths (pb, rootDir) {
  if (!pb || !rootDir) return pb
  // Rebase AsciiDoc extensions that are relative paths
  if (pb.asciidoc && Array.isArray(pb.asciidoc.extensions)) {
    pb.asciidoc.extensions = pb.asciidoc.extensions.map((ext) => {
      if (typeof ext === 'string' && isRelativePath(ext)) {
        return path.resolve(rootDir, ext)
      } else if (ext && typeof ext === 'object' && isRelativePath(ext.require)) {
        return { ...ext, require: path.resolve(rootDir, ext.require) }
      }
      return ext
    })
  }
  // Rebase Antora extensions whose require is a relative path
  if (pb.antora && Array.isArray(pb.antora.extensions)) {
    pb.antora.extensions = pb.antora.extensions.map((e) => {
      if (e && typeof e === 'object' && typeof e.require === 'string' && isRelativePath(e.require)) {
        return { ...e, require: path.resolve(rootDir, e.require) }
      }
      return e
    })
  }
  // Rebase UI bundle local file URL
  if (pb.ui && pb.ui.bundle && typeof pb.ui.bundle.url === 'string') {
    const u = pb.ui.bundle.url
    if (!isLikelyUrl(u) && !path.isAbsolute(u)) {
      pb.ui.bundle.url = path.resolve(rootDir, u)
    }
  }
  return pb
}

async function main () {
  const docsSiteDir = process.cwd()
  const argv = process.argv.slice(2)
  const playbookArg = argv[0] || 'antora-playbook.yml'
  const disableLunr = argv.includes('--no-lunr') || process.env.ANTORA_NO_LUNR === '1'
  const playbookPath = path.resolve(docsSiteDir, playbookArg)

  // Encourage cache reuse if not already configured
  if (!process.env.ANTORA_CACHE_DIR) {
    process.env.ANTORA_CACHE_DIR = path.join(docsSiteDir, 'build', '.cache')
  }
  await mkdirp(process.env.ANTORA_CACHE_DIR)
  console.log(`[fanout] Using Antora cache dir: ${process.env.ANTORA_CACHE_DIR}`)

  const playbook = await readYaml(playbookPath)
  const sources = playbook?.content?.sources
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error('No content.sources found in playbook')
  }

  // Expand any sources that specify start_paths into separate shards per path
  const expandedSources = []
  for (const s of sources) {
    if (s && Array.isArray(s.start_paths) && s.start_paths.length > 0) {
      for (const sp of s.start_paths) {
        const ns = { ...s }
        delete ns.start_paths
        ns.start_path = sp
        expandedSources.push(ns)
      }
    } else {
      expandedSources.push(s)
    }
  }

  const workers = getWorkersFromEnv()
  const fanoutRoot = path.join(docsSiteDir, 'build', '.fanout')
  const finalOut = path.join(docsSiteDir, 'build', 'site')

  await rimraf(fanoutRoot)
  await mkdirp(fanoutRoot)

  // Prepare per-source playbooks
  const tasks = expandedSources.map((src, idx) => ({ src, idx }))

  // Create temp playbooks with single source and per-run output dir
  const tempPlaybooks = []
  for (const { src, idx } of tasks) {
    let pb = JSON.parse(JSON.stringify(playbook))
    pb.content.sources = [src]

    // Remove lunr extension for shard builds to avoid per-shard indexing; we'll build it once globally later (unless disabled)
    if (pb.antora && Array.isArray(pb.antora.extensions)) {
      pb.antora.extensions = pb.antora.extensions.filter((e) => !(e && e.require === '@antora/lunr-extension'))
    }

    // Rebase any relative paths to absolute paths from docs-site root so antora resolves them correctly
    pb = rebasePlaybookPaths(pb, docsSiteDir)

    // Ensure output writes to unique dir per shard
    pb.output = pb.output || {}
    pb.output.dir = path.join('build', '.fanout', String(idx))

    const file = path.join(fanoutRoot, `playbook-${idx}.yml`)
    await writeYaml(file, pb)
    tempPlaybooks.push({ idx, file, outDir: path.join(docsSiteDir, pb.output.dir) })
  }

  // Run in parallel with a simple pool
  let inFlight = 0
  let i = 0
  let failed = false

  await rimraf(finalOut)
  await mkdirp(finalOut)

  await new Promise((resolve) => {
    const next = () => {
      if (failed) return
      if (i >= tempPlaybooks.length && inFlight === 0) return resolve()
      while (inFlight < workers && i < tempPlaybooks.length) {
        const { file, idx } = tempPlaybooks[i++]
        inFlight++
        runAntora(docsSiteDir, file)
          .then(() => {
            inFlight--
            next()
          })
          .catch((err) => {
            console.error(`[fanout] build failed for shard ${idx}:`, err.message)
            failed = true
            inFlight--
            next()
          })
      }
    }
    next()
  })

  if (failed) {
    process.exitCode = 1
    console.error('[fanout] One or more shards failed')
    return
  }

  // Merge outputs
  for (const { outDir } of tempPlaybooks) {
    // Expect outDir like build/.fanout/<idx>
    await mergeDirs(outDir, finalOut)
  }

  console.log(`[fanout] Completed per-source build for ${tasks.length} sources with workers=${workers}`)
  console.log(`[fanout] Output merged to: ${finalOut}`)

  // If Lunr is not explicitly disabled, build a global search index
  if (!disableLunr) {
    const mode = (process.env.ANTORA_LUNR_MODE || 'fast').toLowerCase()
    if (mode === 'antora') {
      // Legacy path: run Antora lunr extension once
      const indexOut = path.join(docsSiteDir, 'build', '.fanout', 'index')
      let indexPb = JSON.parse(JSON.stringify(playbook))
      if (indexPb.antora && Array.isArray(indexPb.antora.extensions)) {
        const hasLunr = indexPb.antora.extensions.some((e) => e && e.require === '@antora/lunr-extension')
        if (!hasLunr) indexPb.antora.extensions.unshift({ require: '@antora/lunr-extension', index_latest_only: true })
      }
      indexPb = rebasePlaybookPaths(indexPb, docsSiteDir)
      indexPb.output = indexPb.output || {}
      indexPb.output.dir = path.relative(docsSiteDir, indexOut)
      const indexPlaybookFile = path.join(fanoutRoot, 'playbook-index.yml')
      await writeYaml(indexPlaybookFile, indexPb)
      console.log('[fanout] Building global Lunr index with Antora (legacy)...')
      try {
        await runAntora(docsSiteDir, indexPlaybookFile)
        // Copy search-index artifacts from indexOut into finalOut
        const entries = await fsp.readdir(indexOut)
        const indexFiles = entries.filter((name) => /^search-index\..*/.test(name))
        for (const name of indexFiles) {
          const src = path.join(indexOut, name)
          const dst = path.join(finalOut, name)
          await mkdirp(path.dirname(dst))
          await fsp.copyFile(src, dst)
        }
        if (indexFiles.length) {
          console.log(`[fanout] Copied global Lunr artifacts to final site: ${indexFiles.join(', ')}`)
        } else {
          console.warn('[fanout] No search-index.* artifacts found to copy. Verify lunr extension configuration.')
        }
      } catch (e) {
        console.error('[fanout] Global Lunr index build failed (Antora):', e && e.message ? e.message : e)
        process.exitCode = 1
        return
      }
    } else {
      // Fast path: build directly from merged site
      const indexer = path.join(__dirname, 'build-lunr-from-site.js')
      console.log('[fanout] Building global Lunr index from merged site (fast path)...')
      try {
        // invoke Node child process to avoid leaking state
        await new Promise((resolve, reject) => {
          const env = { ...process.env }
          // Use conservative IO concurrency by default to reduce memory pressure
          if (!env.ANTORA_LUNR_IO_WORKERS) env.ANTORA_LUNR_IO_WORKERS = '2'
          const child = require('child_process').spawn(process.execPath, [indexer, path.join(docsSiteDir, 'build', 'site')], {
            cwd: docsSiteDir,
            stdio: 'inherit',
            env,
          })
          child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`indexer exited with code ${code}`))))
          child.on('error', reject)
        })
      } catch (e) {
        console.warn('[fanout] Fast Lunr indexer failed; falling back to Antora:', e && e.message ? e.message : e)
        process.env.ANTORA_LUNR_MODE = 'antora'
        return await (async () => { // recurse into legacy path
          const indexOut = path.join(docsSiteDir, 'build', '.fanout', 'index')
          let indexPb = JSON.parse(JSON.stringify(playbook))
          if (indexPb.antora && Array.isArray(indexPb.antora.extensions)) {
            const hasLunr = indexPb.antora.extensions.some((e) => e && e.require === '@antora/lunr-extension')
            if (!hasLunr) indexPb.antora.extensions.unshift({ require: '@antora/lunr-extension', index_latest_only: true })
          }
          indexPb = rebasePlaybookPaths(indexPb, docsSiteDir)
          indexPb.output = indexPb.output || {}
          indexPb.output.dir = path.relative(docsSiteDir, indexOut)
          const indexPlaybookFile = path.join(fanoutRoot, 'playbook-index.yml')
          await writeYaml(indexPlaybookFile, indexPb)
          await runAntora(docsSiteDir, indexPlaybookFile)
          const entries = await fsp.readdir(indexOut)
          const indexFiles = entries.filter((name) => /^search-index\..*/.test(name))
          for (const name of indexFiles) {
            const src = path.join(indexOut, name)
            const dst = path.join(finalOut, name)
            await mkdirp(path.dirname(dst))
            await fsp.copyFile(src, dst)
          }
        })()
      }
    }
  } else {
    console.log('[fanout] Lunr disabled (--no-lunr). Skipping global index pass.')
  }
}

main().catch((e) => {
  console.error('[fanout] fatal:', e && e.message ? e.message : e)
  process.exit(1)
})
