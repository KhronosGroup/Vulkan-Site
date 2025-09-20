/*
 * Antora extension: antora-sources-parallel
 * Goal: Provide an extension hook and configuration to enable per-source/module parallel execution.
 * Phase 1: Safe concurrency activation via environment hints (fetch/build), with worker count policy.
 * Phase 2 (future): Optional fan-out per-source builds and merge (experimental, off by default).
 */

const os = require('os')

function computeWorkers (min = 3) {
  const cores = Array.isArray(os.cpus()) ? os.cpus().length : 1
  return Math.max(min, cores || 1)
}

module.exports = function (registry) {
  const logger = console

  registry.on('playbookBuilt', ({ playbook }) => {
    try {
      const raw = playbook && (playbook.asMutable?.() || playbook)
      const extensions = raw?.antora?.extensions || []
      const selfEntry = Array.isArray(extensions)
        ? extensions.find((e) => (e && (e.require === 'antora-sources-parallel' || e.require === './extensions/antora-sources-parallel' || e.require === './extensions/antora-sources-parallel/index.js' || e.require === './js/sources-parallel.js')))
        : undefined

      const enabled = !!(selfEntry && (selfEntry.sources_parallel === true || selfEntry.enabled === true))
      const minWorkers = typeof selfEntry?.min_workers === 'number' ? selfEntry.min_workers : 3
      const configuredMax = typeof selfEntry?.max_workers === 'number' ? selfEntry.max_workers : undefined

      const autoWorkers = computeWorkers(minWorkers)
      const workers = configuredMax && configuredMax > 0 ? configuredMax : autoWorkers

      if (!enabled) {
        logger.log(`[antora-sources-parallel] Loaded (disabled). Computed workers=${workers}. No changes applied.`)
        return
      }

      // Expose workers via env to encourage Antora and other extensions to leverage concurrency
      // These envs are de-facto hints; if Antora honors them, great; otherwise harmless.
      const envHints = [
        'ANTORA_FETCH_CONCURRENCY', // potential fetch concurrency
        'ANTORA_CONCURRENCY', // generic task concurrency
        'ANTORA_SOURCES_PARALLEL_WORKERS', // our own explicit value for cooperating tools
      ]
      for (const key of envHints) {
        if (!process.env[key]) process.env[key] = String(workers)
      }

      // Encourage Antora cache reuse in CI/local unless already specified
      if (!process.env.ANTORA_CACHE_DIR) {
        // Use a project-local cache directory so CI can persist it as an artifact between runs
        process.env.ANTORA_CACHE_DIR = require('path').join(process.cwd(), 'build', '.cache')
      }

      logger.log(`[antora-sources-parallel] Enabled with workers=${workers}. Concurrency env hints set: ${envHints.join(', ')}. Cache dir: ${process.env.ANTORA_CACHE_DIR}`)

      // Experimental fan-out guidance
      const experimental = selfEntry?.experimental_fanout === true
      if (experimental) {
        logger.warn('[antora-sources-parallel] Experimental fan-out enabled in playbook. To run per-source fan-out, execute: npm run antora-fanout (from docs-site). Default antora run remains single-process (env-hint mode only).')
      }
    } catch (e) {
      logger.warn(`[antora-sources-parallel] Failed to initialize: ${e && e.message ? e.message : e}`)
    }
  })
}
