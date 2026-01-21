/*
 * Antora extension: sources-parallel
 * Goal: Provide an extension hook and configuration to enable per-source/module parallel execution.
 * Note: This initial scaffold computes worker count and logs activation; it does not yet override the
 *       generator pipeline. It is designed to remain safe/inert while we iterate on true parallelism.
 */

const os = require('os')

function computeWorkers (min = 3) {
  const cores = Array.isArray(os.cpus()) ? os.cpus().length : 1
  return Math.max(min, cores || 1)
}

module.exports = function (registry) {
  // Antora passes the playbook to hooks; we use playbookBuilt to read extension options
  const logger = console

  registry.on('playbookBuilt', ({ playbook }) => {
    try {
      // Locate our extension options if provided via the playbook extensions entry
      // When listed as: { require: './js/sources-parallel.js', sources_parallel: true, max_workers: N }
      // Antora makes extension options available via playbook.get('antora.extensions') for some APIs;
      // since this is not a public API surface, we defensively parse from the raw object when possible.
      const raw = playbook && (playbook.asMutable?.() || playbook)
      const extensions = raw?.antora?.extensions || []
      const selfEntry = Array.isArray(extensions)
        ? extensions.find((e) => (e && (e.require === './js/sources-parallel.js' || e.require === 'js/sources-parallel.js')))
        : undefined

      const enabled = !!(selfEntry && (selfEntry.sources_parallel === true || selfEntry.enabled === true))
      const minWorkers = typeof selfEntry?.min_workers === 'number' ? selfEntry.min_workers : 3
      const configuredMax = typeof selfEntry?.max_workers === 'number' ? selfEntry.max_workers : undefined

      const autoWorkers = computeWorkers(minWorkers)
      const workers = configuredMax && configuredMax > 0 ? configuredMax : autoWorkers

      if (!enabled) {
        logger.log(`[sources-parallel] Loaded (disabled). Computed workers=${workers}. No changes applied.`)
        return
      }

      // Expose workers via env to allow future cooperation with other extensions/tools
      if (!process.env.ANTORA_SOURCES_PARALLEL_WORKERS) {
        process.env.ANTORA_SOURCES_PARALLEL_WORKERS = String(workers)
      }

      // Placeholder: future iterations will patch the generator to fan-out per-source work.
      logger.log(`[sources-parallel] Enabled with workers=${workers}. Parallel generation hooks not yet active (scaffold).`)
    } catch (e) {
      logger.warn(`[sources-parallel] Failed to initialize: ${e && e.message ? e.message : e}`)
    }
  })
}
