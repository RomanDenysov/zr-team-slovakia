# Migration plan: Astro + Sanity → Next.js + Payload CMS

**Status: implemented.** The rewrite landed in one change on
`claude/nextjs-payloadcms-migration-2b2ncj`; `web/` is now the Next + Payload
app and `studio/` is gone. This document is kept as the record of what the old
stack looked like and why the new one is shaped the way it is — see
§10 for where the implementation deviates from the plan below.

Author: prepared from a full read of `web/` and `studio/` at commit `65a9853`

---

## 1. Where the project is today

### 1.1 Repo shape

Two independent pnpm projects, no workspace root:

```
/
├── ZRTeam Website.dc.html   # original design prototype (732 lines, inline-styled mockup)
├── web/                     # Astro 7 frontend (own pnpm-lock)
└── studio/                  # Sanity Studio v6 (own pnpm-lock)
```

### 1.2 Frontend (`web/`)

| Aspect | Current state |
| --- | --- |
| Framework | Astro `^7.0.4`, static output (no adapter → SSG) |
| Styling | Tailwind `^4.2.1` via `@tailwindcss/vite`, CSS-first `@theme` tokens in `src/styles/global.css` (271 lines) |
| Fonts | Google Fonts `<link>` in `layouts/main.astro` (Oswald / Barlow / Barlow Condensed) |
| CMS client | `@sanity/astro` (`sanity:client` virtual module), GROQ via `defineQuery`, types generated to `web/sanity.types.ts` |
| i18n | Astro `i18n` config: `sk` (default, unprefixed), `en`, `uk`; rest-param routes `src/pages/[...locale]/…`; `redirects` collapse `/sk/*` → `/*` |
| Interactivity | One 717-line vanilla script `src/scripts/site.ts` doing `innerHTML` templating |
| Analytics | `@vercel/analytics/astro` → deployment is Vercel (no `vercel.json` present) |
| Tests / lint / CI | None |

Routes (7 page files):

```
/[...locale]/index.astro          → /            /en            /uk
/[...locale]/schedule.astro       → /schedule    /en/schedule   /uk/schedule
/[...locale]/events.astro         → /events      …
/[...locale]/events/[slug].astro  → /events/:slug
/[...locale]/posts.astro          → /posts
/[...locale]/posts/[slug].astro   → /posts/:slug
/[...locale]/about.astro          → /about
/[...locale]/partners.astro       → /partners
/[...locale]/[slug].astro         → /:slug   (generic Sanity `page`)
```

### 1.3 The `site.ts` problem (the single biggest item in this migration)

`web/src/scripts/site.ts` is a client-side re-implementation of most of the UI. The server renders empty containers (`<div data-schedule-grid>`, `<div data-events-preview>`, …), ships the data as JSON in `<script type="application/json">` tags (`EventsData.astro`, `ScheduleData.astro`), and the script fills them in with hand-escaped HTML strings.

It currently owns:

- schedule week grid + class cards + legend, with location (`KE`/`BA`) and class-type filters held in module-level state
- events preview grid, events timeline, recurring-events sidebar
- location cards (two variants: `teaser`, `full`)
- "ZR Way" items grid, partner placeholder grids
- 4 modals: class detail, location detail, trial-signup form, partner form
- mobile nav open/close, body scroll lock, ESC handling
- re-labelling nav links, locale buttons and CTA text after every `astro:page-load` (needed because `<ClientRouter />` persists the nav across navigations)

Consequences today: content that lives in the CMS is **not in the server HTML** (bad for SEO and for the largest sections of the site), state is global and untyped-ish, and XSS safety rests on a hand-written `escapeHtml`. In Next.js essentially all of this becomes server components plus three or four small client components — expect `site.ts` to be deleted outright.

### 1.4 Content model (`studio/schemaTypes/`)

Documents: `siteSettings` (singleton), `page`, `post`, `event`, `recurringEvent`, `scheduleEntry`.
Objects: `localizedString`, `localizedText`, `localizedBlockContent`, `contentImage`, `heroSection`, `heroStat`.

