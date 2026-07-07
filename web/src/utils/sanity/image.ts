import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from 'sanity:client';

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource | null | undefined) {
	return builder.image(source ?? '');
}

export function getHeroImageUrl(
	source: SanityImageSource | null | undefined,
	width = 900,
): string | null {
	if (!source) return null;
	return urlForImage(source).width(width).auto('format').quality(85).url();
}
