import { defaultLang, translations, type Lang, type Translation } from './translations';

export function langToHtmlLang(lang: Lang): string {
	switch (lang) {
		case 'SK':
			return 'sk';
		case 'EN':
			return 'en';
		case 'UA':
			return 'uk';
		default: {
			const exhaustive: never = lang;
			return exhaustive;
		}
	}
}

export function getUiString(key: keyof Translation, lang: Lang = defaultLang): string {
	const val = translations[lang][key];
	return typeof val === 'string' ? val : '';
}

export function getPageLangFromDocument(): Lang {
	if (typeof document === 'undefined') return defaultLang;
	const lang = document.documentElement.dataset.lang;
	if (lang === 'SK' || lang === 'EN' || lang === 'UA') return lang;
	return defaultLang;
}
