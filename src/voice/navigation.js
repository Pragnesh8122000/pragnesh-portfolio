const header = document.querySelector('.sitehead');
const menuToggle = header.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = sectionLinks.map((link) => document.getElementById(link.hash.slice(1)));
const mobile = matchMedia('(max-width: 760px)');
let currentLink;
let updateFrame;

function setMenu(open) {
  header.toggleAttribute('data-menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.inert = mobile.matches && !open;
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (mobile.matches && event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.hasAttribute('data-menu-open')) {
    setMenu(false);
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (header.hasAttribute('data-menu-open') && !header.contains(event.target)) setMenu(false);
});

mobile.addEventListener('change', () => {
  if (mobile.matches && navigation.contains(document.activeElement)) menuToggle.focus();
  setMenu(false);
});

function updateCurrentSection() {
  updateFrame = undefined;
  const readingLine = innerHeight * 0.32;
  const atBottom = scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
  const index = atBottom ? sections.length - 1 : sections.findLastIndex((section) => section.getBoundingClientRect().top < readingLine);
  const nextLink = sectionLinks[index];
  header.toggleAttribute('data-condensed', scrollY > 40);
  if (nextLink === currentLink) return;
  currentLink?.removeAttribute('aria-current');
  nextLink?.setAttribute('aria-current', 'location');
  currentLink = nextLink;
  placeIndicator();
}

// One indicator travels to the current section's link (desktop only; the phone menu is a sheet).
const indicator = navigation.querySelector('.nav-ind');
function placeIndicator() {
  if (!indicator) return;
  const show = currentLink && !mobile.matches;
  indicator.style.setProperty('--o', show ? '1' : '0');
  if (!show) return;
  indicator.style.setProperty('--x', `${currentLink.offsetLeft}px`);
  indicator.style.setProperty('--w', `${currentLink.offsetWidth}px`);
}

// The header's Email button appears once the hero's own one has scrolled away, so the main action is always in reach.
const heroAction = document.querySelector('.hero-action');
if (heroAction) {
  new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-show-cta', !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(heroAction);
}

function scheduleSectionUpdate() {
  updateFrame ??= requestAnimationFrame(updateCurrentSection);
}

setMenu(false);
header.dataset.navReady = '';
menuToggle.hidden = false;
addEventListener('scroll', scheduleSectionUpdate, { passive: true });
addEventListener('resize', () => {
  scheduleSectionUpdate();
  placeIndicator();
});
mobile.addEventListener('change', placeIndicator);
document.fonts?.ready.then(placeIndicator);
updateCurrentSection();
