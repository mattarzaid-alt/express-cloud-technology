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