Localization is **hand-rolled**: every translatable field is an object with `sk` / `en` / `ua` sub-fields, unwrapped at read time by `pickLocalized()` / `pickLocalizedBlocks()` in `web/src/utils/sanity/localized.ts`. Payload has field-level localization built in, so this entire pattern disappears.

### 1.5 Content that is *not* in the CMS yet

Hardcoded in `web/src/i18n/translations.ts` (~500 lines) and `web/src/data/schedule.ts`:

- all UI strings for SK/EN/UA
- `getLocationInfo()` — the two academies: city, badge, address, phone, email
- `locLong` / `amen` — academy descriptions and facility lists
- `wayItems` — the four "ZR Way" cards (real editorial content)
- `typeDesc` — Gi / No-Gi / Kids / Open Mat descriptions
- `sponsorPlaceholders` — 8 `[ logo n ]` placeholders; there is no partners content type at all
- `defaultScheduleData` — a full fallback week used when Sanity returns nothing

The migration is a good moment to move the editorial half of this (locations, way items, class-type descriptions, partners) into Payload, and keep only true UI chrome strings in code.

### 1.6 Known gaps worth fixing during the move

1. **Forms are fake.** The trial and partner forms set a local `sent` flag and render a thank-you panel. Nothing is submitted, stored or emailed.
2. **No hreflang / canonical / sitemap / robots / OG tags.** Only `<title>` and `<meta name="description">`.
3. **Two parallel language representations** — `Lang = 'SK'|'EN'|'UA'` and `Locale = 'sk'|'en'|'uk'` — with four conversion helpers between them, plus a third spelling (`ua`) as the Sanity field key. Unify on `sk|en|uk`.
4. **Dead code**: `components/Button.astro` (confetti demo from the starter), deps `canvas-confetti`, `imagetracerjs`, `pngjs`; `web/src/utils/sanity.ts` `getPages`/`getPage`/`getPageSlugs` are unused; `scheduleData` is marked deprecated.
5. **Date formatting is hand-rolled** for events (per-language month arrays in `utils/sanity/events.ts`) but uses `Intl` for posts. Standardise on `Intl`.
6. **`getEventsForClient()` builds all three languages** on every call and then throws two of them away.
7. `web/README.md` is still the Astro starter readme; `web/AGENTS.md` documents Astro workflows.

---

## 2. Target stack

| Concern | Choice | Version (verified on npm, Aug 2026) |
| --- | --- | --- |
| Framework | Next.js App Router | `16.3.0` |
| CMS | Payload | `3.87.1` (4.0 is canary — do not use) |
| Payload ↔ Next | `@payloadcms/next` | `3.87.1`, peer `next >=16.2.6 <17` ✅ compatible with Next 16.3 |
| Database | PostgreSQL via `@payloadcms/db-postgres` | `3.87.1` |
| Rich text | `@payloadcms/richtext-lexical` | `3.87.1` |
| Media storage | `@payloadcms/storage-vercel-blob` (or S3 adapter) | `3.87.1` |
| Styling | Tailwind 4 via `@tailwindcss/postcss` | `^4.2` |
| i18n | `next-intl` for UI strings + URL prefixing; Payload locales for content | latest |
| Email | Resend (`@payloadcms/email-resend`) | `3.87.1` |
| Node | `>=22.12` (unchanged) | |

Payload 3 runs **inside** the Next app — one deployable, one `package.json`, admin at `/admin`, REST/GraphQL at `/api/…`, and the local API callable directly from server components with no HTTP hop.

### Decisions to confirm before phase 1

