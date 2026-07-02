export type Lang = 'SK' | 'EN' | 'UA';

export interface Translation {
	navSchedule: string;
	navEvents: string;
	navAbout: string;
	navSponsors: string;
	ctaTrial: string;
	ctaSchedule: string;
	heroTitle: string;
	heroSub: string;
	statAcademies: string;
	statClasses: string;
	statLineage: string;
	ctaBandTitle: string;
	ctaBandSub: string;
	schedKicker: string;
	schedTitle: string;
	restLabel: string;
	days: string[];
	daysShort: string[];
	levels: Record<string, string>;
	filterAll: string;
	eventsKicker: string;
	eventsTitle: string;
	recurringTitle: string;
	recurringSub: string;
	eventsLead: string;
	aboutKicker: string;
	aboutTitle: string;
	aboutBody1: string;
	aboutClickHint: string;
	phoneLabel: string;
	sponsorsKicker: string;
	sponsorsTitle: string;
	sponsorsSub: string;
	becomePartnerT: string;
	becomePartnerB: string;
	becomePartner: string;
	partnersTeaserSub: string;
	partnerTitle: string;
	partnerSub: string;
	fCompany: string;
	fContact: string;
	partnerSubmit: string;
	partnerDoneT: string;
	partnerDoneB: string;
	wayKicker: string;
	wayTitle: string;
	wayIntro: string;
	wayItems: { t: string; b: string }[];
	aboutTeaserCta: string;
	footerRights: string;
	typeDesc: Record<string, string>;
	showMore: string;
	mClassDay: string;
	mClassTime: string;
	mClassLevel: string;
	mClassCoach: string;
	mClassLoc: string;
	mClassCta: string;
	trialTitle: string;
	trialSub: string;
	fName: string;
	fEmail: string;
	fPhone: string;
	fMsg: string;
	fSubmit: string;
	trialDoneT: string;
	trialDoneB: string;
	mLocAmen: string;
	closeLabel: string;
	locLong: Record<string, string>;
	amen: Record<string, string[]>;
}

