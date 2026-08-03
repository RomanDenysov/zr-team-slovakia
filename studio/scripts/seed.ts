import {createClient, type SanityClient} from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '7wvqvm3e'
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

function getClient(): SanityClient {
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (token) {
    return createClient({
      projectId,
      dataset,
      token,
      apiVersion: '2025-01-01',
      useCdn: false,
    })
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const {getCliClient} = require('sanity/cli') as typeof import('sanity/cli')
    return getCliClient({apiVersion: '2025-01-01'})
  } catch {
    console.error(
      'Missing write access. Either set SANITY_API_WRITE_TOKEN or run:\n  pnpm exec sanity exec scripts/seed.ts --with-user-token',
    )
    process.exit(1)
  }
}

type LocalizedString = {sk: string; en: string; ua: string}
type LocalizedText = {sk: string; en: string; ua: string}

function block(text: string, key: string, style: 'normal' | 'h2' = 'normal') {
  return {
    _type: 'block' as const,
    _key: key,
    style,
    children: [{_type: 'span' as const, _key: `${key}-span`, text, marks: [] as string[]}],
    markDefs: [] as unknown[],
  }
}

function localizedBlocks(content: {sk: string[]; en: string[]; ua: string[]}) {
  const toBlocks = (paragraphs: string[]) =>
    paragraphs.map((paragraph, index) => block(paragraph, `p-${index}`))
  return {
    sk: toBlocks(content.sk),
    en: toBlocks(content.en),
    ua: toBlocks(content.ua),
  }
}

