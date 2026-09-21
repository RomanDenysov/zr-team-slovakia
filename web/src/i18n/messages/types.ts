/**
 * UI chrome strings. Editorial copy (hero, ZR Way, academies, class-type
 * descriptions, partners) lives in Payload — only labels live here.
 */
export interface Messages {
  // navigation
  navSchedule: string
  navEvents: string
  navAbout: string
  navSponsors: string
  navMenuOpen: string
  navMenuClose: string

  // calls to action
  ctaTrial: string
  ctaSchedule: string
  ctaBandTitle: string
  ctaBandSub: string

  // hero fallback (used only when the settings global has no hero yet)
  heroKicker: string
  heroTitle: string
  heroSub: string
  statAcademies: string
  statClasses: string
  statLineage: string

  // schedule
  schedKicker: string
  schedTitle: string
  restLabel: string
  filterAll: string
  days: string[]
  daysShort: string[]
  levels: Record<string, string>

  // events
  eventsKicker: string
  eventsTitle: string
  eventsLead: string
  recurringTitle: string
  recurringSub: string
  showMore: string
  eventRegister: string
  eventTypes: Record<string, string>
  weekdays: string[]
  monthsShort: string[]

  // posts
  postsKicker: string
  postsTitle: string
  postsLead: string
  showAllPosts: string

  // about
  aboutKicker: string
  aboutTitle: string
  aboutBody1: string
  aboutClickHint: string
  aboutTeaserCta: string
  wayKicker: string
  wayTitle: string
  wayIntro: string

  // partners
  sponsorsKicker: string
  sponsorsTitle: string
  sponsorsSub: string
  partnersTeaserSub: string
  becomePartner: string
  becomePartnerT: string
  becomePartnerB: string

  // modals
  mClassDay: string
  mClassTime: string
  mClassLevel: string
  mClassCoach: string
  mClassLoc: string
  mClassCta: string
  mLocAmen: string
  closeLabel: string
  phoneLabel: string
  emailLabel: string

  // forms
  trialTitle: string
  trialSub: string
  trialDoneT: string
  trialDoneB: string
  partnerTitle: string
  partnerSub: string
  partnerSubmit: string
  partnerDoneT: string
  partnerDoneB: string
  fName: string
  fEmail: string
  fPhone: string
  fMsg: string
  fSubmit: string
  fCompany: string
  fContact: string
  errRequired: string
  errEmail: string
  errGeneric: string

  // footer
  footerRights: string
}
