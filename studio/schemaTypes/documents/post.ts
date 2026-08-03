import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.sk', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'contentImage',
      description: 'Shown on cards and at the top of the post page',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localizedBlockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.sk',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },
    prepare({title, publishedAt, media}) {
      return {
        title: title ?? 'Untitled post',
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('sk-SK') : undefined,
        media,
      }
    },
  },
})
