import { useState } from 'react';
import { RSVP_DEADLINE, RSVP_CONTACTS, FORM_ENDPOINT, RSVP_SIGNOFF } from '../content';
import { useInviteEvents } from '../useInviteEvents';
import { Cartouche, Divider, Jaali, Paisley, Rosette } from './Ornaments';
import { PAPER } from '../ornamentTokens';

const FIELD =
  'rounded-lg border border-gold/50 bg-cream/90 px-4 py-3 font-cormorant text-base text-maroon ' +
  'outline-none transition placeholder:text-maroon-light/50 focus:border-gold ' +
  'focus:shadow-[0_0_0_3px_rgba(196,157,104,0.18)]';
const LABEL = 'font-cinzel text-[11px] tracking-widest text-rose';

// The families guests can call to confirm, shown under the form (and on the
// thank-you screen) so there's always a human to reach.
function ContactList() {
  return (
    <div className="relative mx-auto mt-10 w-full">
      <div className="flex justify-center">
        <Divider className="h-4 w-36" />
      </div>
      <p className="mt-5 text-center font-cinzel text-[11px] tracking-[0.25em] text-gold-dark">
        RSVP
      </p>

      {RSVP_SIGNOFF && (
        <div className="mt-5 text-center">
          <p className="font-cormorant text-base text-maroon-light">{RSVP_SIGNOFF.label}</p>
          <p className="font-cormorant text-base text-maroon-light mt-1">{RSVP_SIGNOFF.names}</p>
        </div>
      )}

      {/* Group title over its names. The "GROOM'S SIDE" / "BRIDE'S SIDE" labels
          are no longer printed -- RSVP_CONTACTS still carries them. */}
      <div className="mt-5 flex flex-col gap-5">
        {RSVP_CONTACTS.map((contact) => (
          <div key={contact.group} className="text-center">
            <p className="font-script text-3xl leading-[1.4] text-maroon">{contact.group}</p>
            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
              {contact.people.map((person) =>
                person.phone ? (
                  <a
                    key={person.name}
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="font-cormorant text-base text-maroon-light underline underline-offset-4"
                  >
                    {person.name}
                  </a>
                ) : (
                  <span key={person.name} className="font-cormorant text-base text-maroon-light">
                    {person.name}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// The framed panel both the form and the thank-you note sit in.
function Panel({ children }) {
  return (
    // Tight to the card edge outside the frame, generous inside it: the
    // breathing room belongs between the gold rule and the fields, not between
    // the rule and the screen.
    <section className="relative w-full overflow-hidden px-3 py-12" style={PAPER}>
      <Jaali id="rsvp" />

      <div className="relative mx-auto max-w-[404px] px-9 pb-20 pt-14">
        <Cartouche />

        <Paisley className="absolute left-1.5 top-8 h-9 w-9" />
        <Paisley className="absolute right-1.5 top-8 h-9 w-9" flipX />
        <Paisley className="absolute bottom-8 left-1.5 h-9 w-9" flipY />
        <Paisley className="absolute bottom-8 right-1.5 h-9 w-9" flipX flipY />
        <Rosette className="absolute -left-0.5 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Rosette className="absolute -right-0.5 top-1/2 h-4 w-4 -translate-y-1/2" />

        <div className="relative">{children}</div>
      </div>
    </section>
  );
}

const initialState = {
  fullName: '',
  // Both of these are held as strings. `guests` used to be a number, which made
  // clearing the field with backspace collapse to 0 (`Number('')`), so the box
  // fought the guest as they retyped.
  phone: '',
  guests: '1',
  attending: 'yes',
  events: [],
  message: '',
  website: '', // honeypot -- see the hidden input below
};

// The field holds ten bare digits; the +91 is printed beside it, so there is
// nothing to strip and no prefix for a guest to get wrong.
const PHONE_RE = /^[6-9]\d{9}$/;
const MAX_GUESTS = 10;

const guestsCount = (value) => Number.parseInt(value, 10);

function validate(form) {
  if (!form.fullName.trim()) return 'Please tell us your name.';
  if (!PHONE_RE.test(form.phone)) {
    return 'Please enter a 10-digit mobile number starting with 6, 7, 8 or 9.';
  }
  const guests = guestsCount(form.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    return `Please enter a number of guests between 1 and ${MAX_GUESTS}.`;
  }
  if (form.attending === 'yes' && form.events.length === 0) {
    return 'Please pick at least one event you’ll be joining.';
  }
  return null;
}

export default function RsvpForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});
  // The same list the event cards use, so guests are only offered events they
  // were actually shown.
  const { options } = useInviteEvents();

  const phoneBad = touched.phone && form.phone !== '' && !PHONE_RE.test(form.phone);

  const toggleEvent = (key) => {
    setForm((f) => ({
      ...f,
      events: f.events.includes(key)
        ? f.events.filter((k) => k !== key)
        : [...f.events, key],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const problem = validate(form);
    if (problem) {
      setError(problem);
      setStatus('error');
      return;
    }

    if (!FORM_ENDPOINT) {
      // Fail loudly rather than showing a fake "Thank you" -- a silent success
      // here would mean guests believe they have replied when nothing was
      // recorded anywhere. See apps-script/README.md to wire up the endpoint.
      setError('RSVP is not accepting responses yet. Please contact us directly.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setError('');

    // Send readable event names ("Promise Party") rather than internal keys
    // ("promise") -- these land straight in the sheet and the alert email. The
    // phone goes out dialable, with the country code the field only implied.
    const payload = {
      ...form,
      phone: `+91${form.phone}`,
      guests: guestsCount(form.guests),
      events: form.events.map(
        (key) => options.find((o) => o.key === key)?.label ?? key
      ),
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        // text/plain keeps this a CORS "simple request", so the browser skips
        // the preflight OPTIONS that Apps Script web apps don't answer. The
        // script parses the body as JSON regardless.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result = await res.json();
      if (!result.ok) throw new Error(result.error || 'Rejected by server');

      setStatus('sent');
    } catch (err) {
      console.error('RSVP submission failed:', err);
      setError('We could not record your response. Please try again, or call us.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <Panel>
        <div className="text-center">
          <h2 className="font-cinzel text-xl tracking-widest text-maroon">RSVP</h2>
          <p className="mt-5 font-script text-4xl leading-[1.4] text-rose">Thank you!</p>
          <p className="mt-2 font-cormorant text-base text-maroon-light">
            Your response has been recorded. We can't wait to celebrate with you.
          </p>
        </div>
        <ContactList />
      </Panel>
    );
  }

  return (
    <Panel>
      <div className="text-center">
        <h2 className="font-cinzel text-xl tracking-widest text-maroon">RSVP</h2>
        <p className="mt-2 font-cinzel text-[11px] tracking-widest text-gold-dark">
          PLEASE KINDLY RESPOND BY {RSVP_DEADLINE}
        </p>
        <div className="mt-4 flex justify-center">
          <Divider className="h-4 w-36" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className={LABEL}>FULL NAME</span>
          <input
            required
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            placeholder="Your full name"
            className={FIELD}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className={LABEL}>PHONE NUMBER</span>
            <div
              className={`flex items-center gap-2 ${FIELD} ${
                phoneBad ? 'border-red-700/60' : ''
              } focus-within:border-gold focus-within:shadow-[0_0_0_3px_rgba(196,157,104,0.18)]`}
            >
              <span className="font-cormorant text-base text-maroon-light">+91</span>
              <input
                required
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                aria-invalid={phoneBad || undefined}
                value={form.phone}
                // Digits only, ten at most: the guest cannot enter something the
                // validator would then have to reject.
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))
                }
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                placeholder="98765 43210"
                className="w-full min-w-0 bg-transparent font-cormorant text-base text-maroon outline-none placeholder:text-maroon-light/50"
              />
            </div>
          </label>
          <label className="flex flex-col gap-2">
            <span className={LABEL}>NUMBER OF GUESTS</span>
            <input
              // A text box, not a number spinner: `type="number"` reports an
              // empty string mid-edit, and coercing that to a number turned a
              // backspace into a 0 the guest had to delete again.
              type="text"
              inputMode="numeric"
              value={form.guests}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 2);
                setForm((f) => ({ ...f, guests: digits }));
              }}
              // Empty or out-of-range only settles once they leave the field, so
              // typing is never interrupted.
              onBlur={() =>
                setForm((f) => {
                  const n = guestsCount(f.guests);
                  if (!Number.isInteger(n) || n < 1) return { ...f, guests: '1' };
                  return { ...f, guests: String(Math.min(n, MAX_GUESTS)) };
                })
              }
              className={FIELD}
            />
          </label>
        </div>

        {phoneBad && (
          <p className="-mt-3 font-cormorant text-sm text-red-700">
            Enter 10 digits, starting with 6, 7, 8 or 9.
          </p>
        )}

        <div className="flex flex-col gap-2">
          <span className={LABEL}>WILL YOU BE ATTENDING?</span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, attending: 'yes' }))}
              className={`flex-1 rounded-full px-4 py-3 font-cinzel text-xs tracking-widest transition ${
                form.attending === 'yes'
                  ? 'bg-maroon text-cream shadow-[0_4px_14px_rgba(97,21,34,0.25)]'
                  : 'border border-gold/50 bg-cream/70 text-maroon-light'
              }`}
            >
              Joyfully Yes
            </button>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, attending: 'no' }))}
              className={`flex-1 rounded-full px-4 py-3 font-cinzel text-xs tracking-widest transition ${
                form.attending === 'no'
                  ? 'bg-maroon text-cream shadow-[0_4px_14px_rgba(97,21,34,0.25)]'
                  : 'border border-gold/50 bg-cream/70 text-maroon-light'
              }`}
            >
              Regretfully No
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className={LABEL}>WHICH EVENTS?</span>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const checked = form.events.includes(opt.key);
              return (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => toggleEvent(opt.key)}
                  aria-pressed={checked}
                  className={`rounded-full border px-4 py-2 font-cinzel text-xs tracking-wide transition ${
                    checked
                      ? 'border-maroon bg-maroon/10 text-maroon'
                      : 'border-gold/50 bg-cream/70 text-maroon-light'
                  }`}
                >
                  {checked ? '✓ ' : ''}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex flex-col gap-2">
          <span className={LABEL}>A MESSAGE FOR THE COUPLE</span>
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Your blessings & wishes..."
            rows={4}
            className={FIELD}
          />
        </label>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-1 rounded-full border border-gold/70 bg-maroon px-6 py-4 font-cinzel text-sm tracking-widest text-cream shadow-[0_6px_18px_rgba(97,21,34,0.28)] transition disabled:opacity-60"
        >
          {status === 'sending' ? 'SENDING…' : 'SEND RSVP'}
        </button>

        {/* Honeypot: hidden from guests, irresistible to bots. The server
            silently drops any submission that fills it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {status === 'error' && error && (
          <p role="alert" className="text-center font-cormorant text-sm text-red-700">
            {error}
          </p>
        )}
      </form>

      <ContactList />
    </Panel>
  );
}