| # | Decision | Recommendation | Why |
| --- | --- | --- | --- |
| D1 | Database | **Postgres** (Neon / Vercel Postgres) | Relational content (schedule → location, posts → media), cheap serverless tier, Payload's migration tooling is strongest here. MongoDB is fine too but adds a second infra vendor. |
| D2 | Media storage | **Vercel Blob** | Zero-config on the existing host; S3 is the alternative if you want portability. Local disk does **not** work on Vercel. |
| D3 | Migrate existing Sanity content or re-enter it? | Depends on how much of `production` is real vs. `studio/scripts/seed.ts` output. If mostly seed data → write a Payload seed instead and skip §6. | A one-shot import script is ~1–1.5 days; re-entering a handful of docs by hand is faster. Check the dataset first. |
| D4 | Repo layout | pnpm workspace: `apps/web` (Next+Payload), keep `studio/` until cutover, then delete both `studio/` and old `web/` | Lets the two run side by side during the port; no big-bang. |
| D5 | Rendering | Static (`generateStaticParams`) + on-demand revalidation from Payload `afterChange` hooks | Matches today's SSG performance; editors still see changes within seconds. |
| D6 | Keep the generic `/:slug` page type? | Yes | It's the only catch-all route; cheap to keep. |

---

## 3. Content model mapping

| Sanity | Payload | Notes |
| --- | --- | --- |
| `siteSettings` (singleton) | **global** `settings` | `title`, `description`, `hero` group (`kicker`, `title`, `subtitle`, `image` → upload rel, `stats` array max 4) — all localized |
| `page` | collection `pages` | `title`, `slug`, `excerpt`, `body` (lexical). Localize `title`/`excerpt`/`body`; keep `slug` non-localized initially (URL parity) |
| `post` | collection `posts` | `title`, `slug`, `publishedAt`, `coverImage` → `media` rel, `excerpt`, `body` (lexical) |
| `event` | collection `events` | `eventType` select, `startDate`/`endDate`, `title`, `description`, `body`, `place`, `coverImage`, `registrationUrl` |
| `recurringEvent` | collection `recurring-events` | `dayOfWeek` 0–6 (Sun-first — keep, or normalise to Mon-first and fix the two different conventions in the codebase) |
| `scheduleEntry` | collection `schedule` | `dayIndex` 0–6 (Mon-first), `startTime`, `endTime`, `classType`, `level`, `coach`, `location` → **relation** to `locations` |
| `contentImage` object | collection `media` (upload) | `alt` localized, focal point instead of Sanity hotspot; image sizes generated by Payload (`card` 640×260, `cover` 1200×675, `inline` 1200w — mirrors `utils/sanity/contentImage.ts`) |
| `localizedString` / `localizedText` / `localizedBlockContent` | ✗ deleted | replaced by `localized: true` on the field |
| `heroSection` / `heroStat` | inline group + array in `settings` | |
| *(hardcoded)* `getLocationInfo` + `locLong` + `amen` | **new** collection `locations` | `code` (`KE`/`BA`), `city`, `badge`, `address`, `phone`, `email`, `description`, `amenities[]`, optional photo |
| *(hardcoded)* `sponsorPlaceholders` | **new** collection `partners` | `name`, `logo` → media, `url`, `order` |
| *(hardcoded)* `wayItems` | **new** array in global `about` (or `settings.way`) | 4 localized title/body pairs |
| *(hardcoded)* `typeDesc` | **new** collection `class-types` | `key` (Gi/No-Gi/Kids/Open Mat), `label`, `color`, `description` — removes the colour map from `data/schedule.ts` too |
| — | **new** collection `form-submissions` | trial + partner submissions, admin read-only |
| — | **new** collection `users` | Payload auth, admin access |

Payload locale config:

```ts
localization: {
  locales: [
    { label: 'Slovenčina', code: 'sk' },
    { label: 'English',    code: 'en' },
    { label: 'Українська', code: 'uk' },
  ],
  defaultLocale: 'sk',
  fallback: true,        // reproduces pickLocalized()'s ?? value.sk ?? … chain
}
```

Note the code change `ua` → `uk`: Sanity uses `ua` as the field key while the URL and `hreflang` use `uk`. Payload should use `uk` (the correct ISO 639-1 code for Ukrainian); the import script maps `ua` → `uk`.

---

## 4. Route and URL parity

URLs must not change. Target structure:

```
apps/web/src/app/
├── (payload)/
│   ├── admin/[[...segments]]/page.tsx        # from create-payload-app template
│   └── api/[...slug]/route.ts
└── (frontend)/
    └── [[...slug]]/…            ← or explicit segments, see below
```

