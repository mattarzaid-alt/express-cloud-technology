# Working on the ExpressCloud AI website

Same shape as the Orbit website repo, hosted on Netlify.

- pnpm workspace; the site lives in `artifacts/expresscloud-site`.
- Plain HTML, CSS and JavaScript, no framework. Vite is only the dev server and multi-page bundler.
- Every `.html` file in the site folder is a page.
- Colours, type and spacing come from `tokens/`; pages never hard-code them.
- Netlify builds and publishes on every push to `main` (`netlify.toml`). The demo form goes to Netlify Forms (form name `demo`).
- Run `pnpm run verify` before shipping; it must pass.
- Use the brief's copy as written. No prices, statistics, testimonials, client logos, awards or promised results.
- Never ask for patient data on this site.
- No emoji, gradients, stock photos or robot imagery.
- Before launch, replace `WHATSAPP_NUMBER` and `EMAIL`, and remove the `noindex` tag.
