import type { Field } from 'payload'

/**
 * URL slug. Deliberately not localized — every language shares one URL path,
 * which is what the Astro site did and keeps the migration URL-compatible.
 */
export function slugField(): Field[] {
  return [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Used in the URL. Lowercase, words separated by hyphens.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) =>
            typeof value === 'string'
              ? value
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-]/g, '')
              : value,
        ],
      },
    },
  ]
}