export const translations: Record<Lang, Translation> = {
	SK: {
		navSchedule: 'Rozvrh',
		navEvents: 'Udalosti',
		navAbout: 'O nás',
		navSponsors: 'Partneri',
		ctaTrial: 'Skúšobný tréning',
		ctaSchedule: 'Pozri rozvrh',
		heroTitle: 'Brazílske jiu-jitsu v Košiciach a Bratislave',
		heroSub:
			'Tréningy pre každú úroveň, vedené skúsenými trénermi. Dve akadémie, jeden tím — pridaj sa k ZRTeam.',
		statAcademies: 'AKADÉMIE',
		statClasses: 'TRÉNINGOV / TÝŽDEŇ',
		statLineage: 'PÔVOD',
		ctaBandTitle: 'Prvý tréning je vždy zadarmo',
		ctaBandSub: 'Príď v kimone alebo len v tričku a šortkách. O zvyšok sa postaráme.',
		schedKicker: 'TÝŽDENNÝ ROZVRH',
		schedTitle: 'Rozvrh tréningov',
		restLabel: 'Voľný deň',
		days: ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'],
		daysShort: ['PON', 'UTO', 'STR', 'ŠTV', 'PIA', 'SOB', 'NED'],
		levels: { all: 'Všetky úrovne', beg: 'Začiatočníci', adv: 'Pokročilí', kids: 'Deti' },
		filterAll: 'Všetko',
		eventsKicker: 'NADCHÁDZAJÚCE',
		eventsTitle: 'Udalosti',
		recurringTitle: 'Pravidelné',
		recurringSub: 'Opakujúce sa tréningy každý týždeň.',
		eventsLead:
			'Semináre, turnaje a open maty — spoločné pre obe akadémie. Sleduj, čo sa chystá.',
		aboutKicker: 'O KLUBE',
		aboutTitle: 'Jeden tím, dve akadémie',
		aboutBody1:
			'Zé Radiola Team je komunita bojovníkov BJJ s pobočkami v Košiciach a Bratislave. Trénujeme s rešpektom, disciplínou a radosťou z pohybu.',
		aboutClickHint: 'Klikni na akadémiu pre viac informácií →',
		phoneLabel: 'TELEFÓN',
		sponsorsKicker: 'ĎAKUJEME',
		sponsorsTitle: 'Naši partneri',
		sponsorsSub: 'Klub podporujú partneri, ktorým záleží na komunite a športe.',
		becomePartnerT: 'Staňte sa partnerom',
		becomePartnerB:
			'Máte záujem podporiť klub a byť videní v našej komunite? Napíšte nám.',
		becomePartner: 'Stať sa partnerom',
		partnersTeaserSub: 'Komunitu ZRTeam podporujú partneri zdieľajúci naše hodnoty.',
		partnerTitle: 'Stať sa partnerom',
		partnerSub: 'Nechajte nám kontakt a ozveme sa vám s možnosťami spolupráce.',
		fCompany: 'Firma / značka',
		fContact: 'Kontaktná osoba',
		partnerSubmit: 'Odoslať správu',
		partnerDoneT: 'Ďakujeme!',
		partnerDoneB: 'Vaša správa bola odoslaná. Čoskoro sa vám ozveme.',
		wayKicker: 'ZR WAY',
		wayTitle: 'Čo je Zé Radiola',
		wayIntro:
			'„Zé Radiola" je prezývka nášho zakladateľa a línie, z ktorej vychádzame. Nie je to len názov klubu — je to spôsob, akým pristupujeme k tréningu aj k sebe navzájom.',
		wayItems: [
			{
				t: 'Pôvod',
				b: 'Naša línia siaha k brazílskej škole jiu-jitsu. Techniku a hodnoty odovzdávame ďalej tak, ako boli odovzdané nám.',
			},
			{
				t: 'Rešpekt',
				b: 'Na mate sme si rovní. Pomáhame si rásť — bez ega, s pokorou a trpezlivosťou.',
			},
			{
				t: 'Disciplína',
				b: 'Pravidelnosť a poctivá práca sú dôležitejšie než talent. Pokrok prichádza opakovaním.',
			},
			{
				t: 'Komunita',
				b: 'Dve akadémie, jeden tím. Trénujeme spolu, súťažíme spolu a oslavujeme spolu.',
			},
		],
		aboutTeaserCta: 'Spoznaj ZR Way',
		footerRights: 'Všetky práva vyhradené',
		typeDesc: {
			Gi: 'Tréning v kimone (gi) — základ brazílskeho jiu-jitsu. Úchopy, kontrola a submisie s využitím odevu.',
			'No-Gi':
				'Tréning bez kimona — rýchlejšie tempo, dôraz na kontrolu tela, wrestling a leg locky.',
			Kids: 'Hravý a bezpečný tréning pre deti — koordinácia, disciplína a sebadôvera.',
			'Open Mat':
				'Voľný tréning bez vedenia trénera. Priestor na sparing, opakovanie techník a otázky.',
		},
		showMore: 'Všetky udalosti',
		mClassDay: 'DEŇ',
		mClassTime: 'ČAS',
		mClassLevel: 'ÚROVEŇ',
		mClassCoach: 'TRÉNER',
		mClassLoc: 'AKADÉMIA',
		mClassCta: 'Prihlásiť sa na tréning',
		trialTitle: 'Skúšobný tréning zadarmo',
		trialSub: 'Nechaj nám kontakt a ozveme sa ti s termínom prvého tréningu.',
		fName: 'Meno a priezvisko',
		fEmail: 'E-mail',
		fPhone: 'Telefón',
		fMsg: 'Správa (nepovinné)',
		fSubmit: 'Odoslať prihlášku',
		trialDoneT: 'Ďakujeme!',
		trialDoneB: 'Tvoja prihláška bola odoslaná. Ozveme sa ti čo najskôr.',
		mLocAmen: 'VYBAVENIE',
		closeLabel: 'Zavrieť',
		locLong: {
			KE: 'Naša hlavná akadémia v Košiciach s priestrannou matovou plochou, šatňami so sprchami a parkovaním pri hale. Tréningy prebiehajú počas celého týždňa.',
			BA: 'Bratislavská pobočka v modernom Fight Centre. Zdieľaná komunita, tie isté hodnoty, kompletný rozvrh Gi, No-Gi aj detských tréningov.',
		},
		amen: {
			KE: ['Matová plocha 120 m²', 'Šatne + sprchy', 'Parkovanie zdarma', 'Detská zóna'],
			BA: ['Matová plocha 90 m²', 'Šatne + sprchy', 'Posilňovňa', 'MHD pri vchode'],
		},
	},
	EN: {
		navSchedule: 'Schedule',
		navEvents: 'Events',
		navAbout: 'About',
		navSponsors: 'Partners',
		ctaTrial: 'Free trial',
		ctaSchedule: 'View schedule',
		heroTitle: 'Brazilian Jiu-Jitsu in Košice & Bratislava',
		heroSub:
			'Classes for every level, led by experienced coaches. Two academies, one team — join ZRTeam.',
		statAcademies: 'ACADEMIES',
		statClasses: 'CLASSES / WEEK',
		statLineage: 'LINEAGE',
		ctaBandTitle: 'Your first class is always free',
		ctaBandSub: 'Come in a gi or just a t-shirt and shorts. We\u2019ll take care of the rest.',
		schedKicker: 'WEEKLY SCHEDULE',
		schedTitle: 'Class schedule',
		restLabel: 'Rest day',
		days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		daysShort: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
		levels: { all: 'All levels', beg: 'Beginners', adv: 'Advanced', kids: 'Kids' },
		filterAll: 'All',
		eventsKicker: 'UPCOMING',
		eventsTitle: 'Events',
		recurringTitle: 'Recurring',
		recurringSub: 'Repeating sessions every week.',
		eventsLead:
			'Seminars, tournaments and open mats — shared across both academies. See what\u2019s coming up.',
		aboutKicker: 'THE CLUB',
		aboutTitle: 'One team, two academies',
		aboutBody1:
			'Zé Radiola Team is a BJJ community with branches in Košice and Bratislava. We train with respect, discipline and the joy of movement.',
		aboutClickHint: 'Click an academy for more details →',
		phoneLabel: 'PHONE',
		sponsorsKicker: 'THANK YOU',
		sponsorsTitle: 'Our partners',
		sponsorsSub: 'Our club is supported by partners who care about community and sport.',
		becomePartnerT: 'Become a partner',
		becomePartnerB:
			'Interested in supporting the club and being seen across our community? Get in touch.',
		becomePartner: 'Become a partner',
		partnersTeaserSub: 'The ZRTeam community is backed by partners who share our values.',
		partnerTitle: 'Become a partner',
		partnerSub: 'Leave your details and we will reach out with cooperation options.',
		fCompany: 'Company / brand',
		fContact: 'Contact person',
		partnerSubmit: 'Send message',
		partnerDoneT: 'Thank you!',
		partnerDoneB: 'Your message has been sent. We will be in touch soon.',
		wayKicker: 'ZR WAY',
		wayTitle: 'What Zé Radiola means',
		wayIntro:
			'\u201cZé Radiola\u201d is the nickname of our founder and the lineage we come from. It is not just a club name — it is how we approach training and one another.',
		wayItems: [
			{
				t: 'Lineage',
				b: 'Our line traces back to the Brazilian school of jiu-jitsu. We pass on technique and values the way they were passed to us.',
			},
			{
				t: 'Respect',
				b: 'On the mat we are equals. We help each other grow — no ego, with humility and patience.',
			},
			{
				t: 'Discipline',
				b: 'Consistency and honest work matter more than talent. Progress comes from repetition.',
			},
			{
				t: 'Community',
				b: 'Two academies, one team. We train together, compete together and celebrate together.',
			},
		],
		aboutTeaserCta: 'Discover the ZR Way',
		footerRights: 'All rights reserved',
		typeDesc: {
			Gi: 'Training in the kimono (gi) — the foundation of Brazilian Jiu-Jitsu. Grips, control and submissions using the uniform.',
			'No-Gi':
				'Training without the kimono — faster pace, emphasis on body control, wrestling and leg locks.',
			Kids: 'Playful and safe training for kids — coordination, discipline and confidence.',
			'Open Mat':
				'Free training without an instructor. Space to spar, drill techniques and ask questions.',
		},
		showMore: 'All events',
		mClassDay: 'DAY',
		mClassTime: 'TIME',
		mClassLevel: 'LEVEL',
		mClassCoach: 'COACH',
		mClassLoc: 'ACADEMY',
		mClassCta: 'Sign up for this class',
		trialTitle: 'Free trial class',
		trialSub: 'Leave your details and we will get back to you with a date for your first session.',
		fName: 'Full name',
		fEmail: 'Email',
		fPhone: 'Phone',
		fMsg: 'Message (optional)',
		fSubmit: 'Send request',
		trialDoneT: 'Thank you!',
		trialDoneB: 'Your request has been sent. We will be in touch shortly.',
		mLocAmen: 'FACILITIES',
		closeLabel: 'Close',
		locLong: {
			KE: 'Our main academy in Košice with a spacious mat area, changing rooms with showers and parking by the hall. Classes run throughout the week.',
			BA: 'The Bratislava branch in a modern Fight Centrum. Shared community, the same values, a full schedule of Gi, No-Gi and kids classes.',
		},
		amen: {
			KE: ['120 m² mat area', 'Changing rooms + showers', 'Free parking', 'Kids zone'],
			BA: ['90 m² mat area', 'Changing rooms + showers', 'Gym', 'Public transport at door'],
		},
	},
	UA: {
		navSchedule: 'Розклад',
		navEvents: 'Події',
		navAbout: 'Про нас',
		navSponsors: 'Партнери',
		ctaTrial: 'Пробне заняття',
		ctaSchedule: 'Розклад',
		heroTitle: 'Бразильське джиу-джитсу в Кошице та Братиславі',
		heroSub:
			'Заняття для будь-якого рівня під керівництвом досвідчених тренерів. Дві академії, одна команда — приєднуйся до ZRTeam.',
		statAcademies: 'АКАДЕМІЇ',
		statClasses: 'ЗАНЯТЬ / ТИЖДЕНЬ',
		statLineage: 'ПОХОДЖЕННЯ',
		ctaBandTitle: 'Перше тренування завжди безкоштовне',
		ctaBandSub: 'Приходь у кімоно або просто у футболці та шортах. Решту ми беремо на себе.',
		schedKicker: 'ТИЖНЕВИЙ РОЗКЛАД',
		schedTitle: 'Розклад занять',
		restLabel: 'Вихідний',
		days: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'],
		daysShort: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
		levels: { all: 'Усі рівні', beg: 'Початківці', adv: 'Просунуті', kids: 'Діти' },
		filterAll: 'Усі',
		eventsKicker: 'НАЙБЛИЖЧІ',
		eventsTitle: 'Події',
		recurringTitle: 'Регулярні',
		recurringSub: 'Повторювані тренування щотижня.',
		eventsLead:
			'Семінари, турніри та open mat — спільні для обох академій. Дивись, що попереду.',
		aboutKicker: 'ПРО КЛУБ',
		aboutTitle: 'Одна команда, дві академії',
		aboutBody1:
			'Zé Radiola Team — це спільнота бійців BJJ із філіями в Кошице та Братиславі. Ми тренуємось із повагою, дисципліною та радістю руху.',
		aboutClickHint: 'Натисни на академію для деталей →',
		phoneLabel: 'ТЕЛЕФОН',
		sponsorsKicker: 'ДЯКУЄМО',
		sponsorsTitle: 'Наші партнери',
		sponsorsSub: 'Клуб підтримують партнери, яким небайдужі спільнота і спорт.',
		becomePartnerT: 'Станьте партнером',
		becomePartnerB:
			'Хочете підтримати клуб і бути поміченими в нашій спільноті? Напишіть нам.',
		becomePartner: 'Стати партнером',
		partnersTeaserSub: 'Спільноту ZRTeam підтримують партнери, які поділяють наші цінності.',
		partnerTitle: 'Стати партнером',
		partnerSub: 'Залиште контакти, і ми зв\u2019яжемося з вами щодо варіантів співпраці.',
		fCompany: 'Компанія / бренд',
		fContact: 'Контактна особа',
		partnerSubmit: 'Надіслати повідомлення',
		partnerDoneT: 'Дякуємо!',
		partnerDoneB: 'Ваше повідомлення надіслано. Ми скоро зв\u2019яжемося з вами.',
		wayKicker: 'ZR WAY',
		wayTitle: 'Що означає Zé Radiola',
		wayIntro:
			'„Zé Radiola" — це прізвисько нашого засновника та лінії, з якої ми походимо. Це не просто назва клубу — це те, як ми ставимося до тренувань і одне до одного.',
		wayItems: [
			{
				t: 'Походження',
				b: 'Наша лінія сягає бразильської школи джиу-джитсу. Ми передаємо техніку й цінності так, як їх передали нам.',
			},
			{
				t: 'Повага',
				b: 'На татамі ми рівні. Ми допомагаємо одне одному зростати — без его, з повагою та терпінням.',
			},
			{
				t: 'Дисципліна',
				b: 'Регулярність і чесна праця важливіші за талант. Прогрес приходить із повторенням.',
			},
			{
				t: 'Спільнота',
				b: 'Дві академії, одна команда. Ми тренуємось, змагаємось і святкуємо разом.',
			},
		],
		aboutTeaserCta: 'Дізнатися про ZR Way',
		footerRights: 'Усі права захищено',
		typeDesc: {
			Gi: 'Тренування в кімоно (gi) — основа бразильського джиу-джитсу. Захвати, контроль і сабміти з використанням форми.',
			'No-Gi':
				'Тренування без кімоно — швидший темп, акцент на контролі тіла, боротьбі та ножних замках.',
			Kids: 'Ігрове та безпечне тренування для дітей — координація, дисципліна та впевненість.',
			'Open Mat':
				'Вільне тренування без тренера. Простір для спарингу, відпрацювання технік і запитань.',
		},
		showMore: 'Усі події',
		mClassDay: 'ДЕНЬ',
		mClassTime: 'ЧАС',
		mClassLevel: 'РІВЕНЬ',
		mClassCoach: 'ТРЕНЕР',
		mClassLoc: 'АКАДЕМІЯ',
		mClassCta: 'Записатися на заняття',
		trialTitle: 'Безкоштовне пробне заняття',
		trialSub: 'Залиш свої контакти, і ми зв\u2019яжемося з тобою щодо дати першого тренування.',
		fName: 'Ім\u2019я та прізвище',
		fEmail: 'Email',
		fPhone: 'Телефон',
		fMsg: 'Повідомлення (необов\u2019язково)',
		fSubmit: 'Надіслати заявку',
		trialDoneT: 'Дякуємо!',
		trialDoneB: 'Твою заявку надіслано. Ми скоро зв\u2019яжемося з тобою.',
		mLocAmen: 'ОБЛАДНАННЯ',
		closeLabel: 'Закрити',
		locLong: {
			KE: 'Наша головна академія в Кошице з просторим татамі, роздягальнями з душем і парковкою біля зали. Тренування проходять протягом усього тижня.',
			BA: 'Філія в Братиславі в сучасному Fight Centrum. Спільна громада, ті самі цінності, повний розклад Gi, No-Gi та дитячих тренувань.',
		},
		amen: {
			KE: ['Татамі 120 м²', 'Роздягальні + душ', 'Безкоштовна парковка', 'Дитяча зона'],
			BA: ['Татамі 90 m²', 'Роздягальні + душ', 'Тренажерний зал', 'Транспорт біля входу'],
		},
	},
};

