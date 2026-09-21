import type { Messages } from '../../i18n/messages'
import { Logo } from './Logo'

export function Footer({ messages }: { messages: Messages }) {
  return (
    <footer className="border-t border-white/7 bg-zr-bg-footer">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-10 py-11">
        <div className="flex items-center gap-3.5">
          <Logo className="h-14 w-14" width={56} height={56} decorative />
          <div className="font-condensed text-[15px] font-bold tracking-wide text-white">
            ZÉ RADIOLA TEAM
            <div className="font-body text-[11px] tracking-wide text-zr-text-faint">
              Brazilian Jiu-Jitsu · Slovakia
            </div>
          </div>
        </div>

        <div className="flex gap-6 text-[13px] font-semibold text-zr-text-muted">
          <span className="cursor-default">Instagram</span>
          <span className="cursor-default">Facebook</span>
          <span className="cursor-default">YouTube</span>
        </div>

        <div className="text-xs text-[#5a6259]">
          © {new Date().getFullYear()} ZRTeam · <span>{messages.footerRights}</span>
        </div>
      </div>
    </footer>
  )
}
