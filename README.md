# Mann & Harjot — Wedding Invitation (React)

A React + Vite recreation of the [live invitation site](https://mann-and-harjot-wedding-invite.vercel.app/),
rebuilt so you can run it, customise it, and host it yourself. It reproduces
the tap-to-open cover, falling petals, illustrated hero, a real scratch-to-reveal
"Save the Date" card, a swipeable wedding events carousel, a working RSVP form,
and a location/map section, all in the same cream/maroon/gold styling.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. `npm run build` produces a static
`dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, your
own server, etc.); `npm run preview` serves that build locally.

## Everything you'll want to edit lives in `src/content.js`

Names, the invocation line, tagline, wedding date, RSVP deadline, the list of
events (title/subtitle/date/time/image for each), the venue name and map
query, and the footer credit are all defined once in `src/content.js`. Change
the values there and every component picks them up automatically — you
shouldn't need to touch the component files for basic customisation.

## About the images

The original site's illustrations (the archway scene, the event backgrounds,
the Ganesh icon, the monogram, etc.) are large source files — several are
4–20MB. By default `src/content.js` points `IMAGES` at the live deployment's
URLs, so the site works immediately without vendoring any binaries.

To make the site fully self-contained / offline:
1. Download each file from the live site (they're public assets): `door.jpeg`,
   `HarjotMann.png`, `ganesh.png`, `logo.png`, `scratch_date.png`, and
   `2.png` through `6.png` (the event backgrounds).
2. Drop them into `public/`.
3. In `src/content.js`, change each entry in `IMAGES` from the full
   `https://mann-and-harjot-wedding-invite.vercel.app/...` URL to the local
   path, e.g. `"/HarjotMann.png"`.

Eventually you'll likely want to replace these with your own couple's
photos/illustrations anyway — same process, just point `IMAGES` at your own
files.

## Fonts

Headings use **Cinzel** (loaded from Google Fonts, free/open license). The
original site's script font for the couple's names is **Bickham Script Pro**,
a commercial Adobe font that can't be redistributed here. This project
substitutes **Mrs Saint Delafield** (also free on Google Fonts) via the
`font-script` utility class — swap the Google Fonts `<link>` in `index.html`
and the `--font-script` value in `src/index.css` if you have a license for
Bickham Script or want a different look.

## Music toggle

The button in the top-right toggles playback of `/music.mp3`. That file isn't
included (the original site's audio wasn't reachable while cloning this), so
add your own MP3 to `public/music.mp3` to make it play, or remove
`<MusicToggle />` from `src/App.jsx` if you don't want background music.

## RSVP form

The form is fully interactive (validation, event checkboxes, attending
toggle) but has no backend by default — submissions are logged to the
browser console and show a "Thank you" confirmation. To make it actually
deliver responses to you, set `FORM_ENDPOINT` in `src/content.js` to a real
endpoint (e.g. a [Formspree](https://formspree.io) form, a Google Sheets Apps
Script web app, [EmailJS](https://www.emailjs.com/), or your own API) — the
form already POSTs `{ fullName, phone, guests, attending, events, message }`
as JSON.

## Location / map

`src/components/Location.jsx` embeds a Google Maps iframe and an "Open in
Google Maps" button, both built from `VENUE.mapsQuery` in `src/content.js`.
Update that to your actual venue name/address.

## Tech stack

- [Vite](https://vite.dev/) + React 19
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Framer Motion](https://www.framer.com/motion/) for the fade/scroll reveal
  animations
# rishit-payal
