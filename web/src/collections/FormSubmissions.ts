import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

/**
 * Written only by the server actions in `src/actions/`, which use the local
 * API (and therefore bypass access control). Nothing public can read them.
 */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Submission', plural: 'Submissions' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['formType', 'name', 'email', 'createdAt'],
    group: 'System',
  },
  access: {
    read: authenticated,
    create: () => false,
    update: () => false,
    delete: authenticated,
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Trial class', value: 'trial' },
        { label: 'Partnership', value: 'partner' },
      ],
    },
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'contact', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'locale', type: 'text' },
  ],
}
