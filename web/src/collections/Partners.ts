import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateContent } from '../hooks/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'url'],
    group: 'Club',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Leave empty to show a placeholder tile.' },
    },
    { name: 'url', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
