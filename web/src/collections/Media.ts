import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateContent } from '../hooks/revalidate'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    // Local disk in development; the Vercel Blob plugin takes over in production.
    staticDir: path.resolve(dirname, '../../public/media'),
    // Sizes mirror the crops the Astro site requested from the Sanity CDN.
    imageSizes: [
      { name: 'card', width: 640, height: 260, position: 'centre' },
      { name: 'cover', width: 1200, height: 675, position: 'centre' },
      { name: 'inline', width: 1200, height: undefined },
      { name: 'hero', width: 900, height: undefined },
    ],
    focalPoint: true,
    mimeTypes: ['image/*'],
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description: 'Describes the image for screen readers and when it fails to load.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
