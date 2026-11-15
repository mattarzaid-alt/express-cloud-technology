// Checks the built site: every page has a title and description, and every
// local link, stylesheet, script and image points at a file that exists.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(import.meta.dirname, '../../artifacts/expresscloud-site/dist/public');
const htmlIn = (folder) => (fs.existsSync(path.join(dist, folder)) ? fs.readdirSync(path.join(dist, folder)) : [])
  .filter((f) => f.endsWith('.html')).map((f) => path.join(folder, f));
const pages = [...htmlIn(''), ...htmlIn('ar')];

test('the site was built', () => {
  assert.ok(pages.includes('index.html'), 'run `pnpm run build` first');
});

for (const page of pages) {
  const html = fs.readFileSync(path.join(dist, page), 'utf8');

  test(`${page} has a title and description`, () => {
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+">/);
  });

  test(`${page} has a sharing image that exists`, () => {
    const image = html.match(/<meta property="og:image" content="https?:\/\/[^/]+(\/[^"]+)">/);
    assert.ok(image, `${page} has no og:image`);
    assert.ok(fs.existsSync(path.join(dist, image[1])), `${page} og:image ${image[1]} is missing`);
  });

  test(`${page} has no unfilled WhatsApp placeholder`, () => {
    assert.doesNotMatch(html, /WHATSAPP_NUMBER/);
  });

  test(`${page} has no broken local links`, () => {
    for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) continue;
      const clean = url.split(/[?#]/)[0];
      if (!clean) continue;
      const target = path.join(dist, clean.startsWith('/') ? clean : path.join(path.dirname(page), clean));
      const found = fs.existsSync(target) || fs.existsSync(`${target}.html`);
      assert.ok(found, `${page} links to missing ${url}`);
    }
  });
}