const events = [
  {
    _id: 'event-seminar-leg-lock-2026',
    _type: 'event' as const,
    eventType: 'seminar' as const,
    slug: {current: 'leg-lock-seminar-2026'},
    startDate: '2026-07-12',
    title: {
      sk: 'Leg Lock seminár',
      en: 'Leg Lock Seminar',
      ua: 'Семінар Leg Lock',
    } satisfies LocalizedString,
    description: {
      sk: 'Celodenný seminár zameraný na nožné páky s hosťujúcim trénerom.',
      en: 'Full-day seminar focused on leg locks with a guest instructor.',
      ua: 'Цілоденний семінар із ножних замків із запрошеним тренером.',
    } satisfies LocalizedText,
    place: {
      sk: 'Košice',
      en: 'Košice',
      ua: 'Кошице',
    } satisfies LocalizedString,
    body: localizedBlocks({
      sk: [
        'Celodenný seminár venovaný nožným pákom — od základných pák cez vnútorné systémy až po bezpečné ukončenia. Hosťujúci tréner predvedie techniky, ktoré bežne nestíhame na týždenných tréningoch.',
        'Program je rozdelený na teoretickú časť, technické bloky a voľný tréning. Odporúčame prísť v kimone aj v No-Gi oblečení. Registrácia prebieha cez trénerov alebo na recepcii akadémie.',
        'Seminár je vhodný pre stredne pokročilých a pokročilých. Začiatočníci sú vítaní na pozorovanie a na úvodných blokoch.',
      ],
      en: [
        'A full-day seminar focused on leg locks — from basic entries through inside systems to safe finishes. Our guest instructor will cover techniques we rarely have time for in regular classes.',
        'The schedule includes theory, technical blocks and open training. Bring both gi and No-Gi gear. Register through your coach or at the academy reception.',
        'Best suited for intermediate and advanced students. Beginners are welcome to observe and join introductory blocks.',
      ],
      ua: [
        'Цілоденний семінар із ножних замків — від базових входів через inside systems до безпечних завершень. Запрошений тренер покаже техніки, на які рідко вистачає часу на звичайних тренуваннях.',
        'Програма включає теорію, технічні блоки та вільне тренування. Візьми кімоно та No-Gi одяг. Реєстрація через тренера або на рецепції академії.',
        'Підходить для середнього та просунутого рівня. Початківці можуть спостерігати та долучатися до вступних блоків.',
      ],
    }),
  },
  {
    _id: 'event-tournament-zr-open-2026',
    _type: 'event' as const,
    eventType: 'tournament' as const,
    slug: {current: 'zr-open-2026'},
    startDate: '2026-08-24',
    title: {
      sk: 'ZR Open 2026',
      en: 'ZR Open 2026',
      ua: 'ZR Open 2026',
    } satisfies LocalizedString,
    description: {
      sk: 'Domáci turnaj Gi & No-Gi pre všetky úrovne a vekové kategórie.',
      en: 'Home Gi & No-Gi tournament for all levels and age groups.',
      ua: 'Домашній турнір Gi та No-Gi для всіх рівнів і вікових груп.',
    } satisfies LocalizedText,
    place: {
      sk: 'Bratislava',
      en: 'Bratislava',
      ua: 'Братислава',
    } satisfies LocalizedString,
    body: localizedBlocks({
      sk: [
        'ZR Open je domáci turnaj pre celú komunitu — Gi aj No-Gi, dospelí aj deti. Kategórie sú rozdelené podľa pásu, veku a hmotnosti, aby bol zápas férový a bezpečný.',
        'Registrácia sa otvára 6 týždňov pred podujatím. Vstup pre divákov je zdarma. Na mieste bude občerstvenie, priestor na rozcvičku a technická podpora pre súťažiacich.',
        'Turnaj je skvelou príležitosťou otestovať techniku mimo akadémie. Ak je to tvoj prvý turnaj, porozprávaj sa s trénerom — pripravíme ťa na pravidlá aj na mentálnu stránku.',
      ],
      en: [
        'ZR Open is our home tournament for the whole community — Gi and No-Gi, adults and kids. Divisions are split by belt, age and weight for fair, safe matches.',
        'Registration opens six weeks before the event. Spectator entry is free. There will be refreshments, a warm-up area and mat-side support for competitors.',
        'A great chance to test your skills outside the academy. If this is your first tournament, talk to your coach — we will walk you through the rules and the mental side.',
      ],
      ua: [
        'ZR Open — домашній турнір для всієї спільноти: Gi та No-Gi, дорослі й діти. Категорії поділені за поясом, віком і вагою для чесних і безпечних поєдинків.',
        'Реєстрація відкривається за 6 тижнів до події. Вхід для глядачів безкоштовний. На місці буде перекус, зона розминки та підтримка для спортсmenів.',
        'Чудова можливість перевірити техніку поза академією. Якщо це твій перший турнір — поговори з тренером, ми підготуємо до правил і психологічної сторони.',
      ],
    }),
  },
  {
    _id: 'event-workshop-self-defense-2026',
    _type: 'event' as const,
    eventType: 'workshop' as const,
    slug: {current: 'obrana-proti-utoku'},
    startDate: '2026-09-05',
    title: {
      sk: 'Obrana proti útoku',
      en: 'Self-defense basics',
      ua: 'Основи самозахисту',
    } satisfies LocalizedString,
    description: {
      sk: 'Praktický workshop sebaobrany pre začiatočníkov aj verejnosť.',
      en: 'Hands-on self-defense workshop for beginners and the public.',
      ua: 'Практичний воркшоп із самозахисту для початківців і всіх охочих.',
    } satisfies LocalizedText,
    place: {
      sk: 'Košice',
      en: 'Košice',
      ua: 'Кошице',
    } satisfies LocalizedString,
    body: localizedBlocks({
      sk: [
        'Praktický workshop sebaobrany založený na princípoch BJJ — kontrola vzdialenosti, pádové techniky, úniky zo zovretí a bezpečné ukončenia situácie.',
        'Nie je potrebné predchádzajúce skúsenosti s bojovými športmi. Workshop je otvorený aj pre verejnosť, odporúčame pohodlné športové oblečenie.',
        'Trvanie 3 hodiny. Na záver bude priestor na otázky a ukážky situácií, ktoré účastníci riešia najčastejšie.',
      ],
      en: [
        'A practical self-defense workshop built on BJJ principles — distance control, breakfalls, escapes from holds and safe resolution of conflict.',
        'No prior martial arts experience required. Open to the public; wear comfortable athletic clothing.',
        'Three hours long. We finish with Q&A and demos of the situations participants ask about most often.',
      ],
      ua: [
        'Практичний воркшоп із самозахисту на принципах BJJ — контроль дистанції, перекати, виходи з захватів і безпечне завершення ситуації.',
        'Попередній досвід не потрібен. Відкрито для всіх; одягай зручний спортивний одяг.',
        'Тривалість 3 години. Наприкінці — запитання та демонстрації ситуацій, які учасники питають найчастіше.',
      ],
    }),
  },
  {
    _id: 'event-camp-autumn-bjj-2026',
    _type: 'event' as const,
    eventType: 'camp' as const,
    slug: {current: 'jesenny-bjj-kemp'},
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    title: {
      sk: 'Jesenný BJJ kemp',
      en: 'Autumn BJJ camp',
      ua: 'Осінній BJJ kemp',
    } satisfies LocalizedString,
    description: {
      sk: 'Víkendový kemp s trénermi oboch akadémií v horskom prostredí.',
      en: 'Weekend camp with coaches from both academies in the mountains.',
      ua: 'Вікенд-кемп із тренерами обох академій у горах.',
    } satisfies LocalizedText,
    place: {
      sk: 'Vysoké Tatry',
      en: 'High Tatras',
      ua: 'Високі Татри',
    } satisfies LocalizedString,
    body: localizedBlocks({
      sk: [
        'Víkendový kemp s trénermi z Košíc aj Bratislavy v horskom prostredí. Ráno technika, popoludní sparing a večer spoločný program.',
        'Ubytovanie je zabezpečené v chatke pri objekte. Strava je zahrnutá v cene. Kapacita je obmedzená — prihlás sa včas cez trénera.',
        'Kemp je určený pre členov ZR Team aj hostí z partnerských klubov. Ideálna príležitosť na intenzívny progres mimo bežného rozvrhu.',
      ],
      en: [
        'A weekend camp with coaches from Košice and Bratislava in the mountains. Mornings for technique, afternoons for sparring and evenings together.',
        'Accommodation is in a lodge on site. Meals are included. Capacity is limited — sign up early through your coach.',
        'Open to ZR Team members and guests from partner clubs. A perfect chance for focused progress away from the weekly schedule.',
      ],
      ua: [
        'Вікенд-кемп із тренерами з Кошиць і Братислави в горах. Ранок — техніка, день — спаринг, вечір — спільна програма.',
        'Проживання в будинку на території. Харчування включене. Місць обмежено — реєструйся заздалегідь через тренера.',
        'Для членів ZR Team і гостей партнерських клубів. Ідеальна можливість для інтенсивного прогресу поза звичайним розкладом.',
      ],
    }),
  },
]

