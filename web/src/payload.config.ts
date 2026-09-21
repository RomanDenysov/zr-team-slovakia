import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'

import { ClassTypes } from './collections/ClassTypes'
import { Events } from './collections/Events'
import { FormSubmissions } from './collections/FormSubmissions'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Posts } from './collections/Posts'
import { RecurringEvents } from './collections/RecurringEvents'
import { Schedule } from './collections/Schedule'
import { Users } from './collections/Users'
import { About } from './globals/About'
import { Settings } from './globals/Settings'
import { locales, defaultLocale } from './i18n/config'
import { getDatabaseUri, getServerURL } from './lib/env'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const blobToken = process.env.BLOB_READ_WRITE_TOKEN
const resendKey = process.env.RESEND_API_KEY
const databaseUri = getDatabaseUri() ?? ''

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
    meta: {
      titleSuffix: '— ZR Team',
    },
  },
  serverURL: getServerURL(),
  collections: [
    Pages,
    Posts,
    Events,
    RecurringEvents,
    Schedule,
    ClassTypes,
    Locations,
    Partners,
    Media,
    FormSubmissions,
    Users,
  ],
  globals: [Settings, About],
  localization: {
    locales: [
      { label: 'Slovenčina', code: 'sk' },
      { label: 'English', code: 'en' },
      { label: 'Українська', code: 'uk' },
    ],
    defaultLocale,
    // Empty translations fall back to Slovak, matching the old pickLocalized().
    fallback: true,
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
      // Serverless hosts (Vercel) should not keep a pool of connections.
      max: process.env.VERCEL ? 1 : 10,
    },
    // Schema changes go through committed migrations (`pnpm migrate`).
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  secret: process.env.PAYLOAD_SECRET ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  // Uploads land on disk in development and on Vercel Blob once the token
  // is present — serverless hosts have no writable filesystem.
  plugins: blobToken
    ? [
        vercelBlobStorage({
          enabled: true,
          collections: { [Media.slug]: true },
          token: blobToken,
        }),
      ]
    : [],
  email: resendKey
    ? resendAdapter({
        defaultFromAddress: process.env.EMAIL_FROM ?? 'noreply@zrteam.sk',
        defaultFromName: 'ZR Team',
        apiKey: resendKey,
      })
    : undefined,
})

export { locales }
