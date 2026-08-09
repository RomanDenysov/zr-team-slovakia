import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site settings',
  admin: { group: 'Site' },
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'hero',
      type: 'group',
      label: 'Homepage hero',
      fields: [
        {
          name: 'kicker',
          type: 'text',
          localized: true,
          admin: { description: 'Small label above the headline, e.g. "KOŠICE · BRATISLAVA"' },
        },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'subtitle', type: 'textarea', required: true, localized: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'stats',
          type: 'array',
          maxRows: 4,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'e.g. "2", "20+", "IBJJF"' },
            },
            { name: 'label', type: 'text', required: true, localized: true },
          ],
        },
      ],
    },
  ],
}