const recurringEvents = [
  {
    _id: 'recurring-open-mat-kosice',
    _type: 'recurringEvent' as const,
    dayOfWeek: 6,
    time: '10:00',
    title: {
      sk: 'Open Mat — Košice',
      en: 'Open Mat — Košice',
      ua: 'Open Mat — Кошице',
    } satisfies LocalizedString,
    place: {
      sk: 'Košice',
      en: 'Košice',
      ua: 'Кошице',
    } satisfies LocalizedString,
  },
  {
    _id: 'recurring-open-mat-bratislava',
    _type: 'recurringEvent' as const,
    dayOfWeek: 0,
    time: '10:30',
    title: {
      sk: 'Open Mat — Bratislava',
      en: 'Open Mat — Bratislava',
      ua: 'Open Mat — Братислава',
    } satisfies LocalizedString,
    place: {
      sk: 'Bratislava',
      en: 'Bratislava',
      ua: 'Братислава',
    } satisfies LocalizedString,
  },
]

type ScheduleSeed = {
  _id: string
  dayIndex: number
  startTime: string
  endTime: string
  classType: 'Gi' | 'No-Gi' | 'Kids' | 'Open Mat'
  level: 'all' | 'beg' | 'adv' | 'kids'
  coach: string
  location: 'KE' | 'BA'
}

