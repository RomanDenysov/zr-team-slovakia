# Working in this project

Next.js 16 App Router + Payload CMS 3 in a single app. See `README.md` for
setup, scripts and environment variables.

## Ground rules

- **Server components by default.** Data comes from the Payload local API
  through `src/lib/content.ts`; only interactive leaves (`ScheduleBoard`,
  `Nav`, modals, forms) are `'use client'`. Do not fetch content in the client.
- **Regenerate types after schema edits.** Change a collection or global →
  `pnpm generate:types`. `src/payload-types.ts` is generated; never edit it.
- **Schema changes need a migration.** After editing collections/globals run
  `pnpm migrate:create` and commit `src/migrations/`. Do not rely on `push`.
- **Content vs. labels.** Editorial copy belongs in Payload. Only UI chrome
  (button labels, section kickers, weekday names) belongs in
  `src/i18n/messages/`, and every string must exist in all three locales —
  `Messages` is a closed interface, so TypeScript will tell you.
- **URLs are load-bearing.** Slovak is unprefixed, `/en/*` and `/uk/*` are
  prefixed. Routing lives in `src/middleware.ts` plus the redirects in
  `next.config.mjs`; changing either changes public URLs.
- **A `'use server'` module may only export async functions.** Shared state and
  types for actions live in `src/actions/form-state.ts`.

## Before you finish

```sh
pnpm typecheck
pnpm build
```

A local Postgres must be reachable for `build` — pages are prerendered from the
database. Required env is listed in `.env.example`.

## Documentation

- Next.js App Router — https://nextjs.org/docs/app
- Payload — https://payloadcms.com/docs
- Payload localization — https://payloadcms.com/docs/configuration/localization
- Lexical rich text — https://payloadcms.com/docs/rich-text/overview
