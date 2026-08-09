import type { Metadata } from 'next'

import { ContentCard } from '../../../../components/content/ContentCard'
import { Container } from '../../../../components/layout/Container'
import { localeHref } from '../../../../i18n/config'
import { getMessages } from '../../../../i18n/messages'
import { getPosts } from '../../../../lib/content'
import { alternates, resolveLocale } from '../../../../lib/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  return {
    title: messages.postsTitle,
    description: messages.postsLead,
    alternates: alternates(locale, 'posts'),
  }
}

export default async function PostsPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)
  const posts = await getPosts({ locale })

  return (
    <Container className="max-w-7xl py-16">
      <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
        {messages.postsKicker}
      </div>
      <h1 className="font-display mb-2 text-5xl leading-none font-bold text-white uppercase">
        {messages.postsTitle}
      </h1>
      <p className="mb-12 max-w-[560px] text-base text-zr-text-muted">{messages.postsLead}</p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ContentCard
              key={post.slug}
              href={localeHref(locale, `posts/${post.slug}`)}
              kicker={post.date}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-zr-text-muted">—</p>
      )}
    </Container>
  )
}
