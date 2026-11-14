// Demo form: send to Netlify Forms without leaving the page, then show the thank-you message.
const form = document.querySelector('[data-demo-form]');
if (form) {
  const thanks = document.querySelector('[data-demo-thanks]');
  const error = document.querySelector('[data-demo-error]');
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
