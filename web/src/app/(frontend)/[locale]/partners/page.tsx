import type { Metadata } from 'next'

import { Container } from '../../../../components/layout/Container'
import { PartnerButton } from '../../../../components/modals/ModalTriggers'
import { PartnersGrid } from '../../../../components/partners/PartnersGrid'
import { getMessages } from '../../../../i18n/messages'
import { getPartners } from '../../../../lib/content'
import { alternates, resolveLocale } from '../../../../lib/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)

  return {
    title: messages.sponsorsTitle,
    description: messages.sponsorsSub,
    alternates: alternates(locale, 'partners'),
  }
}

export default async function PartnersPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const messages = getMessages(locale)
  const partners = await getPartners()

  return (
    <Container className="max-w-7xl py-16 text-center">
      <div className="font-condensed mb-2.5 text-sm font-semibold tracking-[4px] text-zr-green">
        {messages.sponsorsKicker}
      </div>
      <h1 className="font-display mb-2 text-5xl leading-none font-bold text-white uppercase">
        {messages.sponsorsTitle}
      </h1>
      <p className="mx-auto mb-10 max-w-[560px] text-[15.5px] text-zr-text-muted">
        {messages.sponsorsSub}
      </p>

      <PartnersGrid partners={partners} count={8} />

      <div className="mt-11 rounded-[10px] border border-white/7 bg-zr-bg-elevated px-9 py-9">
        <div className="font-display text-2xl font-semibold text-white uppercase">
          {messages.becomePartnerT}
        </div>
        <p className="mx-auto mt-2.5 max-w-[480px] text-[14.5px] text-zr-text-muted">
          {messages.becomePartnerB}
        </p>
        <PartnerButton className="font-condensed mt-5 inline-block cursor-pointer rounded bg-zr-green px-8 py-3.5 text-[15px] font-bold tracking-wider text-zr-bg uppercase">
          {messages.becomePartner}
        </PartnerButton>
      </div>
    </Container>
  )
}
