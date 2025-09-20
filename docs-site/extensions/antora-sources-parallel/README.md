# antora-sources-parallel

Antora extension to enable parallel-friendly builds. Phase 1 provides safe concurrency hints; a future phase can implement per-source fan-out.

## Install / Use (local)

In your Antora playbook:

```yaml
antora:
  extensions:
    - require: ./extensions/antora-sources-parallel
      sources_parallel: true
      # Optional tuning:
      # min_workers: 3
      # max_workers: 8
```

This extension computes a worker count based on your CPU core count (or `min_workers`, default 3), and sets the following environment variables if not already set:
- `ANTORA_FETCH_CONCURRENCY`
- `ANTORA_CONCURRENCY`
- `ANTORA_SOURCES_PARALLEL_WORKERS`

These hints can be used by Antora and cooperating extensions to perform work in parallel.

## As a separate package

When extracted to its own repository and published, you can use:

```yaml
antora:
  extensions:
    - require: antora-sources-parallel
      sources_parallel: true
```

## Experimental features

- `experimental_fanout: true` is reserved for a future release supporting per-source fan-out. It is currently not implemented and ignored aside from a warning.

## License

Apache-2.0


## Per-source fan-out (experimental)

This package includes an optional fan-out orchestrator that builds each content source in parallel and merges outputs.

How to use locally:

- Ensure you are in the docs-site directory and have installed dependencies (npm install)
- Run:

```
npm run antora-fanout
```

What it does:
- Splits the playbook’s content.sources into separate temporary playbooks
- Runs `npx antora` for each in parallel (workers derived from CPU count or env), outputting to build/.fanout/<idx>
- Merges all shard outputs into build/site

Tuning:
- Set one of these env vars to control concurrency: ANTORA_SOURCES_PARALLEL_WORKERS, ANTORA_CONCURRENCY, ANTORA_FETCH_CONCURRENCY

Notes:
- The standard build (npx antora antora-playbook.yml) remains unchanged; fan-out is opt-in
- Collisions in generated files are resolved "last writer wins" during merge

## CI usage and performance tips

- Fast path in CI: run the parallel fan-out without Lunr indexing.
  - From docs-site/: npm run antora:ci
  - Equivalent: node ./extensions/antora-sources-parallel/bin/fanout.js antora-playbook.yml --no-lunr
  - You can also set ANTORA_NO_LUNR=1 instead of passing --no-lunr.

- Concurrency tuning:
  - ANTORA_SOURCES_PARALLEL_WORKERS: hard limit for shard workers.
  - ANTORA_CONCURRENCY / ANTORA_FETCH_CONCURRENCY: generic hints also used by some tools.
  - Default worker count is max(cpu cores, 3).

- Caching:
  - The extension sets ANTORA_CACHE_DIR to build/.cache if not already set.
  - Configure your CI to cache the docs-site/build/.cache directory between runs to reduce repeated work.

- Release builds (with search index):
  - Use npm run antora-fanout to keep Lunr enabled while still running per-source in parallel.
  - Or run the standard Antora command if you prefer the traditional single-process path.

- No Makefile changes required:
  - Keep Makefile as-is; point CI to run the npm script from docs-site instead.
