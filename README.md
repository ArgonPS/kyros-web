# Kyros Website (kyrosps.io)

Next.js App Router site for **Kyros** — landing, download, vote, store, and wiki stubs.

## Local development

```bash
cd kyros-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_DISCORD_INVITE` to your `discord.gg` URL so the Discord tab’s join button works.

## Deploy to Vercel

1. Push this `kyros-web` folder to a GitHub repo (or monorepo with Root Directory set to `kyros-web`).
2. In Vercel: **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Build command `next build`, output default.
4. Deploy. Confirm the `*.vercel.app` URL loads.

## Connect kyrosps.io (Porkbun → Vercel)

1. In Vercel project → **Settings → Domains** → add `kyrosps.io` and `www.kyrosps.io`.
2. Vercel shows the DNS records to create. Typical setup:
   - **A** record for `@` → `76.76.21.21` (Vercel’s apex IP; use the value Vercel shows if different)
   - **CNAME** for `www` → `cname.vercel-dns.com` (or the host Vercel lists)
3. In Porkbun → domain **kyrosps.io** → DNS → add those records. Remove conflicting A/CNAME/parked records.
4. Wait for DNS (often minutes; up to 48h). Vercel issues HTTPS automatically.

Do **not** point the domain at Porkbun cPanel/WordPress hosting — this site runs on Vercel only.

## What’s stubbed vs live later

| Area | Status |
|------|--------|
| Marketing pages | Live in this repo |
| Client download URL | Placeholder until launcher is hosted |
| Vote toplist links / claim API | Wire when `api_enabled` + vote backend are live |
| Store checkout (Stripe / PayPal) | Wire when payment + claim API are live |

Game server VPS is separate from this website.
