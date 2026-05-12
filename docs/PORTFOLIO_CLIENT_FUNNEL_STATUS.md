# Portfolio Client Funnel — Status

**Date:** 2026-05-12  
**Repo:** `C:\Users\Kevan\portfolio-unykorn\`  
**Deploy target:** `portfolio.unykorn.org`

---

## What Was Built

### New repo: `portfolio-unykorn/`

A standalone static HTML site — no framework, no npm runtime dependencies, no lock-in.
Pure HTML + CSS + vanilla JS. Pattern matches `silver-unykorn-site`.

| File | Page | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage — updated hero, CTAs, product intro |
| `services/index.html` | `/services` | All 6 service tiers with pricing |
| `rwa-readiness/index.html` | `/rwa-readiness` | Dedicated RWA Readiness Packet sales page |
| `build-request/index.html` | `/build-request` | Client build request form |
| `systems/index.html` | `/systems` | All system categories (7 categories, 25+ items) |
| `styles.css` | — | Shared dark theme (Space Grotesk, gold accents) |
| `nav.js` | — | Mobile nav, active link highlight |
| `scripts/build.js` | — | Build validation (5/5 pages, required content checks) |
| `scripts/serve.js` | — | Local dev server on :4000 (Node.js, no deps) |

### `npm run build` — **PASSES (5/5)**

```
✓ index.html
✓ services/index.html
✓ rwa-readiness/index.html
✓ build-request/index.html
✓ systems/index.html
Build: 5 pages OK, 0 failed.
✅ Build passed.
```

---

## URL List (once deployed)

| URL | Page |
|---|---|
| `https://portfolio.unykorn.org/` | Homepage |
| `https://portfolio.unykorn.org/services` | Services & Pricing |
| `https://portfolio.unykorn.org/rwa-readiness` | RWA Readiness Packet |
| `https://portfolio.unykorn.org/build-request` | Build Request Form |
| `https://portfolio.unykorn.org/systems` | Systems We Build |

---

## Funnel Flow

```
portfolio.unykorn.org
  ↓ Hero CTA: "Request a System Build" → /build-request
  ↓ Secondary CTA: "View Services"     → /services

/services
  ↓ RWA Readiness card → /rwa-readiness
  ↓ All other tiers    → /build-request

/rwa-readiness
  ↓ CTA: "Request RWA Readiness Packet" → /build-request?type=rwa

/build-request
  → Form: name, email, client type, system type, problem, budget, timeline, branding, notes
  → POST /api/build-request (endpoint to wire when backend is live)
  → Shows success state on submit (404-tolerant for static deploy)
```

---

## Pricing Shown

| Offer | Price |
|---|---|
| System Architecture Review | $2,500 – $5,000 |
| MVP Build Sprint | $7,500 – $25,000 |
| RWA Readiness Packet | $7,500 – $15,000 |
| Bank / Institutional Packet | $25,000 – $75,000 |
| White-Label Infrastructure | Custom |
| Monthly Systems Retainer | $10,000 – $30,000/mo |

---

## What Needs To Be Done To Go Live

### 1. Create GitHub repo and push

```powershell
Set-Location "C:\Users\Kevan\portfolio-unykorn"
git init
git add .
git commit -m "init: portfolio.unykorn.org client funnel"
git remote add origin https://github.com/FTHTrading/portfolio-unykorn.git
git push -u origin main
```

> Create `FTHTrading/portfolio-unykorn` as a new **private** repo on GitHub first.

### 2. Deploy to Cloudflare Pages

```
Dashboard → Pages → Create Project → Connect Git → FTHTrading/portfolio-unykorn
Build command:     node scripts/build.js
Output directory:  / (root — static site, files are at root level)
```

Or deploy manually:

```powershell
npx wrangler pages deploy . --project-name portfolio-unykorn
```

### 3. Set DNS for portfolio.unykorn.org

In Cloudflare DNS for `unykorn.org`:

```
CNAME  portfolio  portfolio-unykorn.pages.dev  (proxied)
```

### 4. Wire the build request form API

The form POSTs to `/api/build-request`. For the static Cloudflare Pages deploy, add a
**Cloudflare Function** at `functions/api/build-request.js`:

```js
// functions/api/build-request.js
export async function onRequestPost({ request, env }) {
  const body = await request.json();
  // Forward to Telegram bot or needai queue
  // e.g. POST to http://localhost:3000/api/ops/queue/ via internal tunnel
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
```

Or use a Cloudflare Worker that routes submissions to the Telegram operator bot or
the Ada queue endpoint.

### 5. Optional: Stripe live checkout

Once live Stripe keys are configured in the RWA system, add a `/api/checkout` endpoint
that creates a Checkout Session and redirects the client to Stripe.

---

## Disclaimer Integration (All Pages)

Every page includes:

> Architecture and readiness assessments only. Not legal, tax, investment, securities,
> banking, or financial advice. Attorney, auditor, and lender review required.

The `/rwa-readiness` page includes a prominent "What It Is Not" section with a red-bordered notice.
The `/build-request` form includes a notice below the submit button.
The build validator checks for the disclaimer on every page.

---

## Design

- **Background:** `#080c10` (near-black)
- **Accent:** `#c8a84b` (gold)
- **Signal:** `#3fbca8` (teal)
- **Font:** Space Grotesk (Google Fonts)
- **Mobile:** Responsive nav with hamburger, grid layouts collapse to single column below 640px
- **No JS framework** — vanilla JS only, minimal (nav + form only)
- **No external CSS framework** — custom CSS in `styles.css`

---

## Revenue Path (Connected to RWA MVP)

```
/build-request form submit
  → Operator receives in Telegram OR Ada queue
  → Scope call → proposal sent
  → Client pays (Stripe test → live)
  → rwa-realestate intake flow runs
  → Report delivered via manifest
  → Human review gate (Bank Packet)
  → Packet delivered to client
```

The `portfolio-unykorn` site is the top of this funnel.
The `rwa-realestate` MVP (`c10cf6b`) is the delivery engine.

---

*Generated 2026-05-12. Not legal, tax, investment, or financial advice.*
