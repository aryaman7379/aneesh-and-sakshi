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
  // Cover behind the tap-to-open doors. LandingGate draws only the wax seal over it.
  doorCover: raster('/door', 900, 1600),
  heroArch: raster('/hero', 900, 1600),
  // Small icon PNG — no AVIF/WebP variants.
  ganesh: { src: '/ganesh.png', width: 300, height: 263 },

  // Event card backgrounds (Pexels; free for commercial use, no attribution required).
  event1: raster('/events/sunshine', 900, 1200),
  event2: raster('/events/haldi', 900, 1200),
  event3: raster('/events/mehendi', 900, 1200),
  event4: raster('/events/wedding', 900, 1200),
};

export const COUPLE = {
  partner1: 'Dollsi',
  partner2: 'Siddharth',
  // Bare monogram, no ampersand: it reads as one interlocked mark in the
  // script face, on the seal and in the hero alike.
  initials: 'DS',
  invocation: '|| श्री गणेशाय नमः ||',
  // One sentence, split where it reads best on a 360px phone; Hero renders each
  // entry as its own line.
  tagline: ['With love in our hearts,', 'we begin our forever.'],
  announcement: "WE'RE GETTING MARRIED",
};

// The cover a guest sees before the doors open. The Ganpati, the invocation
// and the "The beginning of our forever, blessed by God." easel board are all
// painted into IMAGES.doorCover -- change those by replacing the artwork, not
// here. The seal's wordmark is the only live text on the cover -- a tap
// anywhere breaks the seal, so there is no printed prompt.
export const COVER = {
  // Cinzel is an all-caps face that renders lowercase as small caps, so the
  // lowercase "n" comes out short against the full-height PYAAR.
  brand: 'In PYAAR',
};

// The formal invitation card, under the hero: the Ganesh shloka, the
// invitation itself, and both families named the way the printed card names
// them (D/o, GD/o, S/o, GS/o).
export const INVITATION = {
  shloka: [
    'श्री वक्रतुण्ड महाकाय सूर्य कोटि समप्रभा।',
    'निर्विघ्नं कुरु मे देव सर्व-कार्येषु सर्वदा॥',
  ],
  blessing: 'With the blessings of God',
  intro: 'We cordially invite you to the',
  occasion: 'Wedding Ceremony',
  bride: {
    name: 'Dollsi Rastogi',
    parents: 'D/o Mrs. Ragini Rastogi & Mr. Anuj Rastogi',
    grandparents: 'GD/o Late Smt. Urmila Rastogi & Late Shri. Tara Shankar Rastogi',
  },
  groom: {
    name: 'Siddharth Rastogi',
    parents: 'S/o Late Smt. Sudha Rastogi & Late Shri. Aditya Rastogi',
    grandparents: 'GS/o Late Smt. Ram Janki Rastogi & Late Shri. Ghanshyam Das Rastogi',
  },
};

// `iso` drives the live countdown (see src/components/Countdown.jsx). Keep the
// time-of-day on it: a bare "2026-11-26" is parsed as UTC midnight by browsers,
// which would run the countdown 5.5 hours early in IST.
export const WEDDING_DATE = {
  iso: '2026-11-26T21:00:00',
  display: '26th November 2026',
  day: 'THURSDAY',
  place: 'THE GOLDEN CELEBRATIONS',
};

export const RSVP_DEADLINE = 'NOVEMBER 15TH';

