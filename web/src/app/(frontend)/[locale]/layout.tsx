import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'
import { Barlow, Barlow_Condensed, Oswald } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '../../../components/layout/Footer'
import { Nav } from '../../../components/layout/Nav'
import { ModalProvider } from '../../../components/modals/ModalProvider'
import { htmlLang, isLocale, locales, type Locale } from '../../../i18n/config'
import { getMessages } from '../../../i18n/messages'
import { getLocations, getSettings } from '../../../lib/content'
import '../globals.css'

const oswald = Oswald({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const settings = await getSettings({ locale })
  const base = process.env.NEXT_PUBLIC_SERVER_URL

  return {
    metadataBase: base ? new URL(base) : undefined,
    title: {
      default: `${settings.title} — Brazilian Jiu-Jitsu`,
      template: `%s — ${settings.title}`,
    },
    description: settings.description ?? undefined,
    icons: { icon: '/zr-logo.svg' },
  }
}

export default async function FrontendLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const typedLocale: Locale = locale
  const messages = getMessages(typedLocale)
  const locations = await getLocations({ locale: typedLocale })

  return (
    <html
      lang={htmlLang[typedLocale]}
      className={`${oswald.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="flex h-full min-h-screen flex-col bg-zr-bg">
        <ModalProvider
          messages={messages}
          locale={typedLocale}
          academies={locations.map((location) => location.city)}
        >
          <Nav locale={typedLocale} messages={messages} />
          <main className="flex-1">{children}</main>
          <Footer messages={messages} />
        </ModalProvider>
        <Analytics />
      </body>
    </html>
  )
}
