## 2026-10-31: Moved from Vercel to Cloudflare Pages (static)
- Vercel Hobby team paused (CPU limit); `middleware.js` (prerender.io for bots) was the main cost. Site is static HTML, crawlers read it directly.
- Cloudflare Pages project `degen-cure-center`, deployed with `wrangler pages deploy <dist>` from a folder holding only: index.html, style.css, robots.txt, sitemap.xml, favicons, root images, assets/, _headers.
- Not deployed: middleware.js, api/verify.js, verify/. The bot backend `api/verify.js` proxies to (VPS IP:8000) was unreachable, and Pages Functions cannot fetch a bare IP on port 8000.
- `_headers` adds `X-Robots-Tag: noindex` only on *.pages.dev hosts; the custom domain stays indexable.
- Vercel project left in place, not deleted. Domain not renewed, site lives until expiry.
