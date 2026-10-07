import type { Media } from '../payload-types'

export interface ImageView {
  url: string
  alt: string
  width: number
  height: number
}

type MediaField = number | Media | null | undefined
type SizeKey = 'card' | 'cover' | 'inline' | 'hero'

function isMedia(value: MediaField): value is Media {
  return typeof value === 'object' && value !== null
}

/**
 * Pick a generated size, falling back to the original upload. Returns null for
 * unpopulated relationships (depth 0) and for documents without an image.
 */
export function imageView(
  media: MediaField,
  size: SizeKey,
  fallbackAlt = '',
): ImageView | null {
  if (!isMedia(media)) return null

  const variant = media.sizes?.[size]
  const url = variant?.url ?? media.url
  const width = variant?.width ?? media.width
  const height = variant?.height ?? media.height

  if (!url || !width || !height) return null

  return { url, width, height, alt: media.alt || fallbackAlt }
}
