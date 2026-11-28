// "How I ship a voice agent": a modal side sheet (a full-screen sheet on phones) opened from the hero and the nav.
// The native <dialog> gives focus containment, Escape and an inert page; this file adds the triggers, closing on
// a backdrop click, returning focus, and the one pass of light down the steps each time it opens (CSS, keyed on
// data-run). The steps are <details name> elements, so opening one closes the others without script.
const dialog = document.querySelector('#ship');
const openers = document.querySelectorAll('[data-ship-open]');

if (dialog && typeof dialog.showModal === 'function') {
  let opener;

  const open = (event) => {
    opener = event.currentTarget;
    dialog.removeAttribute('data-run');
    dialog.showModal();
    openers.forEach((button) => button.setAttribute('aria-expanded', 'true'));
    // a frame later, so the pass restarts on every open
    requestAnimationFrame(() => dialog.setAttribute('data-run', ''));
    dialog.querySelector('.ship-steps').scrollTop = 0;
    dialog.querySelector('.ship-panel').scrollTop = 0;
  };

  openers.forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', open);
  });

  dialog.querySelectorAll('[data-ship-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));

  // A click on the backdrop lands on the dialog element itself, outside the panel.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    openers.forEach((button) => button.setAttribute('aria-expanded', 'false'));
    // The phone menu closes when its button is pressed, so focus goes to the menu toggle instead.
    const target = opener?.checkVisibility?.() === false ? document.querySelector('.menu-toggle') : opener;
    target?.focus({ preventScroll: true });
  });
} else {
  // No dialog support: the buttons would do nothing, so hide them.
  openers.forEach((button) => { button.hidden = true; });
}
