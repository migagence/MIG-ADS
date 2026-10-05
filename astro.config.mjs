// @ts-check
import { defineConfig } from 'astro/config';

/**
 * SITE_URL (env) : domaine final en production (ex. https://www.migecosystem.com).
 * Sans SITE_URL sur Vercel, le déploiement est traité comme une démo (noindex) et
 * les URLs absolues (Open Graph) pointent vers l’URL Vercel du déploiement.
 */
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
/** DEMO_URL (env) : alias public de la démo, utilisé pour les URLs absolues tant que SITE_URL n’est pas défini. */
const siteUrl = process.env.SITE_URL || process.env.DEMO_URL || vercelUrl || 'https://www.migecosystem.com';

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Sharp est le service par défaut : WebP/AVIF générés au build.
  },
});
