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
