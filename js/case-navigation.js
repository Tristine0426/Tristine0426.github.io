const contents = document.querySelector('.case-contents details');
const wideScreen = matchMedia('(min-width: 961px)');
const links = [...contents.querySelectorAll('a')];
const headings = links.map(link => document.getElementById(link.hash.slice(1)));

function updateDisclosure() {
  contents.open = wideScreen.matches;
}

function updateCurrentSection() {
  let active = 0;
  headings.forEach((heading, index) => {
    if (heading.getBoundingClientRect().top <= 100) active = index;
  });
  const atBottom = window.scrollY > 0 &&
    Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight;
  if (atBottom) active = links.length - 1;

  links.forEach((link, index) => {
    if (index === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

contents.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
  if (!wideScreen.matches) contents.open = false;
  document.getElementById(link.hash.slice(1)).focus({ preventScroll: true });
});

contents.addEventListener('keydown', event => {
  if (event.key === 'Escape' && contents.open && !wideScreen.matches) {
    contents.open = false;
    contents.querySelector('summary').focus();
  }
});

wideScreen.addEventListener('change', updateDisclosure);
window.addEventListener('scroll', updateCurrentSection, { passive: true });
window.addEventListener('resize', updateCurrentSection);
window.addEventListener('load', updateCurrentSection);
updateDisclosure();
updateCurrentSection();
