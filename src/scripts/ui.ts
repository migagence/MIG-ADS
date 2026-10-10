/**
 * Interactions légères : header, apparitions au scroll, CTA sticky mobile,
 * cas clients dépliables, témoignages, diagramme méthode, FAQ, vidéo différée.
 */
import { track } from './analytics';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window) || reduceMotion) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  const vh = window.innerHeight || document.documentElement.clientHeight;
  items.forEach((el) => {
    // Déjà visible au chargement : affiché immédiatement (aucune dépendance à l’observer).
    if (el.getBoundingClientRect().top < vh) el.classList.add('is-in');
    else io.observe(el);
  });
  // Filet de sécurité : rien ne doit rester invisible si l’observer ne se déclenche pas.
  const safety = () => {
    const h = window.innerHeight || document.documentElement.clientHeight;
    items.forEach((el) => { if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < h * 1.1) el.classList.add('is-in'); });
  };
  window.addEventListener('scroll', safety, { passive: true });
  window.setTimeout(safety, 1500);
}

function initStickyCta(): void {
  const bar = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const hero = document.getElementById('top');
  const closing = document.querySelector<HTMLElement>('[data-closing]');
  const bookingSection = document.querySelector<HTMLElement>('[data-booking]');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;
  let heroVisible = true;
  let closingVisible = false;
  let bookingVisible = false;
  const apply = () => {
    const show = !heroVisible && !closingVisible && !bookingVisible && !document.documentElement.classList.contains('modal-open');
    bar.classList.toggle('is-visible', show);
    bar.setAttribute('aria-hidden', show ? 'false' : 'true');
    document.body.classList.toggle('has-sticky-cta', show);
  };
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; apply(); }, { threshold: 0.15 }).observe(hero);
  if (closing) new IntersectionObserver(([e]) => { closingVisible = e.isIntersecting; apply(); }, { threshold: 0.2 }).observe(closing);
  if (bookingSection) new IntersectionObserver(([e]) => { bookingVisible = e.isIntersecting; apply(); }, { threshold: 0.05 }).observe(bookingSection);
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

function initCaseStudies(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-case-toggle]').forEach((btn) => {
    const story = document.getElementById(btn.getAttribute('aria-controls') || '');
    if (!story) return;
    const closedLabel = btn.querySelector<HTMLElement>('[data-label-closed]');
    const openLabel = btn.querySelector<HTMLElement>('[data-label-open]');
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      story.classList.toggle('is-open', open);
      if (open) story.removeAttribute('inert'); else story.setAttribute('inert', '');
      if (closedLabel) closedLabel.hidden = open;
      if (openLabel) openLabel.hidden = !open;
      if (open) track('case_study_open', { case: btn.dataset.case });
    });
  });
}

function initVideoTestimonials(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-vt-play]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest<HTMLElement>('[data-vt]');
      const src = btn.dataset.src || '';
      const type = btn.dataset.type || 'mp4';
      if (!card || !src) return;
      track('testimonial_video_play', { id: card.dataset.vt });
      if (type === 'wistia') {
        const player = document.createElement('wistia-player');
        player.setAttribute('media-id', src);
        player.setAttribute('autoplay', '');
        const s1 = document.createElement('script'); s1.src = 'https://fast.wistia.com/player.js'; s1.async = true;
        const s2 = document.createElement('script'); s2.src = `https://fast.wistia.com/embed/${src}.js`; s2.async = true; s2.type = 'module';
        document.head.append(s1, s2);
        card.querySelector('.vcard__media')?.replaceChildren(player);
      } else {
        const video = document.createElement('video');
        video.src = src; video.controls = true; video.autoplay = true; video.playsInline = true; video.setAttribute('preload', 'metadata');
        card.querySelector('.vcard__media')?.replaceChildren(video);
      }
      card.querySelector('.vcard__quote')?.setAttribute('hidden', '');
    }, { once: true });
  });
}

function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length || reduceMotion) return;
  els.forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const decimals = Number(el.dataset.decimals || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const fmt = (v: number) => prefix + v.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target);
    };
    el.textContent = fmt(0);
    requestAnimationFrame(tick);
  });
}

function initFaq(): void {
  document.querySelectorAll<HTMLDetailsElement>('details.faq').forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) track('faq_open', { question: d.querySelector('summary')?.textContent?.trim().slice(0, 80), index: d.dataset.faq });
    });
  });
}

function initVideo(): void {
  const wrap = document.querySelector<HTMLElement>('[data-vsl]');
  const btn = wrap?.querySelector<HTMLButtonElement>('[data-video]');
  if (!wrap || !btn) return;
  btn.addEventListener('click', () => {
    const id = btn.dataset.video as string;
    track('method_interaction', { type: 'video_play', video: id });
    const player = document.createElement('wistia-player');
    player.setAttribute('media-id', id);
    player.setAttribute('aspect', '1.4678899082568808');
    player.setAttribute('autoplay', '');
    const s1 = document.createElement('script'); s1.src = 'https://fast.wistia.com/player.js'; s1.async = true;
    const s2 = document.createElement('script'); s2.src = `https://fast.wistia.com/embed/${id}.js`; s2.async = true; s2.type = 'module';
    document.head.append(s1, s2);
    wrap.replaceChildren(player);
  }, { once: true });
}

export function initUi(): void {
  initHeader();
  initReveal();
  initStickyCta();
  initCaseStudies();
  initVideoTestimonials();
  initCounters();
  initFaq();
  initVideo();
}
