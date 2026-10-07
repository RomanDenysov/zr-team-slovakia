import type { Locale } from '../i18n/config'

/** A value in all three languages. */
export type L<T> = Record<Locale, T>

export interface ClassTypeSeed {
  name: string
  color: string
  order: number
  description: L<string>
}

export interface LocationSeed {
  code: string
  order: number
  phone: string
  email: string
  city: L<string>
  badge: L<string>
  address: L<string>
  description: L<string>
  amenities: L<string[]>
}

export interface ScheduleSeed {
  dayIndex: number
  startTime: string
  endTime: string
  classType: string
  level: 'all' | 'beg' | 'adv' | 'kids'
  coach: string
  location: string
}

export interface RecurringSeed {
  dayIndex: number
  time: string
  title: L<string>
  place: L<string>
}

export interface EventSeed {
  slug: string
  eventType: 'seminar' | 'tournament' | 'workshop' | 'camp'
  startDate: string
  endDate?: string
  title: L<string>
  description: L<string>
  place: L<string>
  body: L<string[]>
}

export interface PostSeed {
  slug: string
  publishedAt: string
  title: L<string>
  excerpt: L<string>
  body: L<string[]>
}

export const classTypes: ClassTypeSeed[] = [
  {
    name: 'Gi',
    color: '#43c95b',
    order: 0,
    description: {
      sk: 'Tréning v kimone (gi) — základ brazílskeho jiu-jitsu. Úchopy, kontrola a submisie s využitím odevu.',
      en: 'Training in the kimono (gi) — the foundation of Brazilian Jiu-Jitsu. Grips, control and submissions using the uniform.',
      uk: 'Тренування в кімоно (gi) — основа бразильського джиу-джитсу. Захвати, контроль і сабміти з використанням форми.',
    },
  },
  {
    name: 'No-Gi',
    color: '#3a9bd9',
    order: 1,
    description: {
      sk: 'Tréning bez kimona — rýchlejšie tempo, dôraz na kontrolu tela, wrestling a leg locky.',
      en: 'Training without the kimono — faster pace, emphasis on body control, wrestling and leg locks.',
      uk: 'Тренування без кімоно — швидший темп, акцент на контролі тіла, боротьбі та ножних замках.',
    },
  },
  {
    name: 'Kids',
    color: '#e0a83c',
    order: 2,
    description: {
      sk: 'Hravý a bezpečný tréning pre deti — koordinácia, disciplína a sebadôvera.',
      en: 'Playful and safe training for kids — coordination, discipline and confidence.',
      uk: 'Ігрове та безпечне тренування для дітей — координація, дисципліна та впевненість.',
    },
  },
  {
    name: 'Open Mat',
    color: '#b06ae0',
    order: 3,
    description: {
      sk: 'Voľný tréning bez vedenia trénera. Priestor na sparing, opakovanie techník a otázky.',
      en: 'Free training without an instructor. Space to spar, drill techniques and ask questions.',
      uk: 'Вільне тренування без тренера. Простір для спарингу, відпрацювання технік і запитань.',
    },
  },
]