export const EVENTS = [
  {
    key: 'haldi',
    label: 'Haldi',
    title: 'Haldi',
    subtitle: 'Turmeric blessings',
    note: 'Dress code: light blue',
    date: 'Tuesday, 24 November 2026',
    time: '12:00 PM',
    venue: 'Our Residence',
    image: IMAGES.event2,
    hideDirections: true,
    calendar: {
      start: '2026-11-24T12:00:00+05:30',
      end: '2026-11-24T15:00:00+05:30',
      title: 'Haldi — Dollsi & Siddharth',
      location: 'Our Residence',
    },
  },
  {
    key: 'mehendi',
    label: 'Mehendi',
    title: 'Mehendi',
    subtitle: 'Henna & celebration',
    date: 'Tuesday, 24 November 2026',
    time: '5:00 PM onwards',
    venue: 'Our Residence',
    image: IMAGES.event3,
    hideDirections: true,
    calendar: {
      start: '2026-11-24T17:00:00+05:30',
      end: '2026-11-24T22:00:00+05:30',
      title: 'Mehendi — Dollsi & Siddharth',
      location: 'Our Residence',
    },
  },
  {
    key: 'hawan',
    label: 'Hawan',
    title: 'Hawan',
    subtitle: 'Sacred fire & blessings',
    date: 'Wednesday, 25 November 2026',
    time: '7:30 PM',
    venue: 'Jugal Kishore Hall, Chowk',
    image: IMAGES.event1,
    // Calendar / ICS only — not shown on the card.
    calendar: {
      start: '2026-11-25T19:30:00+05:30',
      end: '2026-11-25T22:00:00+05:30',
      title: 'Hawan — Dollsi & Siddharth',
      location: 'Jugal Kishore Hall, Chowk',
    },
  },
  {
    key: 'wedding',
    label: 'Wedding',
    title: "DS's Happily Ever After",
    subtitle: 'Together, we begin our forever',
    note: 'Wedding Ceremony',
    date: 'Thursday, 26 November 2026',
    time: '9:00 PM',
    venue: 'The Golden Celebrations Wedding Lawn',
    image: IMAGES.event4,
    calendar: {
      start: '2026-11-26T21:00:00+05:30',
      end: '2026-11-27T01:00:00+05:30',
      title: 'Wedding — Dollsi & Siddharth',
      location: 'The Golden Celebrations Wedding Lawn',
    },
  },
];

// Single source of truth for the venue pin. Both the embed and the
// “Open in Google Maps” link are built from these coordinates.
export const VENUE = {
  name: 'The Golden Celebrations Wedding Lawn',
  address: 'The Golden Celebrations Wedding Lawn',
  lat: 26.870327,
  lng: 80.865654,
  placeId: '0x399bfd7c8d2d6959:0x7b59277418e32eb',
  // Place embed (single pin). Prefer this over maps?q=&output=embed, which
  // Google often refuses to render inside an iframe.
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d80.865654!3d26.870327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd7c8d2d6959%3A0x7b59277418e32eb!2sThe%20Golden%20Celebrations%20Wedding%20Lawn!5e0!3m2!1sen!2sin!4v1791218053351!5m2!1sen!2sin',
  mapsUrl:
    'https://www.google.com/maps/place/The+Golden+Celebrations+Wedding+Lawn/data=!4m2!3m1!1s0x399bfd7c8d2d6959:0x7b59277418e32eb',
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
    'PRODID:-//DollsiSiddharth//Invite//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  events.forEach((cal, i) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:dollsi-siddharth-${cal.title?.replace(/\W+/g, '-').toLowerCase() || i}@invite`,
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
    `You're invited to celebrate Dollsi & Siddharth — 26 November 2026 at The Golden Celebrations Wedding Lawn. ${typeof window !== 'undefined' ? window.location.href : ''}`;
  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(href, '_blank', 'noopener,noreferrer');
}

/** Build .ics payload covering visible events for the current invite link. */
export function buildInviteIcsEvents(search) {
  return eventsForInvite(search || (typeof window !== 'undefined' ? window.location.search : ''))
    .filter((e) => e.calendar)
    .map((e) => e.calendar);
}

// Who guests should reach out to. No phone numbers were supplied -- add a
// `phone` to any entry and RsvpForm will render it as a tap-to-call link.
// Signed off above the contact names.
export const RSVP_SIGNOFF = {
  label: 'Warm Regards',
  names: 'Anuj Rastogi and Ragini Rastogi',
};

// The group title shows above its names; the `side` label is no longer printed.
export const RSVP_CONTACTS = [
  {
    group: 'Celebrating with Joy',
    side: "BRIDE'S SIDE",
    people: [{ name: 'Anuj Rastogi' }, { name: 'Ragini Rastogi' }],
  },
];

// Events not everyone is invited to. They are hidden -- both as cards and as
// RSVP choices -- unless the link carries ?invite=all, so a guest is never
// shown an event they cannot attend, and never offered it to RSVP for.
export const FAMILY_ONLY_EVENT_KEYS = ['haldi', 'mehendi'];

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