Recommended: `next-intl` middleware with `localePrefix: 'as-needed'`, which reproduces Astro's `prefixDefaultLocale: false` exactly (sk unprefixed, `/en/*`, `/uk/*`) and makes `/sk/*` → `/*` redirects automatic (today they're six hand-written entries in `astro.config.mjs`).

| Astro | Next | Data source |
| --- | --- | --- |
| `[...locale]/index.astro` | `app/(frontend)/[locale]/page.tsx` | `settings` global, `events` (3), `schedule`, `locations`, `partners` |
| `[...locale]/schedule.astro` | `[locale]/schedule/page.tsx` | `schedule` + `locations` + `class-types` |
| `[...locale]/events.astro` | `[locale]/events/page.tsx` | `events`, `recurring-events` |
| `[...locale]/events/[slug].astro` | `[locale]/events/[slug]/page.tsx` | `events` by slug, `generateStaticParams` |
| `[...locale]/posts.astro` | `[locale]/posts/page.tsx` | `posts` |
| `[...locale]/posts/[slug].astro` | `[locale]/posts/[slug]/page.tsx` | `posts` by slug |
| `[...locale]/about.astro` | `[locale]/about/page.tsx` | way items, `locations`, `events` (3), `posts` (3) |
| `[...locale]/partners.astro` | `[locale]/partners/page.tsx` | `partners` |
| `[...locale]/[slug].astro` | `[locale]/[slug]/page.tsx` | `pages` — must be the **last** matcher; exclude reserved slugs in `generateStaticParams` |

`generateStaticParams` at the `[locale]` layout returns `['sk','en','uk']`; with `as-needed` prefixing `sk` renders at `/`.

---

## 5. Component port map

| Astro | Next | Type |
| --- | --- | --- |
| `layouts/main.astro` | `app/(frontend)/[locale]/layout.tsx` | server; `next/font` replaces the Google Fonts `<link>`; `<Analytics />` from `@vercel/analytics/next` |
| `layout/Nav.astro` + mobile-nav half of `site.ts` | `Nav` (server) + `MobileNav` (client) | active-link state from `usePathname()` — the `astro:page-load` re-labelling hack disappears |
| `LocaleSelector.astro` | `LocaleSwitcher` (client) | `next-intl` `Link` / `usePathname` |
| `layout/Footer.astro`, `Container.astro`, `Logo.astro`, `sections/CtaBand.astro` | direct 1:1 server components | trivial |
| `schedule/ScheduleSection.astro` + `renderScheduleGrid`/`renderClassCard`/`renderLegend`/filter+loc state in `site.ts` | `ScheduleBoard` (client, receives full `entries[]` + `classTypes[]` as props) | `useState` for `location`/`filter`; cards are real React nodes → no `escapeHtml`, no JSON island, and the grid is in the server HTML |
| `events/EventsData.astro` + `renderEventsSections` | `EventsPreview`, `EventsTimeline`, `RecurringList` — all **server** components | the `<script type="application/json">` islands and `data/events.ts` are deleted |
| `renderLocationCards` | `LocationCard` server component + `LocationModal` client | data from `locations` collection |
| `renderWayItems`, `updatePartnerGrids` | server components | data from Payload |
| `modals/ModalShell.astro` + `renderModal` | `Modal` client component (native `<dialog>`) with `ClassDetail`, `LocationDetail`, `TrialForm`, `PartnerForm` children | replaces ~250 lines of template strings |
| `content/ArticleContent.astro` + `ArticleImage.astro` | `RichText` using `@payloadcms/richtext-lexical/react` `RichText` + custom `upload` node renderer | `astro-portabletext` and the `localizePortableTextImages` shim are dropped |
| `content/ContentCard.astro`, `CoverImage.astro` | 1:1, `next/image` | |
| `content/PlaceholderImage.astro` | keep (the `.ph` diagonal-stripe placeholder is used a lot) | |
| `components/Button.astro` | delete | unused starter demo |

Client-component count after the port: roughly **five** (`MobileNav`, `LocaleSwitcher`, `ScheduleBoard`, `Modal` + the two forms). Everything else is server-rendered.