export const locations: LocationSeed[] = [
  {
    code: 'KE',
    order: 0,
    phone: '+421 900 111 222',
    email: 'kosice@zrteam.sk',
    city: { sk: 'KOŠICE', en: 'KOŠICE', uk: 'КОШИЦЕ' },
    badge: { sk: 'HLAVNÁ', en: 'MAIN', uk: 'ГОЛОВНА' },
    address: {
      sk: 'Športová hala, Trieda SNP 48, Košice',
      en: 'Sports Hall, Trieda SNP 48, Košice',
      uk: 'Спортивна зала, Trieda SNP 48, Кошице',
    },
    description: {
      sk: 'Naša hlavná akadémia v Košiciach s priestrannou matovou plochou, šatňami so sprchami a parkovaním pri hale. Tréningy prebiehajú počas celého týždňa.',
      en: 'Our main academy in Košice with a spacious mat area, changing rooms with showers and parking by the hall. Classes run throughout the week.',
      uk: 'Наша головна академія в Кошице з просторим татамі, роздягальнями з душем і парковкою біля зали. Тренування проходять протягом усього тижня.',
    },
    amenities: {
      sk: ['Matová plocha 120 m²', 'Šatne + sprchy', 'Parkovanie zdarma', 'Detská zóna'],
      en: ['120 m² mat area', 'Changing rooms + showers', 'Free parking', 'Kids zone'],
      uk: ['Татамі 120 м²', 'Роздягальні + душ', 'Безкоштовна парковка', 'Дитяча зона'],
    },
  },
  {
    code: 'BA',
    order: 1,
    phone: '+421 900 333 444',
    email: 'bratislava@zrteam.sk',
    city: { sk: 'BRATISLAVA', en: 'BRATISLAVA', uk: 'БРАТИСЛАВА' },
    badge: { sk: 'POBOČKA', en: 'BRANCH', uk: 'ФІЛІЯ' },
    address: {
      sk: 'Fight Centrum, Račianska 12, Bratislava',
      en: 'Fight Centrum, Račianska 12, Bratislava',
      uk: 'Fight Centrum, Račianska 12, Братислава',
    },
    description: {
      sk: 'Bratislavská pobočka v modernom Fight Centre. Zdieľaná komunita, tie isté hodnoty, kompletný rozvrh Gi, No-Gi aj detských tréningov.',
      en: 'The Bratislava branch in a modern Fight Centrum. Shared community, the same values, a full schedule of Gi, No-Gi and kids classes.',
      uk: 'Філія в Братиславі в сучасному Fight Centrum. Спільна громада, ті самі цінності, повний розклад Gi, No-Gi та дитячих тренувань.',
    },
    amenities: {
      sk: ['Matová plocha 90 m²', 'Šatne + sprchy', 'Posilňovňa', 'MHD pri vchode'],
      en: ['90 m² mat area', 'Changing rooms + showers', 'Gym', 'Public transport at door'],
      uk: ['Татамі 90 м²', 'Роздягальні + душ', 'Тренажерний зал', 'Транспорт біля входу'],
    },
  },
]

