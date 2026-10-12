// ---------------------------------------------------------------------------
// Every piece of copy, every date, and every image on the site is read from
// this one file. To re-purpose this invitation for a different couple/event,
// you should only need to edit the values below.
// ---------------------------------------------------------------------------

// Every image is served from /public -- nothing is hotlinked. The site has no
// runtime dependency on any other deployment. Photos use AVIF with WebP fallback.
function raster(base, width, height) {
  return {
    src: `${base}.webp`,
    webp: `${base}.webp`,
    avif: `${base}.avif`,
    width,
    height,
  };
}

export const IMAGES = {
  // Cover behind the tap-to-open doors: the couple's clasped hands, split down
  // the middle so the doors part at the hands. LandingGate ties a silk ribbon
  // across it and adds the gold sparkles.
  doorCover: raster('/door', 704, 1034),
  heroArch: raster('/hero', 900, 1600),
  // Small icon PNG — no AVIF/WebP variants.
  ganesh: { src: '/ganesh.png', width: 300, height: 263 },

  // Event card backgrounds (Pexels; free for commercial use, no attribution required).
  welcome: raster('/events/promise', 900, 1200),
  bhaat: raster('/events/sunshine', 900, 1200),
  sangeet: raster('/events/jaggo', 900, 1200),
  haldi: raster('/events/haldi', 900, 1200),
  wedding: raster('/events/wedding', 900, 1200),
};

export const COUPLE = {
  partner1: 'Aneesh',
  partner2: 'Sakshi',
  // Bare monogram, no ampersand: it reads as one interlocked mark in the
  // script face, on the seal and in the hero alike.
  initials: 'AS',
  invocation: '|| श्री गणेशाय नमः ||',
  // One sentence, split where it reads best on a 360px phone; Hero renders each
  // entry as its own line.
  tagline: ['With love in our hearts,', 'we begin our forever.'],
  announcement: "WE'RE GETTING MARRIED",
};

// The formal invitation card, under the hero: the Ganesh shloka, the
// invitation itself, and both families named the way the printed card names
// them (S/o, Grand S/o, D/o, Grand D/o). The groom's family is listed first.
export const INVITATION = {
  shloka: [
    'श्री वक्रतुण्ड महाकाय सूर्य कोटि समप्रभा।',
    'निर्विघ्नं कुरु मे देव सर्व-कार्येषु सर्वदा॥',
  ],
  blessing: 'With the blessings of God',
  intro: 'We request the honor of your presence at the',
  occasion: 'Wedding Ceremony',
  groom: {
    name: 'Aneesh',
    parents: 'S/o Smt. Anita Gupta & Shri Suresh Kumar Gupta',
    grandparents: 'Grand S/o Late Smt. Sarbati Devi & Late Shri. Ramniwas Gupta',
  },
  bride: {
    name: 'Sakshi',
    parents: 'D/o Smt. Samta Marodia & Shri Kishan Kumar Marodia',
    grandparents: 'Grand D/o Smt. Savitri Devi & Late Shri Bajrang Lal Marodia',
  },
};

// `iso` drives the live countdown (see src/components/Countdown.jsx) and points
// at the Baarat. Keep the time-of-day on it: a bare "2026-12-10" is parsed as
// UTC midnight by browsers, which would run the countdown 5.5 hours early in IST.
export const WEDDING_DATE = {
  iso: '2026-12-10T17:30:00',
  display: '8th to 10th December, 2026',
  day: 'THURSDAY',
  place: 'HYATT REGENCY, JAIPUR',
};

export const RSVP_DEADLINE = 'NOVEMBER 15TH';

