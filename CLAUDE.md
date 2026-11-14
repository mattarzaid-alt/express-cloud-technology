# Working on the ExpressCloud AI website

Same shape as the Orbit website repo.

- pnpm workspace; the site lives in `artifacts/expresscloud-site`.
- Plain HTML, CSS and JavaScript, no framework. Vite is only the dev server and multi-page bundler.
- Every `.html` file in the site folder is a page. Links between pages are relative (`pricing.html`); the host also serves the clean form (`/pricing`).
- Colours, type and spacing come from `tokens/`; pages never hard-code them.
- Run `pnpm run verify` before shipping; it must pass before a Republish on Replit.
- Secrets live only in Replit Secrets; never ask for or paste keys.
- Lead with proof before promises. Never invent or inflate numbers, customers or results.