---

## 6. Content migration (only if D3 = "migrate")

1. `cd studio && pnpm exec sanity dataset export production ./export.tar.gz` → gives `data.ndjson` + `assets/`.
2. Node script `apps/web/src/scripts/import-sanity.ts` run with `payload` local API (`getPayload({ config })`):
   - **Media first**: for each `sanity.imageAsset`, download the original, `payload.create({ collection: 'media', filePath, data: { alt } })`, and keep a `Map<sanityAssetId, payloadMediaId>`.
   - **Locale unwrap**: for each doc, write `sk` first, then `payload.update({ locale: 'en' })` and `{ locale: 'uk' }` with the `en` / `ua` values.
   - **Portable Text → Lexical**: `@portabletext/to-html` → `convertHTMLToLexical` (`@payloadcms/richtext-lexical`) with a custom serializer that turns PT `image` blocks into an `upload` node pointing at the mapped media id. Spot-check every long body afterwards — this is the step most likely to need manual cleanup.
   - **Order**: media → locations → class-types → partners → schedule → recurring-events → events → posts → pages → settings global.
3. Verify counts and slugs against `sanity dataset export` output; keep the script in the repo as documentation of the mapping.

If D3 = "re-enter": port `studio/scripts/seed.ts` to a Payload seed script instead (same content, `payload.create` calls) — roughly a half-day and it doubles as local-dev fixture data.

---

## 7. Phased delivery

Each phase is one PR against `claude/nextjs-payloadcms-migration-2b2ncj` (or its own branch off it). Estimates are for one developer.

| Phase | Scope | Est. |
| --- | --- | --- |
| **0. Prep** | Confirm D1–D6, provision Postgres + Blob, decide on parallel-run domain (`next.zrteam.sk` or Vercel preview) | 0.5 d |
| **1. Scaffold** | pnpm workspace root; `apps/web` from `create-payload-app` (Next 16 + Payload 3.87 + Postgres); Tailwind 4 via PostCSS; port `global.css` verbatim; `next/font` for Oswald/Barlow/Barlow Condensed; base layout + Container/Footer/Logo; deploy a blank build to Vercel to prove the pipeline | 1.5 d |
| **2. Payload schema** | All collections + globals from §3, localization config, access control, admin nav grouping (mirror the current `structureTool` grouping), image sizes, `users` auth, first-admin flow | 2 d |
| **3. i18n + data layer** | `next-intl` middleware + `messages/{sk,en,uk}.json` (port `translations.ts`, minus the parts that move to Payload); collapse `Lang`/`Locale` to one type; typed data accessors over the Payload local API (replacing `utils/sanity/*`) | 1.5 d |
| **4. Content in** | §6 import script **or** Payload seed; verify every collection renders in admin | 0.5–1.5 d |
| **5. Static pages** | posts list + detail, events list + detail, generic `[slug]`, `RichText` renderer, `next/image` wiring | 2 d |
| **6. Interactive pages** | `ScheduleBoard`, modals, mobile nav, locale switcher, home, about, partners → **delete `site.ts`, `data/events.ts`, `data/schedule.ts`, both JSON-island components** | 2.5 d |
| **7. Forms for real** | `form-submissions` collection, server actions with Zod validation, honeypot + rate limit, Resend notification to the club, success/error states | 1 d |
| **8. SEO + perf** | Metadata API per route, `hreflang` alternates (new), canonical, `sitemap.ts`, `robots.ts`, OG images, `generateStaticParams` everywhere, on-demand revalidation from Payload `afterChange` hooks, Vercel Analytics | 1 d |
| **9. Cutover** | URL parity diff (crawl old vs new), redirects for `/sk/*`, Lighthouse + a11y pass, DNS/domain swap, decommission Sanity Studio, delete `studio/` + old `web/` + `ZRTeam Website.dc.html` | 1 d |

**Total: ~13–15 developer-days.** Phases 1–4 are prerequisites; 5 and 7 can run in parallel with 6 if two people are on it.

---

