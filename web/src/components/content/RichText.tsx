import Image from 'next/image'
import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { Media } from '../../payload-types'

type UploadNode = {
  value?: number | Media | null
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const value = (node as UploadNode).value
    if (typeof value !== 'object' || value === null) return null

    const size = value.sizes?.inline
    const url = size?.url ?? value.url
    const width = size?.width ?? value.width
    const height = size?.height ?? value.height
    if (!url || !width || !height) return null

    return (
      <figure className="article-figure">
        <Image
          src={url}
          alt={value.alt ?? ''}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full rounded-lg"
        />
        {value.caption ? <figcaption className="article-caption">{value.caption}</figcaption> : null}
      </figure>
    )
  },
})

export function RichText({
  data,
  className = 'article-content mt-8',
}: {
  data: unknown
  className?: string
}) {
  if (!data) return null

  return (
    <LexicalRichText
      data={data as Parameters<typeof LexicalRichText>[0]['data']}
      converters={converters}
      className={className}
    />
  )
}
