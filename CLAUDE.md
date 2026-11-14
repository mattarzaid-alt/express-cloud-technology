# Working on the Express Cloud website

Same shape as the Orbit website repo, hosted on Netlify.

Direction: premium and minimal (large type, lots of space, black, white and one accent). The clinic AI receptionist is the featured product.

- pnpm workspace; the site lives in `artifacts/expresscloud-site`.
- Plain HTML, CSS and JavaScript, no framework. Vite is only the dev server and multi-page bundler.
- Every `.html` file in the site folder is a page.
- Colours, type and spacing come from `tokens/`; pages never hard-code them.
- Netlify builds and publishes on every push to `main` (`netlify.toml`). The demo form goes to Netlify Forms (form name `demo`).
- Run `pnpm run verify` before shipping; it must pass.
- Company home page (`index.html`): hero, "Who we are" and the closing line are the old company website's own wording; focus areas and operating experience are drafts for the owner to approve. Clinic page (`clinic-ai-receptionist.html`) uses the brief's copy as written. No prices, statistics, testimonials, client logos, awards or promised results.
- Never ask for patient data on this site.
- No emoji, stock photos or robot imagery. The only gradient is the brand violet-to-aqua, used sparingly.
- Before launch, replace `WHATSAPP_NUMBER` and `EMAIL`, and remove the `noindex` tag.
