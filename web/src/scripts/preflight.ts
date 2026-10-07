import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Runs before `payload migrate` in `vercel-build`.
 *
 * If Payload was ever started in dev mode with schema `push` against this
 * database, `payload_migrations` holds a row with batch -1 and
 * `payload migrate` stops to ask "data loss will occur — proceed?". A build
 * has no one to answer, so the deploy hangs until Vercel kills it at 45
 * minutes, with nothing in the log. Fail fast with an explanation instead.
 */
async function preflight() {
  const payload = await getPayload({ config })

  let devPushMarkers = 0
  try {
    const { totalDocs } = await payload.find({
      collection: 'payload-migrations',
      where: { batch: { equals: -1 } },
      limit: 1,
      depth: 0,
    })
    devPushMarkers = totalDocs
  } catch {
    // Fresh database — the migrations table does not exist yet.
  }

  if (devPushMarkers > 0) {
    console.error(
      [
        '',
        '✗ This database was modified by Payload in dev mode (schema push).',
        '  `payload migrate` would wait forever for a confirmation, so the build stops here.',
        '',
        '  Fix: reset this database (in Neon: reset the branch, or drop its tables)',
        '  and redeploy — the build migrates and seeds an empty database by itself.',
        '  Do not run `pnpm dev` with push enabled against a shared database.',
        '',
      ].join('\n'),
    )
    process.exit(1)
  }

  payload.logger.info('Preflight OK — no dev-mode schema push in this database.')
  process.exit(0)
}

preflight().catch((error) => {
  console.error(error)
  process.exit(1)
})
