/**
 * The film hero. Four slides play once, each for the length of the bar's fill, then the film
 * rests on the first slide. Progressive enhancement: without this script the four slides are
 * a plain stack, every one readable (see `.film` in global.css).
 *
 * - The CSS animation of the active bar segment is the clock: `animationend` advances.
 * - Pause, the picker, the arrows and the swipe all work on the same few functions.
 * - Under `prefers-reduced-motion` the film never autoplays and the pause button is hidden;
 *   the picker and the arrows still move between slides.
 * - It holds while a control has keyboard focus, while the hero is mostly off screen and
 *   while the tab is hidden.
 */

import { pad } from './pad';

type State = 'playing' | 'paused' | 'idle';

function initFilm(film: HTMLElement): void {
  const stage = film.querySelector<HTMLElement>('[data-stage]');
  const slides = Array.from(film.querySelectorAll<HTMLElement>('[data-slide]'));
  const tabs = Array.from(film.querySelectorAll<HTMLButtonElement>('[data-tab]'));
  const current = film.querySelector<HTMLElement>('[data-current]');
  const prev = film.querySelector<HTMLButtonElement>('[data-prev]');
  const next = film.querySelector<HTMLButtonElement>('[data-next]');
  const toggle = film.querySelector<HTMLButtonElement>('[data-toggle]');
  const toggleLabel = film.querySelector<HTMLElement>('[data-toggle-label]');
  if (!stage || !current || !prev || !next || !toggle || !toggleLabel) return;
  if (slides.length === 0 || slides.length !== tabs.length) return;

  const last = slides.length - 1;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let state: State = 'idle';
  let ended = false;
  let focused = false;

  // The slides are tab panels of the picker (the WAI-ARIA tabbed carousel pattern).
  film.setAttribute('aria-roledescription', 'carousel');
  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-labelledby', tabs[i].id);
  });

  // A live region announces a change of slide only when the film is not moving on its own and
  // nobody is using the keyboard on it.
  const syncLive = (): void => stage.setAttribute('aria-live', state === 'playing' && !focused ? 'off' : 'polite');

  const setState = (value: State): void => {
    state = value;
    film.dataset.state = value;
    syncLive();
    const label = value === 'playing' ? 'Pause' : ended ? 'Replay' : 'Play';
    toggleLabel.textContent = label;
    toggle.setAttribute('aria-label', `${label} the slides`);
  };

  const show = (i: number): void => {
    index = i;
    slides.forEach((slide, k) => slide.classList.toggle('is-active', k === i));
    tabs.forEach((tab, k) => {
      tab.classList.toggle('is-active', k === i);
      tab.classList.toggle('is-done', k < i);
      tab.setAttribute('aria-selected', String(k === i));
      tab.tabIndex = k === i ? 0 : -1;
    });
    current.textContent = pad(i + 1);
  };

  /** Move to a slide by hand: the film keeps its state, and a finished film is not "ended" any more. */
  const go = (i: number): void => {
    const target = (i + slides.length) % slides.length;
    if (target === index) return;
    ended = false;
    show(target);
    setState(state);
  };

  const advance = (): void => {
    if (index < last) {
      show(index + 1);
      return;
    }
    // The film is over: rewind to the title card and rest there.
    ended = true;
    show(0);
    setState('idle');
  };

  // The bar's fill is the clock.
  film.addEventListener('animationend', (event) => {
    if (event.animationName === 'seg-fill' && state === 'playing') advance();
  });

  toggle.addEventListener('click', () => {
    if (state === 'playing') {
      setState('paused');
      return;
    }
    ended = false;
    setState('playing');
  });
  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  tabs.forEach((tab, i) => tab.addEventListener('click', () => go(i)));

  // Picker: arrow keys move between tabs and show the slide, as in the tabbed carousel pattern.
  tabs.forEach((tab, i) => {
    tab.addEventListener('keydown', (event) => {
      const keys: Record<string, number> = {
        ArrowRight: i + 1,
        ArrowLeft: i - 1,
        Home: 0,
        End: last,
      };
      if (!(event.key in keys)) return;
      event.preventDefault();
      const target = (keys[event.key] + slides.length) % slides.length;
      go(target);
      tabs[target].focus();
    });
  });

  // Swipe on touch screens.
  let startX = 0;
  let startY = 0;
  let tracking = false;
  stage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    startX = event.clientX;
    startY = event.clientY;
    tracking = true;
  });
  stage.addEventListener('pointerup', (event) => {
    if (!tracking) return;
    tracking = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener('pointercancel', () => {
    tracking = false;
  });

  // Hold the clock while nobody can see it, or while a keyboard user is on a control.
  let offscreen = false;
  const hold = () => film.toggleAttribute('data-hold', focused || offscreen || document.hidden);
  film.addEventListener('focusin', (event) => {
    focused = (event.target as HTMLElement).matches(':focus-visible');
    syncLive();
    hold();
  });
  film.addEventListener('focusout', (event) => {
    if (!film.contains(event.relatedTarget as Node | null)) {
      focused = false;
      syncLive();
      hold();
    }
  });
  document.addEventListener('visibilitychange', hold);
  new IntersectionObserver(
    ([entry]) => {
      offscreen = entry.intersectionRatio < 0.3;
      hold();
    },
    { threshold: [0, 0.3, 1] },
  ).observe(film);

  reduced.addEventListener('change', () => {
    if (reduced.matches) setState('idle');
  });

  film.dataset.ready = '';
  setState(reduced.matches ? 'idle' : 'playing');
}

document.querySelectorAll<HTMLElement>('[data-film]').forEach(initFilm);
