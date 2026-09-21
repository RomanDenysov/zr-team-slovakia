# ZR Team Slovakia — web

Next.js 16 (App Router) frontend with Payload CMS 3 running inside the same
app. One deployable: the public site, the admin panel at `/admin` and the REST
/ GraphQL API at `/api`.

## Requirements

- Node `>=22.12`
- pnpm 10
- PostgreSQL 16 (Neon, Vercel Postgres or a local server)

## Getting started

```sh
cp .env.example .env      # fill in PAYLOAD_SECRET and DATABASE_URI
pnpm install
pnpm migrate              # apply committed schema migrations
pnpm seed                 # optional — loads the demo content
pnpm dev                  # http://localhost:3000, admin at /admin
```

The first visit to `/admin` asks you to create an admin user. To create one
from the seed instead, set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before
running `pnpm seed`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Next dev server |
| `pnpm build` / `pnpm start` | production build / serve |
| `pnpm vercel-build` | `payload migrate` then `next build` — used by Vercel |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm seed` | create-or-update the demo content in all three languages |
| `pnpm generate:types` | regenerate `src/payload-types.ts` after a schema change |
| `pnpm generate:importmap` | regenerate the admin import map after adding custom components |
| `pnpm migrate:create` / `pnpm migrate` | Payload database migrations |

Run `generate:types` whenever you change a collection or global — the frontend
is typed against its output.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `PAYLOAD_SECRET` | yes | signs auth tokens. Generate with `openssl rand -base64 32` |
| `DATABASE_URI` | yes | Postgres URL. `DATABASE_URL` (Neon) and `POSTGRES_URL` (Vercel Postgres) are accepted as aliases. Use the pooled URL on serverless |
| `NEXT_PUBLIC_SERVER_URL` | yes in production | canonical URLs, sitemap, hreflang. On Vercel Preview, `https://$VERCEL_URL` is used if this is unset |
| `BLOB_READ_WRITE_TOKEN` | yes on Vercel | switches uploads to Vercel Blob; without it files go to `public/media`, which serverless hosts cannot write. Auto-set if you attach a Blob store |
| `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO` | no | emails form submissions to the club; without them submissions are still stored |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | no | create the first `/admin` user from `pnpm seed` |

The Vercel project root directory is `web`. `web/vercel.json` pins the
framework to Next.js (the production project was created as Astro) and runs
`pnpm vercel-build`.

## Layout

```
src/
├── app/
│   ├── (frontend)/[locale]/   public site — one root layout per locale
│   └── (payload)/             admin UI and REST/GraphQL routes
├── collections/               Payload collections
├── globals/                   Payload globals (site settings, about page)
├── components/                React components, grouped by feature
├── i18n/                      locale config and UI strings
├── lib/                       Payload local-API accessors and view models
├── migrations/                committed Postgres schema
├── seed/                      demo content + seed runner
└── payload.config.ts
```

## Languages and URLs

Slovak is the default locale and is served without a prefix; English and
Ukrainian are prefixed:

```
/schedule      /en/schedule      /uk/schedule
```

`src/middleware.ts` rewrites unprefixed paths onto `/sk/*` internally, and
`next.config.mjs` redirects any explicit `/sk/*` request back to the bare path.
Content is translated in Payload (field-level localization, Slovak as the
fallback); UI labels live in `src/i18n/messages/`.

## Rendering

Every public page is statically generated at build time from the Payload local
API. Editing content in `/admin` triggers `revalidatePath('/', 'layout')` via
collection hooks, so changes go live without a redeploy.

`pnpm build` needs a reachable Postgres (`PAYLOAD_SECRET` + a database URL).
That is also why a Vercel Preview fails until those variables are set on the
project for the Preview environment.
