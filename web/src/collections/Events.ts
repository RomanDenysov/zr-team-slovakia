import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { revalidateContent } from '../hooks/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'eventType'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'startDate',
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    ...slugField(),
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Seminar', value: 'seminar' },
        { label: 'Tournament', value: 'tournament' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Camp', value: 'camp' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' } },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            width: '50%',
            description: 'Optional — for multi-day events',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
          },
        },
      ],
    },
    { name: 'place', type: 'text', required: true, localized: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Short summary for cards and listings' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'registrationUrl',
      type: 'text',
      admin: { description: 'Optional link for sign-up or tickets' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      localized: true,
      admin: { description: 'Full event page content' },
    },
  ],
}
