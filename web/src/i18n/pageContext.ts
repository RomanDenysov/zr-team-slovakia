import { defaultLocale, resolvePageLang, type Locale } from './locales';
import type { Lang } from './translations';

export interface LocalePageContext {
	locale: Locale;
	lang: Lang;
}

export function resolveLocalePageContext(
	locale: string | undefined,
): LocalePageContext | null {
	const resolved = locale ?? defaultLocale;
	const lang = resolvePageLang(resolved);
	if (!lang) return null;
	return { locale: resolved as Locale, lang };
}
