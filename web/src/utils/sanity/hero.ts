import { sanityClient } from 'sanity:client';
import { defineQuery } from 'groq';
import type { Lang } from '../../i18n/translations';
import { translations } from '../../i18n/translations';
import type { LocalizedString } from '../../types/events';
import { getHeroImageUrl } from './image';

const langKeys = { SK: 'sk', EN: 'en', UA: 'ua' } as const satisfies Record<Lang, keyof LocalizedString>;

const HERO_QUERY = defineQuery(
	`*[_type == "siteSettings"][0]{
    hero {
      kicker,
      title,
      subtitle,
      image {
        asset,
        hotspot,
        crop,
        alt
      },
      stats[] {
        value,
        label
      }
    }
  }`,
);

interface SanityHeroStat {
	value: string | null;
	label: LocalizedString | null;
}

interface SanityHeroImage {
	asset?: { _ref: string; _type: 'reference' };
	hotspot?: { x: number; y: number; height: number; width: number };
	crop?: { top: number; bottom: number; left: number; right: number };
	alt?: LocalizedString | null;
}

interface SanityHero {
	kicker: LocalizedString | null;
	title: LocalizedString | null;
	subtitle: LocalizedString | null;
	image: SanityHeroImage | null;
	stats: SanityHeroStat[] | null;
}

export interface HeroContent {
	kicker: string;
	title: string;
	subtitle: string;
	imageUrl: string | null;
	imageAlt: string;
	stats: { value: string; label: string }[];
}

function pickLocalized(value: LocalizedString | null | undefined, lang: Lang): string {
	if (!value) return '';
	const key = langKeys[lang];
	return value[key] ?? value.sk ?? value.en ?? value.ua ?? '';
}

function fallbackHero(lang: Lang): HeroContent {
	const t = translations[lang];
	return {
		kicker: 'KOŠICE · BRATISLAVA',
		title: t.heroTitle,
		subtitle: t.heroSub,
		imageUrl: null,
		imageAlt: '',
		stats: [
			{ value: '2', label: t.statAcademies },
			{ value: '20+', label: t.statClasses },
			{ value: 'IBJJF', label: t.statLineage },
		],
	};
}

function mapHero(hero: SanityHero | null | undefined, lang: Lang): HeroContent {
	const fallback = fallbackHero(lang);
	if (!hero) return fallback;

	const stats =
		hero.stats
			?.filter((stat) => stat.value && pickLocalized(stat.label, lang))
			.map((stat) => ({
				value: stat.value ?? '',
				label: pickLocalized(stat.label, lang),
			})) ?? fallback.stats;

	return {
		kicker: pickLocalized(hero.kicker, lang) || fallback.kicker,
		title: pickLocalized(hero.title, lang) || fallback.title,
		subtitle: pickLocalized(hero.subtitle, lang) || fallback.subtitle,
		imageUrl: getHeroImageUrl(hero.image),
		imageAlt: pickLocalized(hero.image?.alt, lang) || fallback.title,
		stats: stats.length > 0 ? stats : fallback.stats,
	};
}

export async function getHero(lang: Lang): Promise<HeroContent> {
	const data = await sanityClient.fetch<{ hero: SanityHero | null } | null>(HERO_QUERY);
	return mapHero(data?.hero, lang);
}
