// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
	process.env.NODE_ENV ?? 'development',
	process.cwd(),
	'',
);

export default defineConfig({
	i18n: {
		locales: ['sk', 'en', 'uk'],
		defaultLocale: 'sk',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	redirects: {
		'/sk': '/',
		'/sk/about': '/about',
		'/sk/events': '/events',
		'/sk/partners': '/partners',
		'/sk/schedule': '/schedule',
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		sanity({
			projectId: PUBLIC_SANITY_PROJECT_ID,
			dataset: PUBLIC_SANITY_DATASET,
			useCdn: false,
		}),
	],
});
