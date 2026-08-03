import type { Lang } from '../../i18n/translations';
import type { LocalizedString } from '../../types/events';
import { pickLocalized } from './localized';
import { urlForImage } from './image';

export interface SanityContentImage {
	asset?: { _ref: string; _type: 'reference' };
	hotspot?: { x: number; y: number; height: number; width: number };
	crop?: { top: number; bottom: number; left: number; right: number };
	alt?: LocalizedString | null;
}

export interface ContentImage {
	url: string | null;
	alt: string;
}

const COVER_IMAGE_FRAGMENT = `{
  asset,
  hotspot,
  crop,
  alt
}`;

export const coverImageProjection = `coverImage ${COVER_IMAGE_FRAGMENT}`;

function buildImageUrl(
	source: SanityContentImage | null | undefined,
	width: number,
	height: number,
): string | null {
	if (!source?.asset) return null;

	return urlForImage(source)
		.width(width)
		.height(height)
		.fit('crop')
		.auto('format')
		.quality(85)
		.url();
}

export function mapCardImage(
	source: SanityContentImage | null | undefined,
	lang: Lang,
	fallbackAlt: string,
): ContentImage {
	return {
		url: buildImageUrl(source, 640, 260),
		alt: pickLocalized(source?.alt, lang) || fallbackAlt,
	};
}

export function mapCoverImage(
	source: SanityContentImage | null | undefined,
	lang: Lang,
	fallbackAlt: string,
): ContentImage {
	return {
		url: buildImageUrl(source, 1200, 675),
		alt: pickLocalized(source?.alt, lang) || fallbackAlt,
	};
}

export function mapInlineImageUrl(source: SanityContentImage | null | undefined): string | null {
	if (!source?.asset) return null;
	return urlForImage(source).width(1200).auto('format').quality(85).url();
}

export function pickInlineImageAlt(
	source: SanityContentImage | null | undefined,
	lang: Lang,
): string {
	return pickLocalized(source?.alt, lang);
}

export function pickInlineImageCaption(
	source: SanityContentImage | null | undefined,
	lang: Lang,
): string {
	const caption = source as SanityContentImage & { caption?: LocalizedString | null };
	return pickLocalized(caption.caption, lang);
}
