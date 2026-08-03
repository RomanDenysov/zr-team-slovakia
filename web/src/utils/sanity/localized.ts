import type { PortableTextBlock } from '@portabletext/types';
import type { Lang } from '../../i18n/translations';
import type { LocalizedString } from '../../types/events';

const langKeys = { SK: 'sk', EN: 'en', UA: 'ua' } as const satisfies Record<
	Lang,
	keyof LocalizedString
>;

export interface LocalizedBlocks {
	sk?: PortableTextBlock[];
	en?: PortableTextBlock[];
	ua?: PortableTextBlock[];
}

export function pickLocalized(
	value: LocalizedString | null | undefined,
	lang: Lang,
): string {
	if (!value) return '';
	const key = langKeys[lang];
	return value[key] ?? value.sk ?? value.en ?? value.ua ?? '';
}

export function pickLocalizedBlocks(
	value: LocalizedBlocks | null | undefined,
	lang: Lang,
): PortableTextBlock[] {
	if (!value) return [];
	const key = langKeys[lang];
	return value[key] ?? value.sk ?? value.en ?? value.ua ?? [];
}
