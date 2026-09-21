import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '../../../../../components/content/RichText'
import { Container } from '../../../../../components/layout/Container'
import { localeHref, locales } from '../../../../../i18n/config'
import { getMessages } from '../../../../../i18n/messages'
import { getPost, getPostSlugs } from '../../../../../lib/content'
import { alternates, resolveLocale } from '../../../../../lib/routing'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const post = await getPost(slug, { locale })
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternates(locale, `posts/${slug}`),
    openGraph: post.image ? { images: [{ url: post.image.url }] } : undefined,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)
  const post = await getPost(slug, { locale })

  if (!post) notFound()

  return (
    <Container className="max-w-3xl py-16">
      <Link
        href={localeHref(locale, 'posts')}
        className="font-condensed text-sm font-bold tracking-wide text-zr-green uppercase hover:underline"
      >
        ← {messages.postsTitle}
      </Link>
      <article className="mt-8">
        <div className="font-condensed text-[13px] font-bold tracking-wide text-zr-green">
          {post.date}
        </div>
        <h1 className="font-display mt-2 text-4xl leading-tight font-bold text-white uppercase">
          {post.title}
        </h1>
        {post.image ? (
          <Image
            src={post.image.url}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="mt-6 aspect-video w-full rounded-lg object-cover"
          />
        ) : null}
        {post.excerpt ? (
          <p className="mt-4 text-lg leading-relaxed text-zr-text-secondary">{post.excerpt}</p>
        ) : null}
        <RichText data={post.body} />
      </article>
    </Container>
  )
}
