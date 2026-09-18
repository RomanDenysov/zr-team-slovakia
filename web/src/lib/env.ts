/**
 * Environment helpers shared by Payload config, the local API, and metadata.
 * Keep this module free of Payload/Next imports so either runtime can load it.
 */

/**
 * Postgres URL. Accepts the names used by Payload, Neon, and Vercel Postgres
 * so attaching a marketplace database just works.
 */
export function getDatabaseUri(): string | undefined {
  const value =
    process.env.DATABASE_URI ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  return value || undefined
}

/**
 * Canonical public origin. Falls back to the current Vercel deployment URL
 * so Preview sitemap/hreflang tags are not `localhost`.
 */
export function getServerURL(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL
  if (explicit) return explicit.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return undefined
}

/**
 * Fail with an actionable message instead of Payload's "missing secret key"
 * during `next build` page generation.
 */
export function assertPayloadRuntimeEnv(): void {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error(
      'PAYLOAD_SECRET is not set. Generate one with `openssl rand -base64 32` and add it under Vercel → Project Settings → Environment Variables (Production, Preview, and Development). See web/.env.example.',
    )
  }

  if (!getDatabaseUri()) {
    throw new Error(
      'No Postgres URL found. Set DATABASE_URI, or connect Neon / Vercel Postgres (DATABASE_URL / POSTGRES_URL). `next build` prerenders pages from the database, so a reachable Postgres is required. See web/.env.example.',
    )
  }
}
