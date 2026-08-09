'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { localeHref, locales, routePath, type Locale } from '../../i18n/config'
import type { Messages } from '../../i18n/messages'
import { TrialButton } from '../modals/ModalTriggers'
import { Logo } from './Logo'

const NAV_ITEMS = [
  { path: 'schedule', key: 'navSchedule' },
  { path: 'events', key: 'navEvents' },
  { path: 'about', key: 'navAbout' },
  { path: 'partners', key: 'navSponsors' },
] as const

const LOCALE_LABELS: Record<Locale, string> = { sk: 'SK', en: 'EN', uk: 'UA' }

function LocaleSwitcher({ locale, current }: { locale: Locale; current: string }) {
  return (
    <div className="flex gap-0.5 rounded-[5px] bg-zr-bg-muted p-[3px]" role="group" aria-label="Language">
      {locales.map((target) => {
        const active = target === locale
        return (
          <Link
            key={target}
            href={localeHref(target, current)}
            aria-current={active ? 'page' : undefined}
            className={`lang-btn rounded px-2.5 py-1.5 text-[11px] font-bold tracking-wide ${
              active ? 'bg-zr-green text-zr-bg' : 'bg-transparent text-[#c9d2cb] hover:text-white'
            }`}
          >
            {LOCALE_LABELS[target]}
          </Link>
        )
      })}
    </div>
  )
}

export function Nav({ locale, messages }: { locale: Locale; messages: Messages }) {
  const pathname = usePathname()
  const current = routePath(pathname ?? '/')
  const [navOpen, setNavOpen] = useState(false)

  // The panel slides over the page — stop the body behind it from scrolling.
  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen)
    return () => document.body.classList.remove('nav-open')
  }, [navOpen])

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!navOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [navOpen])

  const homeHref = localeHref(locale, '')

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/7 bg-zr-bg/92 backdrop-blur-[10px]">
        <div className="mx-auto flex max-w-7xl container items-center justify-between px-5 py-4 md:px-10">
          <Link href={homeHref} className="flex cursor-pointer items-center gap-3.5">
            <Logo className="h-16 w-16" width={64} height={64} />
            <div className="font-condensed text-lg leading-none font-bold tracking-wide text-white">
              ZR TEAM
              <div className="font-body text-[9.5px] font-medium tracking-[3px] text-zr-green">
                Brazilian Jiu-Jitsu
              </div>
            </div>
          </Link>

          <div className="nav-desktop hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const active = current === item.path
                return (
                  <Link
                    key={item.path}
                    href={localeHref(locale, item.path)}
                    aria-current={active ? 'page' : undefined}
                    className={`navlink cursor-pointer border-b-2 pb-0.5 text-sm font-semibold tracking-wide transition-colors hover:text-white ${
                      active ? 'border-zr-green text-white' : 'border-transparent text-[#c9d2cb]'
                    }`}
                  >
                    {messages[item.key]}
                  </Link>
                )
              })}
            </nav>

            <LocaleSwitcher locale={locale} current={current} />

            <TrialButton className="font-condensed cursor-pointer rounded bg-zr-green px-5 py-2.5 text-sm font-bold tracking-wide text-zr-bg uppercase">
              {messages.ctaTrial}
            </TrialButton>
          </div>

          <button
            type="button"
            onClick={() => setNavOpen((open) => !open)}
            className="nav-toggle flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded border border-white/10 bg-zr-bg-surface md:hidden"
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            aria-label={navOpen ? messages.navMenuClose : messages.navMenuOpen}
          >
            <span className="nav-bar block h-[2px] w-[18px] rounded-full bg-white" />
            <span className="nav-bar block h-[2px] w-[18px] rounded-full bg-zr-green" />
            <span className="nav-bar block h-[2px] w-[18px] rounded-full bg-white" />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav${navOpen ? ' is-open' : ''}`}
        aria-hidden={!navOpen}
      >
        <div className="mobile-nav-backdrop" onClick={() => setNavOpen(false)} />

        {/* Only a dialog while it is open — otherwise assistive tech would
            treat the whole page as modal. */}
        <div
          className="mobile-nav-panel"
          role={navOpen ? 'dialog' : undefined}
          aria-modal={navOpen ? true : undefined}
          aria-label={messages.navMenuOpen}
        >
          <div className="mobile-nav-accent" aria-hidden="true" />

          <div className="mobile-nav-inner">
            <div className="flex items-center justify-between border-b border-white/7 pb-5">
              <Link
                href={homeHref}
                onClick={() => setNavOpen(false)}
                className="flex cursor-pointer items-center gap-3"
              >
                <Logo className="h-12 w-12" width={48} height={48} decorative />
                <span className="font-condensed text-[11px] font-bold tracking-[4px] text-zr-green uppercase">
                  ZR Team
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                className="mobile-nav-close cursor-pointer text-2xl leading-none text-zr-text-dim"
                aria-label={messages.navMenuClose}
              >
                ×
              </button>
            </div>

            <nav className="mobile-nav-links mt-8 flex flex-col">
              {NAV_ITEMS.map((item, index) => {
                const active = current === item.path
                return (
                  <Link
                    key={item.path}
                    href={localeHref(locale, item.path)}
                    onClick={() => setNavOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    style={{ ['--link-index' as string]: index }}
                    className={`mobile-nav-link font-display py-4 text-[1.75rem] leading-none font-semibold tracking-wide uppercase transition-colors ${
                      active ? 'text-zr-green' : 'text-white hover:text-zr-green'
                    }`}
                  >
                    {messages[item.key]}
                  </Link>
                )
              })}
            </nav>

            <div className="mobile-nav-footer mt-auto flex flex-col gap-5 border-t border-white/7 pt-6">
              <LocaleSwitcher locale={locale} current={current} />

              <TrialButton
                onClick={() => setNavOpen(false)}
                className="font-condensed w-full cursor-pointer rounded bg-zr-green py-4 text-base font-bold tracking-wider text-zr-bg uppercase"
              >
                {messages.ctaTrial}
              </TrialButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
