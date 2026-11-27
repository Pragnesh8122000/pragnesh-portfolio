const card = document.querySelector('.bestie-card')
if (card) {
  const toggle = card.querySelector('.bestie-actions button')
  const brief = card.querySelector('.brief-wrap')
  toggle.addEventListener('click', () => {
    const open = !card.hasAttribute('data-open')
    card.toggleAttribute('data-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    brief.inert = !open
  })
}

// Each project shows real screens in one frame; the pills switch which one is visible.
// Without JavaScript the first screen and its note stay on show.
document.querySelectorAll('[data-screens]').forEach((stage) => {
  const buttons = [...stage.querySelectorAll('.screens-switch button')]
  const screens = [...stage.querySelectorAll('.screen')]
  const note = stage.querySelector('.screens-note')

  const show = (key) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.screen === key)))
    screens.forEach((screen) => {
      const current = screen.dataset.screen === key
      screen.toggleAttribute('data-current', current)
      // aria-hidden needs the literal "true"; an empty value does not hide the screen from assistive tech
      if (current) screen.removeAttribute('aria-hidden')
      else screen.setAttribute('aria-hidden', 'true')
      if (current) {
        const label = Object.assign(document.createElement('b'), { textContent: screen.dataset.noteLabel + '.' })
        note.replaceChildren(label, ' ' + screen.dataset.note)
      }
    })
  }

  buttons.forEach((button) => button.addEventListener('click', () => show(button.dataset.screen)))

  // The other screens load once the frame is near, so switching never waits on the network.
  new IntersectionObserver((entries, observer) => {
    if (!entries.some((entry) => entry.isIntersecting)) return
    stage.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager' })
    observer.disconnect()
  }, { rootMargin: '400px' }).observe(stage)
})
