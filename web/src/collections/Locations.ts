import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateContent } from '../hooks/revalidate'

export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: { singular: 'Academy', plural: 'Academies' },
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'code', 'address'],
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
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Short key used by the schedule filters, e.g. KE or BA.' },
    },
    { name: 'city', type: 'text', required: true, localized: true },
    {
      name: 'badge',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Small pill next to the city, e.g. HLAVNÁ / POBOČKA.' },
    },
    { name: 'address', type: 'text', required: true, localized: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Shown in the academy modal.' },
    },
    {
      name: 'amenities',
      type: 'array',
      localized: true,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
