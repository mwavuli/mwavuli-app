/**
 * The services row: a native scroll-snap scroller. This script only adds the controls
 * (thumb, count and arrow buttons) that mirror its scroll position. Without it the row
 * still scrolls by touch, trackpad and keyboard, and the controls stay hidden.
 */
import { pad } from './pad';

function initRail(root: HTMLElement): void {
  const rail = root.querySelector<HTMLElement>('[data-rail]');
  const thumb = root.querySelector<HTMLElement>('[data-rail-thumb]');
  const current = root.querySelector<HTMLElement>('[data-rail-current]');
  const prev = root.querySelector<HTMLButtonElement>('[data-rail-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-rail-next]');
  if (!rail || !thumb || !current || !prev || !next) return;

  const cards = Array.from(rail.children) as HTMLElement[];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** Distance from one card to the next, gap included. */
  const step = (): number => (cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : rail.clientWidth);

  const update = (): void => {
    const max = rail.scrollWidth - rail.clientWidth;
    const share = rail.clientWidth / rail.scrollWidth;
    thumb.style.width = `${share * 100}%`;
    thumb.style.transform = `translateX(${(rail.scrollLeft / rail.clientWidth) * 100}%)`;
    // The count is the last card that is fully in view.
    const edge = rail.scrollLeft + rail.clientWidth + 2;
    const seen = cards.filter((card) => card.offsetLeft + card.offsetWidth <= edge).length;
    current.textContent = pad(Math.max(1, Math.min(cards.length, seen)));
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= max - 2;
  };

  const scrollByCard = (direction: 1 | -1): void =>
    rail.scrollBy({ left: direction * step(), behavior: reduced.matches ? 'auto' : 'smooth' });

  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
  rail.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);

  root.dataset.ready = '';
  update();
}

document.querySelectorAll<HTMLElement>('[data-rail-root]').forEach(initRail);
