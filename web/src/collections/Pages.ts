import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { revalidateContent } from '../hooks/revalidate'

/** Reserved by fixed routes — a page with one of these slugs would be shadowed. */
export const RESERVED_SLUGS = ['schedule', 'events', 'posts', 'about', 'partners', 'admin', 'api']

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField(),
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
  ],
}