## 8. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Portable Text → Lexical conversion loses formatting | Medium | Convert via HTML, review every body by hand (there are <20 documents), keep the Sanity export as the source of truth until sign-off |
| Payload 4 lands mid-migration | Low | Pin `3.87.1` exactly across all `@payloadcms/*` packages; 3.x is the stable line |
| Serverless cold starts / DB connection limits on Vercel | Medium | Static rendering (D5) means the DB is touched at build + revalidate only; use a pooled connection string (Neon pooler / PgBouncer) |
| Media re-upload breaks image URLs | Low | Nothing external links to Sanity CDN URLs; regenerate all images through Payload sizes |
| Design drift while re-implementing `site.ts` in React | Medium | Port the Tailwind class strings verbatim from the template literals; screenshot-diff the old and new site per page before cutover |
| Localized `slug` divergence | Low | Keep slugs non-localized in phase 1; if per-language slugs are wanted later, add `localized: true` and a redirect map |
| Sanity dataset holds more real content than expected | Low | Run `sanity dataset export` in phase 0 and count documents before committing to D3 |

---

## 9. Definition of done

- [ ] Every URL that exists today returns 200 at the same path in all three languages
- [ ] All content sections are present in the server HTML (curl a page — schedule, events and locations must be there without JS)
- [ ] `site.ts` and both JSON-island components no longer exist
- [ ] Trial and partner forms persist a `form-submission` and send an email
- [ ] `hreflang`, canonical, `sitemap.xml`, `robots.txt` present
- [ ] An editor can change hero copy, schedule, events, posts, locations and partners in `/admin` and see it live within a revalidation window
- [ ] Lighthouse ≥ 95 performance / 100 SEO on `/`, `/schedule`, `/events`
- [ ] `studio/`, old `web/` and the `.dc.html` prototype removed from the repo

---

## 10. What was actually built (deviations from the plan)

The decisions in §2 were settled as: **Postgres** (D1), **Vercel Blob with a
local-disk fallback** (D2), **re-seed rather than import** (D3 — the Sanity
dataset held `seed.ts` output, so the same content is now a Payload seed),
**one app in `web/`, no monorepo** (D4 — the Vercel project keeps its existing
root directory), **static + on-demand revalidation** (D5), **generic `/:slug`
kept** (D6). The phasing in §7 was collapsed into a single change set at the
user's request.

Four things ended up different from the plan text:

1. **No `next-intl`.** The `as-needed` prefix scheme is ~20 lines of middleware
   (`src/middleware.ts`) plus two redirects in `next.config.mjs`, so the
   dependency did not earn its place. UI strings are plain typed dictionaries
   in `src/i18n/messages/`, closed over a `Messages` interface so a missing
   translation is a type error.
2. **`ua` → `uk` everywhere.** The plan noted the mismatch; the implementation
   also collapsed `Lang` (`SK`/`EN`/`UA`) and `Locale` (`sk`/`en`/`uk`) into a
   single `Locale` type, deleting the four conversion helpers.
3. **Weekday conventions unified.** `scheduleEntry` was Monday-first and
   `recurringEvent` was Sunday-first. Both are Monday-first now, so the seeded
   Saturday/Sunday open mats moved from `6`/`0` to `5`/`6`.
4. **`pnpm seed` runs under `tsx`, not `payload run`.** `payload run`
   transpiles to CJS and returned without executing the script's async entry
   point; `node --env-file-if-exists=.env --import tsx` runs it reliably.

Content that used to be hardcoded in `translations.ts` is now editable: the two
academies (`locations`), the ZR Way cards (`about` global), the class-type
descriptions and colours (`class-types`), and partners (`partners`, which falls
back to placeholder tiles while empty).

Verified before merge: `pnpm typecheck` and `pnpm build` clean, all 9 routes ×
3 locales prerendered, a browser pass over the schedule filters, all four
modals, both forms (rows land in `form_submissions`), the locale switcher and
the mobile nav, plus an admin pass over every collection and both globals.

Still open, deliberately: no automated test suite, no image content (the
placeholder tiles are still placeholders), and the footer's social links are
still inert `<span>`s as they were in Astro.
