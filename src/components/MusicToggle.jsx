import { SpeakerIcon } from './Motifs';

// Fixed gold circle, bottom-right (safe-area aware). The <audio> element lives
// in App.jsx so the gate tap can start playback from a user gesture.
export default function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Mute music' : 'Play music'}
      aria-pressed={playing}
      className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-cream-2/95 text-maroon shadow-[0_6px_18px_rgba(97,21,34,0.22)] backdrop-blur-sm"
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <SpeakerIcon muted={!playing} className="h-5 w-5" />
    </button>
  );
}