export const schedule: ScheduleSeed[] = [
  { dayIndex: 0, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'José R.', location: 'KE' },
  { dayIndex: 0, startTime: '19:30', endTime: '20:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'KE' },
  { dayIndex: 1, startTime: '17:00', endTime: '18:00', classType: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE' },
  { dayIndex: 1, startTime: '18:00', endTime: '19:30', classType: 'No-Gi', level: 'all', coach: 'José R.', location: 'KE' },
  { dayIndex: 2, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'beg', coach: 'Tomáš V.', location: 'KE' },
  { dayIndex: 2, startTime: '19:30', endTime: '21:00', classType: 'Gi', level: 'adv', coach: 'José R.', location: 'KE' },
  { dayIndex: 3, startTime: '17:00', endTime: '18:00', classType: 'Kids', level: 'kids', coach: 'Marek H.', location: 'KE' },
  { dayIndex: 3, startTime: '18:30', endTime: '20:00', classType: 'No-Gi', level: 'adv', coach: 'José R.', location: 'KE' },
  { dayIndex: 4, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'Tomáš V.', location: 'KE' },
  { dayIndex: 5, startTime: '10:00', endTime: '11:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'KE' },
  { dayIndex: 0, startTime: '17:30', endTime: '18:30', classType: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA' },
  { dayIndex: 0, startTime: '18:30', endTime: '20:00', classType: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA' },
  { dayIndex: 1, startTime: '18:00', endTime: '19:30', classType: 'No-Gi', level: 'all', coach: 'Pavol K.', location: 'BA' },
  { dayIndex: 2, startTime: '17:30', endTime: '18:30', classType: 'Kids', level: 'kids', coach: 'Lucia B.', location: 'BA' },
  { dayIndex: 2, startTime: '18:30', endTime: '20:00', classType: 'Gi', level: 'beg', coach: 'Daniel S.', location: 'BA' },
  { dayIndex: 3, startTime: '18:30', endTime: '20:00', classType: 'No-Gi', level: 'adv', coach: 'Pavol K.', location: 'BA' },
  { dayIndex: 4, startTime: '18:00', endTime: '19:30', classType: 'Gi', level: 'all', coach: 'Pavol K.', location: 'BA' },
  { dayIndex: 4, startTime: '19:30', endTime: '20:30', classType: 'Open Mat', level: 'all', coach: '—', location: 'BA' },
  { dayIndex: 6, startTime: '10:30', endTime: '12:00', classType: 'Open Mat', level: 'all', coach: '—', location: 'BA' },
]

export const recurringEvents: RecurringSeed[] = [
  {
    // Saturday
    dayIndex: 5,
    time: '10:00',
    title: { sk: 'Open Mat — Košice', en: 'Open Mat — Košice', uk: 'Open Mat — Кошице' },
    place: { sk: 'Košice', en: 'Košice', uk: 'Кошице' },
  },
  {
    // Sunday
    dayIndex: 6,
    time: '10:30',
    title: { sk: 'Open Mat — Bratislava', en: 'Open Mat — Bratislava', uk: 'Open Mat — Братислава' },
    place: { sk: 'Bratislava', en: 'Bratislava', uk: 'Братислава' },
  },
]

export const events: EventSeed[] = [
  {
    slug: 'leg-lock-seminar-2026',
    eventType: 'seminar',
    startDate: '2026-07-12',
    title: {
      sk: 'Leg Lock seminár',
      en: 'Leg Lock Seminar',
      uk: 'Семінар Leg Lock',
    },
    description: {
      sk: 'Celodenný seminár zameraný na nožné páky s hosťujúcim trénerom.',
      en: 'Full-day seminar focused on leg locks with a guest instructor.',
      uk: 'Цілоденний семінар із ножних замків із запрошеним тренером.',
    },
    place: { sk: 'Košice', en: 'Košice', uk: 'Кошице' },
    body: {
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
      uk: [
        'Цілоденний семінар із ножних замків — від базових входів через inside systems до безпечних завершень. Запрошений тренер покаже техніки, на які рідко вистачає часу на звичайних тренуваннях.',
        'Програма включає теорію, технічні блоки та вільне тренування. Візьми кімоно та No-Gi одяг. Реєстрація через тренера або на рецепції академії.',
        'Підходить для середнього та просунутого рівня. Початківці можуть спостерігати та долучатися до вступних блоків.',
      ],
    },
  },
  {
    slug: 'zr-open-2026',
    eventType: 'tournament',
    startDate: '2026-08-24',
    title: { sk: 'ZR Open 2026', en: 'ZR Open 2026', uk: 'ZR Open 2026' },
    description: {
      sk: 'Domáci turnaj Gi & No-Gi pre všetky úrovne a vekové kategórie.',
      en: 'Home Gi & No-Gi tournament for all levels and age groups.',
      uk: 'Домашній турнір Gi та No-Gi для всіх рівнів і вікових груп.',
    },
    place: { sk: 'Bratislava', en: 'Bratislava', uk: 'Братислава' },
    body: {
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
      uk: [
        'ZR Open — домашній турнір для всієї спільноти: Gi та No-Gi, дорослі й діти. Категорії поділені за поясом, віком і вагою для чесних і безпечних поєдинків.',
        'Реєстрація відкривається за 6 тижнів до події. Вхід для глядачів безкоштовний. На місці буде перекус, зона розминки та підтримка для спортсmenів.',
        'Чудова можливість перевірити техніку поза академією. Якщо це твій перший турнір — поговори з тренером, ми підготуємо до правил і психологічної сторони.',
      ],
    },
  },
  {
    slug: 'obrana-proti-utoku',
    eventType: 'workshop',
    startDate: '2026-09-05',
    title: {
      sk: 'Obrana proti útoku',
      en: 'Self-defense basics',
      uk: 'Основи самозахисту',
    },
    description: {
      sk: 'Praktický workshop sebaobrany pre začiatočníkov aj verejnosť.',
      en: 'Hands-on self-defense workshop for beginners and the public.',
      uk: 'Практичний воркшоп із самозахисту для початківців і всіх охочих.',
    },
    place: { sk: 'Košice', en: 'Košice', uk: 'Кошице' },
    body: {
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
      uk: [
        'Практичний воркшоп із самозахисту на принципах BJJ — контроль дистанції, перекати, виходи з захватів і безпечне завершення ситуації.',
        'Попередній досвід не потрібен. Відкрито для всіх; одягай зручний спортивний одяг.',
        'Тривалість 3 години. Наприкінці — запитання та демонстрації ситуацій, які учасники питають найчастіше.',
      ],
    },
  },
  {
    slug: 'jesenny-bjj-kemp',
    eventType: 'camp',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    title: {
      sk: 'Jesenný BJJ kemp',
      en: 'Autumn BJJ camp',
      uk: 'Осінній BJJ kemp',
    },
    description: {
      sk: 'Víkendový kemp s trénermi oboch akadémií v horskom prostredí.',
      en: 'Weekend camp with coaches from both academies in the mountains.',
      uk: 'Вікенд-кемп із тренерами обох академій у горах.',
    },
    place: { sk: 'Vysoké Tatry', en: 'High Tatras', uk: 'Високі Татри' },
    body: {
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
      uk: [
        'Вікенд-кемп із тренерами з Кошиць і Братислави в горах. Ранок — техніка, день — спаринг, вечір — спільна програма.',
        'Проживання в будинку на території. Харчування включене. Місць обмежено — реєструйся заздалегідь через тренера.',
        'Для членів ZR Team і гостей партнерських клубів. Ідеальна можливість для інтенсивного прогресу поза звичайним розкладом.',
      ],
    },
  },
]

export const posts: PostSeed[] = [
  {
    slug: 'povod',
    publishedAt: '2026-06-20T10:00:00.000Z',
    title: { sk: 'Pôvod', en: 'Lineage', uk: 'Походження' },
    excerpt: {
      sk: 'Naša línia siaha k brazílskej škole jiu-jitsu. Techniku a hodnoty odovzdávame ďalej tak, ako boli odovzdané nám.',
      en: 'Our line traces back to the Brazilian school of jiu-jitsu. We pass on technique and values the way they were passed to us.',
      uk: 'Наша лінія сягає бразильської школи джиу-джитсу. Ми передаємо техніку й цінності так, як їх передали нам.',
    },
    body: {
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
      uk: [
        'Zé Radiola Team стоїть на лінії, що формувалася десятиліттями в Бразилії та на Словаччині. Для нас BJJ — це не просто набір технік, а спосіб навчання, тренування і поведінки на татамі.',
        'Кожен тренер у нашій команді пройшов той самий шлях: основи, терпіння, повторення. Ми очікуємо того ж від студентів. Не пропускаємо кроки, бо міцні основи несуть увесь подальший прогрес.',
        'Коли говоримо про походження, маємо на увазі не минуле заради минулого. Маємо на увазі повагу до того, звідки прийшло мистецтво, і відповідальність передати його далі в якості, якій можемо довіряти.',
      ],
    },
  },
  {
    slug: 'respekt',
    publishedAt: '2026-06-10T10:00:00.000Z',
    title: { sk: 'Rešpekt', en: 'Respect', uk: 'Повага' },
    excerpt: {
      sk: 'Na mate sme si rovní. Pomáhame si rásť — bez ega, s pokorou a trpezlivosťou.',
      en: 'On the mat we are equals. We help each other grow — no ego, with humility and patience.',
      uk: 'На татамі ми рівні. Ми допомагаємо одне одному зростати — без его, з повагою та терпінням.',
    },
    body: {
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
      uk: [
        'Повага в ZR Team починається вже при вході в академію. Ти вітаєш тренера, партнера й новачка на першому тренуванні. Саме такі деталі створюють простір, де не страшно вчитися.',
        'На татамі немає «слабшого» чи «сильнішого» — є лише партнер, з яким ти відпрацьовуєш техніку. Якщо щось не виходить, сповільнюємось. Якщо занадто жорстко — коригуємо темп. Мета не перемогти одноклубника, а зрозуміти гру.',
        'Повага проявляється й поза тренуванням: у спілкуванні, пунктуальності та тому, як ми представляємо клуб на змаганнях. Ми команда — і команда поводиться так, до якої хочуть долучитися.',
      ],
    },
  },
  {
    slug: 'disciplina',
    publishedAt: '2026-05-30T10:00:00.000Z',
    title: { sk: 'Disciplína', en: 'Discipline', uk: 'Дисципліна' },
    excerpt: {
      sk: 'Pravidelnosť a poctivá práca sú dôležitejšie než talent. Pokrok prichádza opakovaním.',
      en: 'Consistency and honest work matter more than talent. Progress comes from repetition.',
      uk: 'Регулярність і чесна праця важливіші за талант. Прогрес приходить із повторенням.',
    },
    body: {
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
      uk: [
        'Дисципліна в BJJ — це не суворий режим будь-якою ціною. Це приходити на татамі в дні, коли не хочеться, бо саме такі дні роблять різницю.',
        'На тренуванні ми зосереджуємось на якості повторень. Краще десять чистих повторів, ніж сто втомлених спроб. Тренер допоможе з темпом, але відповідальність за присутність і увагу — твоя.',
        'Найбільший прогрес не видно після одного заняття. Його видно після місяця регулярності, року наполегливості. Дисципліна тиха — але на татамі її одразу помічаєш.',
      ],
    },
  },
  {
    slug: 'komunita',
    publishedAt: '2026-05-20T10:00:00.000Z',
    title: { sk: 'Komunita', en: 'Community', uk: 'Спільнота' },
    excerpt: {
      sk: 'Dve akadémie, jeden tím. Trénujeme spolu, súťažíme spolu a oslavujeme spolu.',
      en: 'Two academies, one team. We train together, compete together and celebrate together.',
      uk: 'Дві академії, одна команда. Ми тренуємось, змагаємось і святкуємо разом.',
    },
    body: {
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
      uk: [
        'Кошице та Братислава — два міста, але ZR Team — одна родина. Нас об’єднує спільний розклад, змагання, семінари та open mat, де ми зустрічаємось незалежно від академії.',
        'Спільнота будується й поза татамі: спільні поїздки на турніри, допомога новачкам, обмін досвідом між поясами. Коли хтось із команди змагається, ми там разом із ним.',
        'Якщо шукаєш місце, де знають твоє ім’я і дбають про твій прогрес — ти в правильному місці. Перший крок простий: прийди на пробне тренування і представся.',
      ],
    },
  },
  {
    slug: 'vitaj-v-zr-team',
    publishedAt: '2026-06-15T10:00:00.000Z',
    title: {
      sk: 'Vitaj v ZR Team',
      en: 'Welcome to ZR Team',
      uk: 'Ласкаво просимо до ZR Team',
    },
    excerpt: {
      sk: 'Krátky úvod do komunity, hodnôt a toho, čo ťa čaká na prvom tréningu.',
      en: 'A short introduction to the community, our values and what to expect at your first class.',
      uk: 'Коротке знайомство зі спільнотою, цінностями та тим, чого очікувати на першому тренуванні.',
    },
    body: {
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
      uk: [
        'Перше тренування завжди безкоштовне. Приходь у зручному одязі — кімоно не обов’язкове. Тренер зустріне тебе, покаже основи та підбере групу за рівнем.',
        'На татамі діє одне правило: повага. До себе, до партнерів і до тренерів. Якщо є питання — питай, спільнота поруч.',
        'Після тренування можеш зайти на рецепцію, домовитись про наступне заняття або просто поспілкуватися з командою. BJJ — індивідуальний спорт, але в ZR Team ти не сам.',
      ],
    },
  },
  {
    slug: 'open-mat-tipy',
    publishedAt: '2026-05-28T10:00:00.000Z',
    title: {
      sk: 'Ako využiť open mat',
      en: 'How to make the most of open mat',
      uk: 'Як використати open mat',
    },
    excerpt: {
      sk: 'Open mat nie je len voľný sparing — je to priestor na opakovanie, otázky a experimentovanie.',
      en: 'Open mat is not just free sparring — it is space to drill, ask questions and experiment.',
      uk: 'Open mat — це не лише вільний спаринг, а простір для відпрацювання, запитань і експериментів.',
    },
    body: {
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
      uk: [
        'Перед open mat обери одну техніку з тижня і відпрацюй її з партнером. Після спарингу запитай тренера про деталі — саме на open mat є час для того, чого не встигає звичайне заняття.',
        'Не забувай про воду і пам’ятай: open mat для всіх рівнів. Якщо ти початківець — скажи партнеру, знайдете комфортний темп.',
        'Open mat — також місце, де знайомишся з усією командою з обох академій. Скористайся можливістю покататися з тими, з ким зазвичай не тренуєшся — це розширить твою гру.',
      ],
    },
  },
]

export const settings = {
  title: 'Zé Radiola Team',
  description: {
    sk: 'Brazílske jiu-jitsu v Košiciach a Bratislave. Dve akadémie, jeden tím.',
    en: 'Brazilian Jiu-Jitsu in Košice and Bratislava. Two academies, one team.',
    uk: 'Бразильське джиу-джитсу в Кошице та Братиславі. Дві академії, одна команда.',
  } satisfies L<string>,
  hero: {
    kicker: {
      sk: 'KOŠICE · BRATISLAVA',
      en: 'KOŠICE · BRATISLAVA',
      uk: 'KOŠICE · BRATISLAVA',
    } satisfies L<string>,
    title: {
      sk: 'Brazílske jiu-jitsu v Košiciach a Bratislave',
      en: 'Brazilian Jiu-Jitsu in Košice & Bratislava',
      uk: 'Бразильське джиу-джитсу в Кошице та Братиславі',
    } satisfies L<string>,
    subtitle: {
      sk: 'Tréningy pre každú úroveň, vedené skúsenými trénermi. Dve akadémie, jeden tím — pridaj sa k ZRTeam.',
      en: 'Classes for every level, led by experienced coaches. Two academies, one team — join ZRTeam.',
      uk: 'Заняття для будь-якого рівня під керівництвом досвідчених тренерів. Дві академії, одна команда — приєднуйся до ZRTeam.',
    } satisfies L<string>,
    stats: [
      {
        value: '2',
        label: { sk: 'AKADÉMIE', en: 'ACADEMIES', uk: 'АКАДЕМІЇ' } satisfies L<string>,
      },
      {
        value: '20+',
        label: {
          sk: 'TRÉNINGOV / TÝŽDEŇ',
          en: 'CLASSES / WEEK',
          uk: 'ЗАНЯТЬ / ТИЖДЕНЬ',
        } satisfies L<string>,
      },
      {
        value: 'IBJJF',
        label: { sk: 'PÔVOD', en: 'LINEAGE', uk: 'ПОХОДЖЕННЯ' } satisfies L<string>,
      },
    ],
  },
}

export const wayItems: { title: L<string>; body: L<string> }[] = [
  {
    title: { sk: 'Pôvod', en: 'Lineage', uk: 'Походження' },
    body: {
      sk: 'Naša línia siaha k brazílskej škole jiu-jitsu. Techniku a hodnoty odovzdávame ďalej tak, ako boli odovzdané nám.',
      en: 'Our line traces back to the Brazilian school of jiu-jitsu. We pass on technique and values the way they were passed to us.',
      uk: 'Наша лінія сягає бразильської школи джиу-джитсу. Ми передаємо техніку й цінності так, як їх передали нам.',
    },
  },
  {
    title: { sk: 'Rešpekt', en: 'Respect', uk: 'Повага' },
    body: {
      sk: 'Na mate sme si rovní. Pomáhame si rásť — bez ega, s pokorou a trpezlivosťou.',
      en: 'On the mat we are equals. We help each other grow — no ego, with humility and patience.',
      uk: 'На татамі ми рівні. Ми допомагаємо одне одному зростати — без его, з повагою та терпінням.',
    },
  },
  {
    title: { sk: 'Disciplína', en: 'Discipline', uk: 'Дисципліна' },
    body: {
      sk: 'Pravidelnosť a poctivá práca sú dôležitejšie než talent. Pokrok prichádza opakovaním.',
      en: 'Consistency and honest work matter more than talent. Progress comes from repetition.',
      uk: 'Регулярність і чесна праця важливіші за талант. Прогрес приходить із повторенням.',
    },
  },
  {
    title: { sk: 'Komunita', en: 'Community', uk: 'Спільнота' },
    body: {
      sk: 'Dve akadémie, jeden tím. Trénujeme spolu, súťažíme spolu a oslavujeme spolu.',
      en: 'Two academies, one team. We train together, compete together and celebrate together.',
      uk: 'Дві академії, одна команда. Ми тренуємось, змагаємось і святкуємо разом.',
    },
  },
]
