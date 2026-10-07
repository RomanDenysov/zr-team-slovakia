import type { Messages } from '../../i18n/messages'
import { TrialButton } from '../modals/ModalTriggers'

export function CtaBand({ messages }: { messages: Messages }) {
  return (
    <section className="rounded-lg border border-white/7 bg-zr-bg-elevated px-10 py-16 text-center">
      <div className="font-display mx-auto max-w-[640px] text-[40px] leading-tight font-bold text-white uppercase">
        {messages.ctaBandTitle}
      </div>
      <div className="mt-3.5 text-base text-zr-text-muted">{messages.ctaBandSub}</div>
      <TrialButton className="font-condensed mt-7 inline-block cursor-pointer rounded bg-zr-green px-11 py-4 text-[17px] font-bold tracking-wider text-zr-bg uppercase">
        {messages.ctaTrial}
      </TrialButton>
    </section>
  )
}