export const langs: Lang[] = ['SK', 'EN', 'UA'];

export const defaultLang: Lang = 'SK';

export function getLocationInfo(lang: Lang) {
	const t = translations[lang];
	const info = {
		SK: [
			{
				id: 'KE' as const,
				city: 'KOŠICE',
				badge: 'HLAVNÁ',
				address: 'Športová hala, Trieda SNP 48, Košice',
				phone: '+421 900 111 222',
				email: 'kosice@zrteam.sk',
			},
			{
				id: 'BA' as const,
				city: 'BRATISLAVA',
				badge: 'POBOČKA',
				address: 'Fight Centrum, Račianska 12, Bratislava',
				phone: '+421 900 333 444',
				email: 'bratislava@zrteam.sk',
			},
		],
		EN: [
			{
				id: 'KE' as const,
				city: 'KOŠICE',
				badge: 'MAIN',
				address: 'Sports Hall, Trieda SNP 48, Košice',
				phone: '+421 900 111 222',
				email: 'kosice@zrteam.sk',
			},
			{
				id: 'BA' as const,
				city: 'BRATISLAVA',
				badge: 'BRANCH',
				address: 'Fight Centrum, Račianska 12, Bratislava',
				phone: '+421 900 333 444',
				email: 'bratislava@zrteam.sk',
			},
		],
		UA: [
			{
				id: 'KE' as const,
				city: 'КОШИЦЕ',
				badge: 'ГОЛОВНА',
				address: 'Спортивна зала, Trieda SNP 48, Кошице',
				phone: '+421 900 111 222',
				email: 'kosice@zrteam.sk',
			},
			{
				id: 'BA' as const,
				city: 'БРАТИСЛАВА',
				badge: 'ФІЛІЯ',
				address: 'Fight Centrum, Račianska 12, Братислава',
				phone: '+421 900 333 444',
				email: 'bratislava@zrteam.sk',
			},
		],
	};
	return info[lang].map((lo) => ({ ...lo, phoneLabel: t.phoneLabel }));
}

export const sponsorPlaceholders = Array.from({ length: 8 }, (_, i) => `[ logo ${i + 1} ]`);
