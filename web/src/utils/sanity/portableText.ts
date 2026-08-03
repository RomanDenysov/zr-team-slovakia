import type { PortableTextBlock } from '@portabletext/types';
import type { Lang } from '../../i18n/translations';
import type { LocalizedString } from '../../types/events';
import { pickLocalized } from './localized';

type ImageBlock = PortableTextBlock & {
	_type: 'image';
	alt?: LocalizedString | string | null;
	caption?: LocalizedString | string | null;
};

function isImageBlock(block: PortableTextBlock): block is ImageBlock {
	return block._type === 'image';
}

function pickBlockText(value: LocalizedString | string | null | undefined, lang: Lang): string {
	if (!value) return '';
	if (typeof value === 'string') return value;
	return pickLocalized(value, lang);
}

export function localizePortableTextImages(
	blocks: PortableTextBlock[],
	lang: Lang,
): PortableTextBlock[] {
	return blocks.map((block) => {
		if (!isImageBlock(block)) return block;

		return {
			...block,
			alt: pickBlockText(block.alt, lang),
			caption: pickBlockText(block.caption, lang),
		};
	});
}
