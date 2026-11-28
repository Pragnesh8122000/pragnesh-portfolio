// Side sheets: "How I ship a voice agent" and "How AI Bestie works". Each is a modal <dialog> on the right edge
// (a full-screen sheet on phones), opened by any button with data-sheet-open="<dialog id>". The native dialog
// gives focus containment, Escape and an inert page; this file adds the triggers, closing on a backdrop click,
// returning focus, moving from one sheet to the other, and the one pass of light down the steps on each open
// (CSS, keyed on data-run). The ship sheet's steps are <details name> elements, so one opens at a time.
const openers = [...document.querySelectorAll('[data-sheet-open]')];
const sheets = new Map();
openers.forEach((button) => {
  const dialog = document.getElementById(button.dataset.sheetOpen);
  if (dialog) sheets.set(dialog.id, dialog);
});

if (sheets.size && typeof HTMLDialogElement === 'function' && 'showModal' in HTMLDialogElement.prototype) {
  // where focus returns when a sheet closes: the button outside any sheet that started the chain
  const origin = new Map();
  const triggers = (dialog) => openers.filter((button) => button.dataset.sheetOpen === dialog.id);

  const open = (dialog, button) => {
    const from = button.closest('dialog');
    origin.set(dialog, from ? origin.get(from) : button);
    if (from) from.close();
    dialog.removeAttribute('data-run');
    dialog.showModal();
    triggers(dialog).forEach((b) => b.setAttribute('aria-expanded', 'true'));
    dialog.querySelector('.ship-panel').scrollTop = 0;
    // a frame later, so the pass restarts on every open
    requestAnimationFrame(() => dialog.setAttribute('data-run', ''));
  };

  openers.forEach((button) => {
    const dialog = sheets.get(button.dataset.sheetOpen);
    if (!dialog) return;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => open(dialog, button));
  });

  sheets.forEach((dialog) => {
    dialog.querySelectorAll('[data-sheet-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
    // A click on the backdrop lands on the dialog element itself, outside the panel.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      triggers(dialog).forEach((b) => b.setAttribute('aria-expanded', 'false'));
      // moving on to the other sheet: that one takes focus
      if ([...sheets.values()].some((other) => other.open)) return;
      const opener = origin.get(dialog);
      // The phone menu closes when its button is pressed, so focus goes to the menu toggle instead.
      const hidden = !opener || opener.closest('[inert]') || opener.checkVisibility?.({ visibilityProperty: true, opacityProperty: true }) === false;
      const target = hidden ? document.querySelector('.menu-toggle') : opener;
      target?.focus({ preventScroll: true });
    });
  });
} else {
  // No dialog support: the buttons would do nothing, so hide them.
  openers.forEach((button) => { button.hidden = true; });
}
