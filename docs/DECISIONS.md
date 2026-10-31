## 2026-10-31: Moved from Vercel to Cloudflare Pages (static)
- Vercel Hobby team paused (CPU limit); `middleware.js` (prerender.io for bots) was the main cost. Site is static HTML, crawlers read it directly.
- Cloudflare Pages project `degen-cure-center`, deployed with `wrangler pages deploy <dist>` from a folder holding only: index.html, style.css, robots.txt, sitemap.xml, favicons, root images, assets/, _headers.
- Not deployed: middleware.js, api/verify.js, verify/. The bot backend `api/verify.js` proxies to (VPS IP:8000) was unreachable, and Pages Functions cannot fetch a bare IP on port 8000.
- `_headers` adds `X-Robots-Tag: noindex` only on *.pages.dev hosts; the custom domain stays indexable.
- Vercel project left in place, not deleted. Domain not renewed, site lives until expiry.
- Domain switched 2026-10-31: apex and www CNAME -> degen-cure-center.pages.dev (proxied), both attached as Pages custom domains. Zone redirect rule: www -> https://degencurecenter.com (301, path and query kept). triage A record untouched.
- Live HTML differs from repo only by Cloudflare's zone-level bot JS snippet injected before </body>; head/SEO tags unchanged.
- Redeploy: copy the static files listed above into a temp folder, then `CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=a7e9c308efff0b6c92c2b4a3fff30cf3 npx wrangler@4.144.0 pages deploy <folder> --project-name degen-cure-center --branch main`. Run it outside a folder with a wrangler config; in an empty folder wrangler tries to create a Worker.
