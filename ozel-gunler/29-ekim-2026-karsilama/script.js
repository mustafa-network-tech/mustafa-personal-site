(() => {
  'use strict';

  const CAMPAIGN_DATE = '2026-10-29';
  const DISPLAY_MS = 10_000;
  const params = new URLSearchParams(window.location.search);
  const isFilePreview = window.location.protocol === 'file:';
  const isLocalPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const previewMode = params.get('preview') === '1' || isFilePreview || isLocalPreview;
  const testMode = params.get('test') === '1';
  const storageScope = window.location.hostname || 'standalone';
  const storageKey = `republic-welcome:${CAMPAIGN_DATE}:${storageScope}`;

  const welcome = document.querySelector('[data-republic-welcome]');
  const closeButton = document.querySelector('[data-republic-close]');
  const reopenButton = document.querySelector('[data-republic-reopen]');
  const previewOpenButton = document.querySelector('[data-preview-open]');
  const previewResetButton = document.querySelector('[data-preview-reset]');
  const countdown = document.querySelector('[data-countdown]');
  let closeTimer = 0;
  let tickTimer = 0;
  let lastFocused = null;
  let hasBeenOpened = false;

  function turkeyDateKey(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Istanbul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function campaignIsActive() {
    return turkeyDateKey() === CAMPAIGN_DATE;
  }

  function hasVisited() {
    try { return localStorage.getItem(storageKey) === 'seen'; }
    catch (_) { return false; }
  }

  function rememberVisit() {
    if (previewMode || testMode) return;
    try { localStorage.setItem(storageKey, 'seen'); }
    catch (_) { /* Storage may be disabled; the experience still works. */ }
  }

  function clearTimers() {
    window.clearTimeout(closeTimer);
    window.clearInterval(tickTimer);
  }

  function restartAnimations() {
    const dialog = welcome.querySelector('.republic-welcome__dialog');
    dialog.style.display = 'none';
    void dialog.offsetHeight;
    dialog.style.display = '';
  }

  function openWelcome({ manual = false } = {}) {
    if (!welcome.hidden) return;
    clearTimers();
    lastFocused = document.activeElement;
    welcome.classList.remove('is-closing');
    welcome.hidden = false;
    reopenButton.hidden = true;
    document.documentElement.style.overflow = 'hidden';
    restartAnimations();
    closeButton.focus({ preventScroll: true });
    hasBeenOpened = true;
    if (!manual) rememberVisit();

    let remaining = DISPLAY_MS / 1000;
    countdown.textContent = String(remaining);
    tickTimer = window.setInterval(() => {
      remaining -= 1;
      countdown.textContent = String(Math.max(0, remaining));
    }, 1000);
    closeTimer = window.setTimeout(() => closeWelcome(), DISPLAY_MS);
  }

  function closeWelcome({ immediate = false } = {}) {
    if (welcome.hidden) return;
    clearTimers();
    const finish = () => {
      welcome.hidden = true;
      welcome.classList.remove('is-closing');
      document.documentElement.style.overflow = '';
      reopenButton.hidden = !(campaignIsActive() || previewMode || testMode || hasBeenOpened);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus({ preventScroll: true });
    };
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else {
      welcome.classList.add('is-closing');
      window.setTimeout(finish, 500);
    }
  }

  closeButton.addEventListener('click', () => closeWelcome());
  reopenButton.addEventListener('click', () => openWelcome({ manual: true }));
  previewOpenButton.addEventListener('click', () => openWelcome({ manual: true }));
  previewResetButton.addEventListener('click', () => {
    try { localStorage.removeItem(storageKey); }
    catch (_) { /* No-op when storage is unavailable. */ }
    openWelcome({ manual: true });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !welcome.hidden) closeWelcome();
    if (event.key === 'Tab' && !welcome.hidden) {
      event.preventDefault();
      closeButton.focus();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !welcome.hidden) closeWelcome({ immediate: true });
  });

  const shouldAutoOpen = previewMode || testMode || (campaignIsActive() && !hasVisited());
  reopenButton.hidden = !(campaignIsActive() || previewMode || testMode);
  if (shouldAutoOpen) window.requestAnimationFrame(() => openWelcome());

  window.RepublicWelcome = Object.freeze({
    open: () => openWelcome({ manual: true }),
    close: () => closeWelcome(),
    reset: () => { try { localStorage.removeItem(storageKey); } catch (_) {} },
    isActive: campaignIsActive,
    turkeyDateKey
  });
})();
