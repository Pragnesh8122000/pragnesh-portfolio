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

  const print = card.querySelector('.companion-print')
  print.querySelector('.persona-switch').addEventListener('change', ({ target }) => {
    print.dataset.persona = target.value
    const reply = print.querySelector('.' + target.value + ' q')
    const words = reply.textContent.split(' ')
    reply.replaceChildren()
    words.forEach((word, index) => {
      const span = document.createElement('span')
      span.className = 'reply-word'
      span.style.setProperty('--delay', index * 90 + 'ms')
      span.textContent = word
      if (index) reply.append(' ')
      reply.append(span)
    })
  })
}