// Every event is at the Hyatt Regency; `venue` names the hall within it.
export const EVENTS = [
  {
    key: 'welcome',
    label: 'Welcome Night',
    title: 'Melodies of Love',
    subtitle: 'Welcome Night',
    date: 'Tuesday, 8th December 2026',
    time: '7:30 PM onwards',
    venue: 'Regency Ballroom',
    image: IMAGES.welcome,
    calendar: {
      start: '2026-12-08T19:30:00+05:30',
      end: '2026-12-08T23:30:00+05:30',
      title: 'Welcome Night — Aneesh & Sakshi',
      location: 'Regency Ballroom, Hyatt Regency, Mansarovar, Jaipur',
    },
  },
  {
    key: 'bhaat',
    label: 'Bhaat Mela',
    title: 'Pink Symphony',
    subtitle: 'Bhaat Mela',
    date: 'Wednesday, 9th December 2026',
    time: '10:30 AM onwards',
    venue: 'Navras Bagh',
    image: IMAGES.bhaat,
    calendar: {
      start: '2026-12-09T10:30:00+05:30',
      end: '2026-12-09T14:00:00+05:30',
      title: 'Bhaat Mela — Aneesh & Sakshi',
      location: 'Navras Bagh, Hyatt Regency, Mansarovar, Jaipur',
    },
  },
  {
    key: 'sangeet',
    label: 'Sangeet',
    title: 'Starlit Serenade',
    subtitle: 'Sangeet',
    note: 'Tilak @ 6:30 PM onwards',
    date: 'Wednesday, 9th December 2026',
    time: 'Sangeet @ 7:30 PM onwards',
    venue: 'Chauras Bagh',
    image: IMAGES.sangeet,
    calendar: {
      start: '2026-12-09T18:30:00+05:30',
      end: '2026-12-09T23:30:00+05:30',
      title: 'Sangeet — Aneesh & Sakshi',
      location: 'Chauras Bagh, Hyatt Regency, Mansarovar, Jaipur',
    },
  },
  {
    key: 'haldi',
    label: 'Haldi',
    title: 'Carnival Fiesta',
    subtitle: 'Haldi',
    date: 'Thursday, 10th December 2026',
    time: '10:30 AM onwards',
    venue: 'Navras Bagh',
    image: IMAGES.haldi,
    calendar: {
      start: '2026-12-10T10:30:00+05:30',
      end: '2026-12-10T14:00:00+05:30',
      title: 'Haldi — Aneesh & Sakshi',
      location: 'Navras Bagh, Hyatt Regency, Mansarovar, Jaipur',
    },
  },
  {
    key: 'wedding',
    label: 'Wedding',
    title: 'Eternal Knot',
    subtitle: 'Wedding Soirée',
    note: 'Baarat @ 5:30 PM onwards',
    date: 'Thursday, 10th December 2026',
    time: 'Reception @ 7:30 PM onwards',
    venue: 'Chauras Bagh',
    image: IMAGES.wedding,
    calendar: {
      start: '2026-12-10T17:30:00+05:30',
      end: '2026-12-11T00:00:00+05:30',
      title: 'Wedding — Aneesh & Sakshi',
      location: 'Chauras Bagh, Hyatt Regency, Mansarovar, Jaipur',
    },
  },
];

// Single source of truth for the venue pin. Both the embed and the
// “Open in Google Maps” link are built from these coordinates.
export const VENUE = {
  name: 'Hyatt Regency, Mansarovar, Jaipur',
  address: 'Hyatt Regency, Mansarovar, Jaipur',
  // TODO: replace the search-based links below with the exact place pin.
  embedUrl: 'https://www.google.com/maps?q=Hyatt+Regency+Jaipur+Mansarovar&output=embed',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Jaipur+Mansarovar',
};

