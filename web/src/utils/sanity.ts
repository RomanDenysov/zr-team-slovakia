import { sanityClient } from 'sanity:client';
import { defineQuery } from 'groq';

const PAGES_QUERY = defineQuery(
	`*[_type == "page" && defined(slug.current)] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt
  }`,
);

const PAGE_QUERY = defineQuery(
	`*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body
  }`,
);

const PAGE_PATHS_QUERY = defineQuery(
	`*[_type == "page" && defined(slug.current)]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body
  }`,
);

const PAGE_SLUGS_QUERY = defineQuery(
	`*[_type == "page" && defined(slug.current)]{
    "params": { "slug": slug.current }
  }`,
);

const SITE_SETTINGS_QUERY = defineQuery(
	`*[_type == "siteSettings"][0]{
    title,
    description
  }`,
);

export async function getPages() {
	return await sanityClient.fetch(PAGES_QUERY);
}

export async function getPage(slug: string) {
	return await sanityClient.fetch(PAGE_QUERY, { slug });
}

export async function getPageSlugs() {
	return await sanityClient.fetch(PAGE_SLUGS_QUERY);
}

export async function getStaticPagePaths() {
	const pages = await sanityClient.fetch(PAGE_PATHS_QUERY);
	return pages
		.filter((page): page is typeof page & { slug: string } => Boolean(page.slug))
		.map((page) => ({
			params: { slug: page.slug },
			props: { page },
		}));
}

export async function getSiteSettings() {
	return await sanityClient.fetch(SITE_SETTINGS_QUERY);
}
