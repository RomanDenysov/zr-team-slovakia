import Link from 'next/link'
import { Container } from '../../../components/layout/Container'

export default function NotFound() {
  return (
    <Container className="max-w-3xl py-24 text-center">
      <div className="font-display text-[64px] leading-none font-bold text-zr-green">404</div>
      <p className="mt-4 text-lg text-zr-text-secondary">
        This page does not exist / Táto stránka neexistuje.
      </p>
      <Link
        href="/"
        className="font-condensed mt-8 inline-block rounded bg-zr-green px-8 py-3.5 text-[15px] font-bold tracking-wider text-zr-bg uppercase"
      >
        ZR Team
      </Link>
    </Container>
  )
}
