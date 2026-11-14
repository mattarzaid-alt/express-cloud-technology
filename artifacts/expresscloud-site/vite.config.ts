import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

const root = import.meta.dirname;
const outDir = path.resolve(root, 'dist/public');

// The live host serves /pricing as well as /pricing.html. Do the same in dev
// and preview so reloads and links work.
function cleanUrls(): Plugin {
  const rewrite = (dir: string) => (req: { url?: string }, _res: unknown, next: () => void) => {
    const [pathname, query = ''] = (req.url || '').split('?');
    const name = pathname.replace(/\/+$/, '');
    if (name && !path.extname(name) && fs.existsSync(path.join(dir, `${name}.html`))) {
      req.url = `${name}.html${query ? `?${query}` : ''}`;
    }
    next();
  };
  return {
    name: 'clean-urls',
    configureServer(server) { server.middlewares.use(rewrite(root)); },
    configurePreviewServer(server) { server.middlewares.use(rewrite(outDir)); },
  };
}

const port = Number(process.env.PORT);
if (!port || port <= 0) throw new Error('PORT environment variable is required.');
const basePath = process.env.BASE_PATH;
if (!basePath) throw new Error('BASE_PATH environment variable is required.');

// Plain static site: Vite is only the file server and multi-page bundler.
// Every .html file in this folder is a page; adding a page needs no config.
// Arabic pages live in ar/ under the same file names.
const pages = Object.fromEntries(
  ['', 'ar'].flatMap((folder) =>
    fs.readdirSync(path.join(root, folder))
      .filter((file) => file.endsWith('.html'))
      .map((file) => [path.join(folder, file).replace(/\.html$/, ''), path.resolve(root, folder, file)]),
  ),
);

export default defineConfig({
  base: basePath,
  appType: 'mpa',
  plugins: [cleanUrls()],
  root,
  build: { outDir, emptyOutDir: true, rollupOptions: { input: pages } },
  server: { port, strictPort: true, host: '0.0.0.0', allowedHosts: true, fs: { strict: true } },
  preview: { port, host: '0.0.0.0', allowedHosts: true },
});
