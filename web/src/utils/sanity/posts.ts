import type { PortableTextBlock } from '@portabletext/types';
import { sanityClient } from 'sanity:client';
import { defineQuery } from 'groq';
import type { Lang } from '../../i18n/translations';
import { pickLocalized, pickLocalizedBlocks, type LocalizedBlocks } from './localized';
import {
	coverImageProjection,
	mapCardImage,
	mapCoverImage,
	type SanityContentImage,
} from './contentImage';
import type { LocalizedString } from '../../types/events';

const POSTS_QUERY = defineQuery(
	`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    ${coverImageProjection}
  }`,
);

const POST_QUERY = defineQuery(
	`*[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    ${coverImageProjection}
  }`,
);

const POST_PATHS_QUERY = defineQuery(
	`*[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }`,
);

interface SanityPost {
	title: LocalizedString | null;
	slug: string;
	publishedAt: string;
	excerpt: LocalizedString | null;
	coverImage?: SanityContentImage | null;
	body?: LocalizedBlocks | null;
}

export interface PostListItem {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	imageUrl: string | null;
	imageAlt: string;
}

export interface PostDetail extends PostListItem {
	body: PortableTextBlock[];
}

function formatPostDate(isoDate: string, lang: Lang): string {
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return isoDate;

	const locale = lang === 'SK' ? 'sk-SK' : lang === 'UA' ? 'uk-UA' : 'en-GB';
	return new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date);
}

function mapPost(post: SanityPost, lang: Lang): PostListItem {
	const title = pickLocalized(post.title, lang);
	const cardImage = mapCardImage(post.coverImage, lang, title);

	return {
		slug: post.slug,
		title,
		excerpt: pickLocalized(post.excerpt, lang),
		date: formatPostDate(post.publishedAt, lang),
		imageUrl: cardImage.url,
		imageAlt: cardImage.alt,
	};
}

export async function getPosts(lang: Lang): Promise<PostListItem[]> {
	const posts = await sanityClient.fetch<SanityPost[]>(POSTS_QUERY);
	return posts
		.filter((post): post is SanityPost & { slug: string } => Boolean(post.slug))
		.map((post) => mapPost(post, lang));
}

export async function getPost(slug: string, lang: Lang): Promise<PostDetail | null> {
	const post = await sanityClient.fetch<SanityPost | null>(POST_QUERY, { slug });
	if (!post?.slug) return null;

	const mapped = mapPost(post, lang);
	const cover = mapCoverImage(post.coverImage, lang, mapped.title);

	return {
		...mapped,
		imageUrl: cover.url ?? mapped.imageUrl,
		imageAlt: cover.alt,
		body: pickLocalizedBlocks(post.body, lang),
	};
}

export async function getPostSlugs(): Promise<string[]> {
	const posts = await sanityClient.fetch<Array<{ slug: string | null }>>(POST_PATHS_QUERY);
	return posts.map((post) => post.slug).filter((slug): slug is string => Boolean(slug));
}
