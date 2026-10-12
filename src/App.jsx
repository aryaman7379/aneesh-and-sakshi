import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Petals from './components/Petals';
import MusicToggle from './components/MusicToggle';
import LandingGate from './components/LandingGate';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import Countdown from './components/Countdown';
import WeddingEvents from './components/WeddingEvents';
import Location from './components/Location';
import SaveTheDate from './components/SaveTheDate';
import { useIntroScroll } from './useIntroScroll';

const TARGET_VOLUME = 0.4;
const FADE_MS = 1600;
const MUSIC_PREF_KEY = 'invite-music-muted';

export default function App() {
  const [opened, setOpened] = useState(false);
  useIntroScroll(opened);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const retryRef = useRef(null);
  const musicOnRef = useRef(false);
  /** True once unmuted playback has been allowed (user gesture or successful play). */
  const unlockedRef = useRef(false);
  /** Muted media element is already running (browsers allow muted autoplay). */
  const primedRef = useRef(false);
  musicOnRef.current = musicOn;

  useEffect(
    () => () => {
      clearInterval(fadeRef.current);
      clearTimeout(retryRef.current);
    },
    []
  );

  // Pause when the tab is hidden; resume from the same position if music was on.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        if (!audio.paused) {
          clearInterval(fadeRef.current);
          audio.pause();
        }
        return;
      }
      if (musicOnRef.current && audio.paused) {
        audio
          .play()
          .then(() => {
            if (unlockedRef.current) {
              audio.muted = false;
              audio.volume = TARGET_VOLUME;
            }
          })
          .catch(() => {
            setMusicOn(false);
          });
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const fadeIn = useCallback((audio) => {
    clearInterval(fadeRef.current);
    audio.muted = false;
    const step = 40;
    audio.volume = 0;
    fadeRef.current = setInterval(() => {
      const next = audio.volume + TARGET_VOLUME / (FADE_MS / step);
      if (next >= TARGET_VOLUME) {
        audio.volume = TARGET_VOLUME;
        clearInterval(fadeRef.current);
      } else {
        audio.volume = next;
      }
    }, step);
  }, []);

  /** Start the element muted — usually allowed without a gesture. */
  const primeMuted = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || primedRef.current) return Promise.resolve(primedRef.current);

    audio.muted = true;
    audio.volume = 0;
    return audio
      .play()
      .then(() => {
        primedRef.current = true;
        return true;
      })
      .catch(() => false);
  }, []);

  /**
   * Audible playback. Must run in a user-gesture turn when the browser has not
   * already granted autoplay — there is no reliable way around that policy.
   */
  const playAudio = useCallback(
    ({ restart = false } = {}) => {
      const audio = audioRef.current;
      if (!audio) return Promise.resolve(false);

      try {
        localStorage.setItem(MUSIC_PREF_KEY, '0');
      } catch {
        /* private mode */
      }

      try {
        if (restart && audio.paused) audio.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }

      audio.muted = false;

      const finish = () => {
        unlockedRef.current = true;
        primedRef.current = true;
        setMusicOn(true);
        if (audio.volume < TARGET_VOLUME) fadeIn(audio);
        else audio.volume = TARGET_VOLUME;
        return true;
      };

      if (!audio.paused) {
        return Promise.resolve(finish());
      }

      return audio
        .play()
        .then(finish)
        .catch(() => {
          setMusicOn(false);
          return false;
        });
    },
    [fadeIn]
  );

  // Prime muted playback as early as possible (load / canplay).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const tryPrime = () => {
      primeMuted();
    };

    tryPrime();
    audio.addEventListener('canplay', tryPrime);
    return () => audio.removeEventListener('canplay', tryPrime);
  }, [primeMuted]);

  // After the gate opens, keep retrying audible play and unlock on any gesture.
  useEffect(() => {
    if (!opened) return undefined;

    let cancelled = false;
    let attempts = 0;

    const tryPlay = () => {
      if (cancelled || unlockedRef.current) return;
      playAudio().then((ok) => {
        if (cancelled || ok) return;
        attempts += 1;
        if (attempts < 8) {
          retryRef.current = setTimeout(tryPlay, 400);
        }
      });
    };

    tryPlay();

    const unlockEvents = ['pointerdown', 'touchstart', 'touchmove', 'keydown', 'wheel', 'scroll'];

    const unlock = () => {
      if (unlockedRef.current) return;
      playAudio().then((ok) => {
        if (!ok) return;
        unlockEvents.forEach((type) => window.removeEventListener(type, unlock));
      });
    };
    unlockEvents.forEach((type) =>
      window.addEventListener(type, unlock, { passive: true })
    );

    return () => {
      cancelled = true;
      clearTimeout(retryRef.current);
      unlockEvents.forEach((type) => window.removeEventListener(type, unlock));
    };
  }, [opened, playAudio]);

  // Same-turn unmute on gate tap (only reliable path for audible autoplay).
  const handleGateTap = useCallback(() => {
    playAudio();
  }, [playAudio]);

  const handleGateDone = useCallback(() => {
    setOpened(true);
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      clearInterval(fadeRef.current);
      clearTimeout(retryRef.current);
      audio.pause();
      setMusicOn(false);
      unlockedRef.current = false;
      try {
        localStorage.setItem(MUSIC_PREF_KEY, '1');
      } catch {
        /* ignore */
      }
      return;
    }
    playAudio({ restart: true });
  }, [musicOn, playAudio]);

  return (
    <main className="mobile-container flex flex-col">
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/music.webm" type="audio/webm; codecs=opus" />
        <source src="/music.m4a" type="audio/mp4" />
      </audio>

      {opened && <MusicToggle playing={musicOn} onToggle={toggleMusic} />}
      {opened && <Petals />}

      <AnimatePresence>
        {!opened && (
          <LandingGate key="gate" onBeginOpen={handleGateTap} onOpen={handleGateDone} />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <Hero />
          <Invitation />
          <Countdown />
          <WeddingEvents />
          <Location />
          <SaveTheDate />
        </>
      )}
    </main>
  );
}
