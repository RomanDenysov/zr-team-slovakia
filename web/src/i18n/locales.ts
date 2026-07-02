import type { Lang } from './translations';

export const locales = ['sk', 'en', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sk';

const localeToLangMap: Record<Locale, Lang> = {
	sk: 'SK',
	en: 'EN',
	uk: 'UA',
};

const langToLocaleMap: Record<Lang, Locale> = {
	SK: 'sk',
	EN: 'en',
	UA: 'uk',
};

export function isValidLocale(value: string | undefined): value is Locale {
	return value === 'sk' || value === 'en' || value === 'uk';
}

export function localeToLang(locale: Locale): Lang {
	return localeToLangMap[locale];
}

export function langToLocale(lang: Lang): Locale {
	return langToLocaleMap[lang];
}

export const alternateLocales = locales.filter(
	(locale): locale is Exclude<Locale, typeof defaultLocale> => locale !== defaultLocale,
);

export function localeStaticPaths() {
	return locales.map((locale) => ({ params: { locale } }));
}

export function alternateLocaleStaticPaths() {
	return alternateLocales.map((locale) => ({ params: { locale } }));
}

export function getRoutePath(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length > 0 && isValidLocale(segments[0])) {
		segments.shift();
	}
	return segments.join('/');
}

export function resolvePageLang(locale: string | undefined): Lang | null {
	if (!locale || !isValidLocale(locale)) return null;
	return localeToLang(locale);
}
