# Working on the Express Cloud website

Same shape as the Orbit website repo, hosted on Netlify.

Direction: premium and minimal (large type, lots of space, black, white and one accent). The clinic AI receptionist is the featured product.

- pnpm workspace; the site lives in `artifacts/expresscloud-site`.
- Plain HTML, CSS and JavaScript, no framework. Vite is only the dev server and multi-page bundler.
- Every `.html` file in the site folder is a page.
- Colours, type and spacing come from `tokens/`; pages never hard-code them.
- Netlify builds and publishes on every push to `main` (`netlify.toml`). The demo form goes to Netlify Forms (form name `demo`).
- Run `pnpm run verify` before shipping; it must pass.
- Company home page (`index.html`): hero, Who we are, sectors, approach, opportunity and the quote are the old company website's own wording. Leadership is adapted from the CEO's LinkedIn profile.
- Never ask for patient data on this site.
- No emoji, stock photos or robot imagery. The only gradient is the brand violet-to-aqua, used sparingly.
- The public address is set in page meta tags, `public/sitemap.xml` and `public/robots.txt` (currently the Netlify address); update all of them when the domain changes.
- The home page also has an Arabic version (`ar/index.html`), translated from the English; change both together.
- The clinic page exists in English (`clinic-ai-receptionist.html`) and Arabic (`ar/clinic-ai-receptionist.html`, right-to-left). Both use the brief's copy as written; change them together. A native Gulf Arabic speaker reviews the Arabic before launch.
- Before launch, replace `EMAIL`, confirm the WhatsApp number, remove the `noindex` tag from each page, and allow crawling in `public/robots.txt`.
