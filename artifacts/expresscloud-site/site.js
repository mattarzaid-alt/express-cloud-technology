// Forms: send to Netlify Forms without leaving the page, then show the thank-you message.
for (const form of document.querySelectorAll('[data-form]')) {
  const thanks = form.parentElement.querySelector('[data-form-thanks]');
  const error = form.querySelector('[data-form-error]');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    button.disabled = true;
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error(`Form post failed: ${response.status}`);
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
    } catch {
      error.hidden = false;
      button.disabled = false;
    }
  });
}

// Sections ease in as they scroll into view. Without this script they are simply visible.
const revealed = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  revealed.forEach((element) => observer.observe(element));
} else {
  revealed.forEach((element) => element.classList.add('is-in'));
}

// The example conversation plays one message at a time, like a chat arriving.
for (const chat of document.querySelectorAll('[data-chat]')) {
  const messages = [...chat.querySelectorAll('.msg')];
  const play = () => messages.forEach((message, index) => setTimeout(() => message.classList.add('is-in'), 350 + index * 1100));
  if ('IntersectionObserver' in window) {
    const chatObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      chatObserver.disconnect();
      play();
    }, { threshold: 0.4 });
    chatObserver.observe(chat);
  } else {
    messages.forEach((message) => message.classList.add('is-in'));
  }
}

// Phone menu: the section links open under the header.
const menuButton = document.querySelector('[data-menu]');
const nav = document.getElementById('nav');
if (menuButton && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };
  menuButton.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
}

// Language switch: land on the same section in the other language.
for (const link of document.querySelectorAll('[data-lang-switch]')) {
  link.addEventListener('click', () => {
    const middle = window.innerHeight / 2;
    const current = [...document.querySelectorAll('main section[id]')].filter((section) => section.getBoundingClientRect().top <= middle).pop();
    if (current && current.id !== 'top') link.hash = current.id;
  });
}