const scheduleEntries: ScheduleSeed[] = [
  {dayIndex: 0, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'José R.', location: 'KE'},
  {dayIndex: 0, startTime: '19:30', endTime: '20:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'KE'},
  {dayIndex: 1, startTime: '17:00', endTime: '18:00', classType: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE'},
  {dayIndex: 1, startTime: '18:00', endTime: '19:30', classType: 'No-Gi', level: 'all', coach: 'José R.', location: 'KE'},
  {dayIndex: 2, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'beg', coach: 'Tomáš V.', location: 'KE'},
  {dayIndex: 2, startTime: '19:30', endTime: '21:00', classType: 'Gi', level: 'adv', coach: 'José R.', location: 'KE'},
  {dayIndex: 3, startTime: '17:00', endTime: '18:00', classType: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE'},
  {dayIndex: 3, startTime: '18:30', endTime: '20:00', classType: 'No-Gi', level: 'adv', coach: 'José R.', location: 'KE'},
  {dayIndex: 4, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'Tomáš V.', location: 'KE'},
  {dayIndex: 5, startTime: '10:00', endTime: '11:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'KE'},
  {dayIndex: 0, startTime: '17:30', endTime: '18:30', classType: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA'},
  {dayIndex: 0, startTime: '18:30', endTime: '20:00', classType: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 1, startTime: '18:00', endTime: '19:30', classType: 'No-Gi', level: 'all', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 2, startTime: '17:30', endTime: '18:30', classType: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA'},
  {dayIndex: 2, startTime: '18:30', endTime: '20:00', classType: 'Gi', level: 'beg', coach: 'Daniel S.', location: 'BA'},
  {dayIndex: 3, startTime: '18:30', endTime: '20:00', classType: 'No-Gi', level: 'adv', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 4, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA'},
  {dayIndex: 4, startTime: '19:30', endTime: '20:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'BA'},
  {dayIndex: 6, startTime: '10:30', endTime: '12:00', classType: 'Open Mat', level: 'all', coach: '—', location: 'BA'},
].map((entry) => ({
  ...entry,
  _id: `schedule-${entry.location.toLowerCase()}-d${entry.dayIndex}-${entry.startTime.replace(':', '')}-${entry.classType.toLowerCase().replace(/\s+/g, '-')}`,
}))

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings' as const,
  title: 'Zé Radiola Team',
  description: 'Brazilian Jiu-Jitsu in Košice and Bratislava. Two academies, one team.',
  hero: {
    kicker: {
      sk: 'KOŠICE · BRATISLAVA',
      en: 'KOŠICE · BRATISLAVA',
      ua: 'KOŠICE · BRATISLAVA',
    } satisfies LocalizedString,
    title: {
      sk: 'Brazílske jiu-jitsu v Košiciach a Bratislave',
      en: 'Brazilian Jiu-Jitsu in Košice & Bratislava',
      ua: 'Бразильське джиу-джитсу в Кошице та Братиславі',
    } satisfies LocalizedString,
    subtitle: {
      sk: 'Tréningy pre každú úroveň, vedené skúsenými trénermi. Dve akadémie, jeden tím — pridaj sa k ZRTeam.',
      en: 'Classes for every level, led by experienced coaches. Two academies, one team — join ZRTeam.',
      ua: 'Заняття для будь-якого рівня під керівництвом досвідчених тренерів. Дві академії, одна команда — приєднуйся до ZRTeam.',
    } satisfies LocalizedText,
    stats: [
      {
        _key: 'stat-academies',
        value: '2',
        label: {sk: 'AKADÉMIE', en: 'ACADEMIES', ua: 'АКАДЕМІЇ'} satisfies LocalizedString,
      },
      {
        _key: 'stat-classes',
        value: '20+',
        label: {
          sk: 'TRÉNINGOV / TÝŽDEŇ',
          en: 'CLASSES / WEEK',
          ua: 'ЗАНЯТЬ / ТИЖДЕНЬ',
        } satisfies LocalizedString,
      },
      {
        _key: 'stat-lineage',
        value: 'IBJJF',
        label: {sk: 'PÔVOD', en: 'LINEAGE', ua: 'ПОХОДЖЕННЯ'} satisfies LocalizedString,
      },
    ],
  },
}

const posts = [
  {
    _id: 'post-povod',
    _type: 'post' as const,
    publishedAt: '2026-06-20T10:00:00.000Z',
    slug: {current: 'povod'},
    title: {
      sk: 'Pôvod',
      en: 'Lineage',
      ua: 'Походження',
    } satisfies LocalizedString,
    excerpt: {
      sk: 'Naša línia siaha k brazílskej škole jiu-jitsu. Techniku a hodnoty odovzdávame ďalej tak, ako boli odovzdané nám.',
      en: 'Our line traces back to the Brazilian school of jiu-jitsu. We pass on technique and values the way they were passed to us.',
      ua: 'Наша лінія сягає бразильської школи джиу-джитсу. Ми передаємо техніку й цінності так, як їх передали нам.',
    } satisfies LocalizedText,
    body: localizedBlocks({
      sk: [
        'Zé Radiola Team stojí na línii, ktorá sa formovala desaťročia v Brazílii aj na Slovensku. Pre nás nie je BJJ len súbor techník — je to spôsob učenia sa, tréningu a správania sa na mate.',
        'Každý tréner v našom tíme prešiel rovnakou cestou: základy, trpezlivosť, opakovanie. To isté očakávame aj od našich študentov. Nepreskakujeme kroky, pretože vieme, že pevné základy nesú celý ďalší progres.',
        'Keď hovoríme o pôvode, nemyslíme tým minulosť pre minulosť. Myslíme tým rešpekt k tomu, odkiaľ technika prišla — a zodpovednosť odovzdať ju ďalej v kvalite, ktorej môžeme veriť.',
      ],
      en: [
        'Zé Radiola Team stands on a lineage shaped over decades in Brazil and Slovakia. For us, BJJ is not just a set of techniques — it is a way of learning, training and behaving on the mats.',
        'Every coach on our team walked the same path: fundamentals, patience, repetition. We expect the same from our students. We do not skip steps because solid basics carry all further progress.',
        'When we speak about lineage, we do not mean history for its own sake. We mean respect for where the art came from — and the responsibility to pass it on at a standard we can stand behind.',
      ],
      ua: [
        'Zé Radiola Team стоїть на лінії, що формувалася десятиліттями в Бразилії та на Словаччині. Для нас BJJ — це не просто набір технік, а спосіб навчання, тренування і поведінки на татамі.',
        'Кожен тренер у нашій команді пройшов той самий шлях: основи, терпіння, повторення. Ми очікуємо того ж від студентів. Не пропускаємо кроки, бо міцні основи несуть увесь подальший прогрес.',
        'Коли говоримо про походження, маємо на увазі не минуле заради минулого. Маємо на увазі повагу до того, звідки прийшло мистецтво, і відповідальність передати його далі в якості, якій можемо довіряти.',
      ],
    }),
  },
  {
    _id: 'post-respekt',
    _type: 'post' as const,
    publishedAt: '2026-06-10T10:00:00.000Z',
    slug: {current: 'respekt'},
    title: {
      sk: 'Rešpekt',
      en: 'Respect',
      ua: 'Повага',
    } satisfies LocalizedString,
    excerpt: {
      sk: 'Na mate sme si rovní. Pomáhame si rásť — bez ega, s pokorou a trpezlivosťou.',
      en: 'On the mat we are equals. We help each other grow — no ego, with humility and patience.',
      ua: 'На татамі ми рівні. Ми допомагаємо одне одному зростати — без его, з повагою та терпінням.',
    } satisfies LocalizedText,
    body: localizedBlocks({
      sk: [
        'Rešpekt v ZR Team začína už pri vstupe do akadémie. Pozdravíš trénera, partnera aj nováčika, ktorý prichádza na prvý tréning. Tieto detaily vytvárajú prostredie, kde sa človek nemusí báť učiť.',
        'Na mate neexistuje „slabší" alebo „silnejší" človek — existuje len partner, s ktorým riešiš techniku. Ak niečo nejde, spomalíme. Ak ideš príliš tvrdo, upravíme tempo. Cieľom nie je vyhrať nad spoluhráčom, ale pochopiť hru.',
        'Rešpekt sa prejavuje aj mimo tréningu: v komunikácii, v dochvíľnosti, v tom, ako reprezentujeme klub na súťažiach. Sme tím — a tím sa správa tak, že sa k nemu ostatní radi pridajú.',
      ],
      en: [
        'Respect at ZR Team starts the moment you enter the academy. You greet your coach, your partner and the beginner on their first class. These details create an environment where people are not afraid to learn.',
        'On the mats there is no “weaker” or “stronger” person — only a partner to solve the technique with. If something does not work, we slow down. If you go too hard, we adjust the pace. The goal is not to beat your teammate but to understand the game.',
        'Respect also shows outside training: in communication, punctuality and how we represent the club at competitions. We are one team — and a team behaves in a way others want to join.',
      ],
      ua: [
        'Повага в ZR Team починається вже при вході в академію. Ти вітаєш тренера, партнера й новачка на першому тренуванні. Саме такі деталі створюють простір, де не страшно вчитися.',
        'На татамі немає «слабшого» чи «сильнішого» — є лише партнер, з яким ти відпрацьовуєш техніку. Якщо щось не виходить, сповільнюємось. Якщо занадто жорстко — коригуємо темп. Мета не перемогти одноклубника, а зрозуміти гру.',
        'Повага проявляється й поза тренуванням: у спілкуванні, пунктуальності та тому, як ми представляємо клуб на змаганнях. Ми команда — і команда поводиться так, до якої хочуть долучитися.',
      ],
    }),
  },
  {
    _id: 'post-disciplina',
    _type: 'post' as const,
    publishedAt: '2026-05-30T10:00:00.000Z',
    slug: {current: 'disciplina'},
    title: {
      sk: 'Disciplína',
      en: 'Discipline',
      ua: 'Дисципліна',
    } satisfies LocalizedString,
    excerpt: {
      sk: 'Pravidelnosť a poctivá práca sú dôležitejšie než talent. Pokrok prichádza opakovaním.',
      en: 'Consistency and honest work matter more than talent. Progress comes from repetition.',
      ua: 'Регулярність і чесна праця важливіші за талант. Прогрес приходить із повторенням.',
    } satisfies LocalizedText,
    body: localizedBlocks({
      sk: [
        'Disciplína v BJJ neznamená prísny režim za každú cenu. Znamená vracať sa na mat aj v dni, keď sa ti nechce — pretože vieš, že práve také dni robia rozdiel.',
        'Na tréningu sa sústredíme na kvalitu opakovania. Radšej desať čistých opakovaní než sto unavených pokusov. Tréner ti pomôže nastaviť tempo, ale zodpovednosť za prítomnosť a pozornosť je vždy tvoja.',
        'Najväčší progres nevidíš po jednom tréningu. Vidíš ho po mesiaci pravidelnosti, po roku vytrvalosti. Disciplína je tichá — ale na mate ju spoznáš okamžite.',
      ],
      en: [
        'Discipline in BJJ does not mean a harsh routine at any cost. It means showing up on the days you do not feel like it — because those are the days that make the difference.',
        'In training we focus on quality repetition. Ten clean reps beat a hundred tired attempts. Your coach helps set the pace, but responsibility for showing up and paying attention is always yours.',
        'The biggest progress is not visible after one class. You see it after a month of consistency, a year of persistence. Discipline is quiet — but on the mats you recognize it instantly.',
      ],
      ua: [
        'Дисципліна в BJJ — це не суворий режим будь-якою ціною. Це приходити на татамі в дні, коли не хочеться, бо саме такі дні роблять різницю.',
        'На тренуванні ми зосереджуємось на якості повторень. Краще десять чистих повторів, ніж сто втомлених спроб. Тренер допоможе з темпом, але відповідальність за присутність і увагу — твоя.',
        'Найбільший прогрес не видно після одного заняття. Його видно після місяця регулярності, року наполегливості. Дисципліна тиха — але на татамі її одразу помічаєш.',
      ],
    }),
  },
  {
    _id: 'post-komunita',
    _type: 'post' as const,
    publishedAt: '2026-05-20T10:00:00.000Z',
    slug: {current: 'komunita'},
    title: {
      sk: 'Komunita',
      en: 'Community',
      ua: 'Спільнота',
    } satisfies LocalizedString,
    excerpt: {
      sk: 'Dve akadémie, jeden tím. Trénujeme spolu, súťažíme spolu a oslavujeme spolu.',
      en: 'Two academies, one team. We train together, compete together and celebrate together.',
      ua: 'Дві академії, одна команда. Ми тренуємось, змагаємось і святкуємо разом.',
    } satisfies LocalizedText,
    body: localizedBlocks({
      sk: [
        'Košice a Bratislava sú dve mestá, ale ZR Team je jedna rodina. Spája nás spoločný rozvrh, súťaže, semináre a open maty, na ktorých sa stretávame bez ohľadu na to, kde trénuješ.',
        'Komunita sa buduje aj mimo tatami: spoločné výjazdy na turnaje, pomoc nováčikom, zdieľanie skúseností medzi pásmi. Keď niekto z tímu súťaží, cítime sa tam spolu s ním.',
        'Ak hľadáš miesto, kde ťa poznajú menom a záleží im na tvojom progrese, si na správnom mieste. Prvý krok je jednoduchý — príď na skúšobný tréning a predstav sa.',
      ],
      en: [
        'Košice and Bratislava are two cities, but ZR Team is one family. We share a schedule, competitions, seminars and open mats where we meet no matter which academy you train at.',
        'Community is built off the mats too: tournament trips together, helping beginners, sharing experience across belt levels. When someone from the team competes, we are there with them.',
        'If you are looking for a place where people know your name and care about your progress, you are in the right place. The first step is simple — come for a trial class and introduce yourself.',
      ],
      ua: [
        'Кошице та Братислава — два міста, але ZR Team — одна родина. Нас об’єднує спільний розклад, змагання, семінари та open mat, де ми зустрічаємось незалежно від академії.',
        'Спільнота будується й поза татамі: спільні поїздки на турніри, допомога новачкам, обмін досвідом між поясами. Коли хтось із команди змагається, ми там разом із ним.',
        'Якщо шукаєш місце, де знають твоє ім’я і дбають про твій прогрес — ти в правильному місці. Перший крок простий: прийди на пробне тренування і представся.',
      ],
    }),
  },
  {
    _id: 'post-welcome-zr-team',
    _type: 'post' as const,
    publishedAt: '2026-06-15T10:00:00.000Z',
    slug: {current: 'vitaj-v-zr-team'},
    title: {
      sk: 'Vitaj v ZR Team',
      en: 'Welcome to ZR Team',
      ua: 'Ласкаво просимо до ZR Team',
    } satisfies LocalizedString,
    excerpt: {
      sk: 'Krátky úvod do komunity, hodnôt a toho, čo ťa čaká na prvom tréningu.',
      en: 'A short introduction to the community, our values and what to expect at your first class.',
      ua: 'Коротке знайомство зі спільнотою, цінностями та тим, чого очікувати на першому тренуванні.',
    } satisfies LocalizedText,
    body: localizedBlocks({
      sk: [
        'Prvý tréning je vždy zadarmo. Stačí prísť v pohodlnom oblečení — kimono nie je potrebné. Tréner ťa privíta, ukáže ti základy a zaradí ťa do skupiny podľa úrovne.',
        'Na mate platí jedno pravidlo: rešpekt. K sebe, k partnerom aj k trénerom. Ak máš otázky, opýtaj sa — komunita je tu pre teba.',
        'Po tréningu sa môžeš zastaviť na recepcii, dohodnúť si ďalší termín alebo len pokecať s tímom. BJJ je individuálny šport, ale v ZR Team sa nikdy necítiš sám.',
      ],
      en: [
        'Your first class is always free. Just come in comfortable clothes — a gi is not required. A coach will welcome you, show you the basics and place you in a group that matches your level.',
        'One rule on the mats: respect. For yourself, your partners and your coaches. If you have questions, ask — the community is here for you.',
        'After class you can stop by reception, book your next session or simply talk with the team. BJJ is an individual sport, but at ZR Team you never feel alone.',
      ],
      ua: [
        'Перше тренування завжди безкоштовне. Приходь у зручному одязі — кімоно не обов\u2019язкове. Тренер зустріне тебе, покаже основи та підбере групу за рівнем.',
        'На татамі діє одне правило: повага. До себе, до партнерів і до тренерів. Якщо є питання — питай, спільнота поруч.',
        'Після тренування можеш зайти на рецепцію, домовитись про наступне заняття або просто поспілкуватися з командою. BJJ — індивідуальний спорт, але в ZR Team ти не сам.',
      ],
    }),
  },
  {
    _id: 'post-open-mat-tips',
    _type: 'post' as const,
    publishedAt: '2026-05-28T10:00:00.000Z',
    slug: {current: 'open-mat-tipy'},
    title: {
      sk: 'Ako využiť open mat',
      en: 'How to make the most of open mat',
      ua: 'Як використати open mat',
    } satisfies LocalizedString,
    excerpt: {
      sk: 'Open mat nie je len voľný sparing — je to priestor na opakovanie, otázky a experimentovanie.',
      en: 'Open mat is not just free sparring — it is space to drill, ask questions and experiment.',
      ua: 'Open mat — це не лише вільний спаринг, а простір для відпрацювання, запитань і експериментів.',
    } satisfies LocalizedText,
    body: localizedBlocks({
      sk: [
        'Pred open matom si vyber jednu techniku z týždňa a zopakuj ju s partnerom. Po sparingu sa pýtaj trénera na detaily — práve na open mate máš čas venovať sa veciam, ktoré nestíhaš na bežnom tréningu.',
        'Nezabudni na hydratáciu a na to, že open mat je pre všetky úrovne. Ak si začiatočník, povedz partnerovi — nájdete tempo, ktoré vám obom sedí.',
        'Open mat je tiež miesto, kde sa spoznáva celý tím z oboch akadémií. Využi ho na sparing s ľuďmi, s ktorými bežne netrénuješ — rozšíri ti to hru.',
      ],
      en: [
        'Before open mat, pick one technique from the week and drill it with a partner. After sparring, ask a coach about the details — open mat is where you have time for the things a regular class does not cover.',
        'Stay hydrated and remember open mat is for every level. If you are a beginner, tell your partner — you will find a pace that works for both of you.',
        'Open mat is also where you meet the whole team from both academies. Use it to roll with people you do not usually train with — it will expand your game.',
      ],
      ua: [
        'Перед open mat обери одну техніку з тижня і відпрацюй її з партнером. Після спарингу запитай тренера про деталі — саме на open mat є час для того, чого не встигає звичайне заняття.',
        'Не забувай про воду і пам\u2019ятай: open mat для всіх рівнів. Якщо ти початківець — скажи партнеру, знайдете комфортний темп.',
        'Open mat — також місце, де знайомишся з усією командою з обох академій. Скористайся можливістю покататися з тими, з ким зазвичай не тренуєшся — це розширить твою гру.',
      ],
    }),
  },
]

async function upsertDocuments(client: SanityClient, docs: Array<Record<string, unknown>>) {
  const transaction = client.transaction()
  for (const doc of docs) {
    transaction.createOrReplace(doc)
  }
  await transaction.commit()
}

async function seed() {
  const client = getClient()
  console.log(`Seeding ${dataset} on project ${projectId}…`)

  await upsertDocuments(client, events)
  console.log(`✓ ${events.length} events`)

  await upsertDocuments(client, recurringEvents)
  console.log(`✓ ${recurringEvents.length} recurring events`)

  await upsertDocuments(
    client,
    scheduleEntries.map((entry) => ({
      _type: 'scheduleEntry',
      ...entry,
    })),
  )
  console.log(`✓ ${scheduleEntries.length} schedule entries`)

  await upsertDocuments(client, [siteSettings])
  console.log('✓ site settings with hero content')

  await upsertDocuments(client, posts)
  console.log(`✓ ${posts.length} posts`)

  console.log('Done.')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