/** Build a Google Calendar deep-link for an event. */
export function googleCalendarUrl(cal) {
  // Floating local times + ctz so Calendar lands on IST correctly.
  const stamp = (iso) => iso.slice(0, 19).replace(/[-:]/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: cal.title,
    dates: `${stamp(cal.start)}/${stamp(cal.end)}`,
    location: cal.location,
    details: cal.title,
    ctz: 'Asia/Kolkata',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Trigger a .ics download. Accepts one event or an array of events. */
export function downloadIcs(calOrList, filename = 'event.ics') {
  const events = Array.isArray(calOrList) ? calOrList : [calOrList];
  const toUtc = (iso) => {
    const d = new Date(iso);
    const p = (n) => String(n).padStart(2, '0');
    return (
      `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}T` +
      `${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`
    );
  };
  const stamp = toUtc(new Date().toISOString());
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AneeshSakshi//Invite//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  events.forEach((cal, i) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:aneesh-sakshi-${cal.title?.replace(/\W+/g, '-').toLowerCase() || i}@invite`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toUtc(cal.start)}`,
      `DTEND:${toUtc(cal.end)}`,
      `SUMMARY:${cal.title}`,
      `LOCATION:${cal.location}`,
      // TODO: add fuller venue street address / geo if supplied
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  const ics = `${lines.join('\r\n')}\r\n`;
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Prefill a WhatsApp share with the invite URL. */
export function shareWhatsApp(message) {
  const text =
    message ||
    `You're invited to celebrate the wedding of Aneesh & Sakshi — 8th to 10th December 2026 at Hyatt Regency, Mansarovar, Jaipur. ${typeof window !== 'undefined' ? window.location.href : ''}`;
  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(href, '_blank', 'noopener,noreferrer');
}

/** Build .ics payload covering visible events for the current invite link. */
export function buildInviteIcsEvents(search) {
  return eventsForInvite(search || (typeof window !== 'undefined' ? window.location.search : ''))
    .filter((e) => e.calendar)
    .map((e) => e.calendar);
}

// Printed above the contacts, in remembrance.
export const RSVP_SIGNOFF = {
  label: 'Always in Our Hearts',
  names: 'Lt. Mahesh Kumar Gupta & Lt. Ramesh Kumar Gupta',
};

// The group title shows above its names; a `phone` renders as a tap-to-call link.
export const RSVP_CONTACTS = [
  {
    group: 'Best Compliments From',
    side: "GROOM'S SIDE",
    people: [
      { name: 'Suresh Gupta', phone: '+91 94340 01339' },
      { name: 'Nikhil Gupta', phone: '+91 70298 56593' },
    ],
  },
];

// Events not everyone is invited to. They are hidden -- both as cards and as
// RSVP choices -- unless the link carries ?invite=all, so a guest is never
// shown an event they cannot attend, and never offered it to RSVP for.
export const FAMILY_ONLY_EVENT_KEYS = [];

// Office links (?invite=office) are for colleagues: they see the wedding
// ceremony alone, and are not asked to RSVP at all -- see INVITE_MODES below.
export const OFFICE_EVENT_KEYS = ['wedding'];

// What each invite kind is allowed to see. `rsvp: false` drops the whole RSVP
// section for that link.
export const INVITE_MODES = {
  all: { events: () => EVENTS, rsvp: true },
  office: {
    events: () => EVENTS.filter((e) => OFFICE_EVENT_KEYS.includes(e.key)),
    rsvp: false,
  },
  default: {
    events: () => EVENTS.filter((e) => !FAMILY_ONLY_EVENT_KEYS.includes(e.key)),
    rsvp: true,
  },
};

// `search` is the query string (`window.location.search`). Anything that is not
// a known invite kind falls back to `default`, including a missing or misspelt
// value, so a broken link never leaks a private event.
export function inviteMode(search) {
  const value = new URLSearchParams(search || '').get('invite');
  return Object.hasOwn(INVITE_MODES, value) && value !== 'default' ? value : 'default';
}

export function eventsForInvite(search) {
  return INVITE_MODES[inviteMode(search)].events();
}

export const rsvpEnabledForInvite = (search) => INVITE_MODES[inviteMode(search)].rsvp;

export const rsvpEventOptions = (search) =>
  eventsForInvite(search).map((e) => ({ key: e.key, label: e.label }));

// Where RSVP submissions go. Paste the Google Apps Script Web App URL here --
// the one ending in /exec. Full setup steps: apps-script/README.md.
//
// Until this is filled in the form refuses to submit and tells guests to get
// in touch directly, rather than showing a "Thank you" for a response that
// was never recorded anywhere.
export const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxZaw1xtphzg_Q5rq0NbdhDd-vDHG_rGda8zaoDCWOsVffZ5rEBP8TiO6LXJv_gR2JU/exec';

