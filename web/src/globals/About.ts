import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const About = {
  slug: 'about',
  label: 'About page',
  admin: { group: 'Site' },
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'wayItems',
      label: 'ZR Way',
      type: 'array',
      maxRows: 6,
      admin: { description: 'The value cards under the "What Zé Radiola means" intro.' },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'body', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
} satisfies GlobalConfig
