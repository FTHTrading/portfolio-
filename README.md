# portfolio-unykorn

Client-facing portfolio and services site for **portfolio.unykorn.org**

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/services` | `services/index.html` |
| `/rwa-readiness` | `rwa-readiness/index.html` |
| `/build-request` | `build-request/index.html` |
| `/systems` | `systems/index.html` |

## Local dev

```bash
node scripts/serve.js   # http://localhost:4000
```

## Build

```bash
npm run build   # validates all pages exist with required content markers
```

## Deploy

Cloudflare Pages — build command: `node scripts/build.js`, output: root `/`

DNS: `CNAME portfolio portfolio-unykorn.pages.dev` in Cloudflare for `unykorn.org`

## Disclaimer

Architecture and readiness assessments only. Not legal, tax, investment, securities,
banking, or financial advice. Attorney, auditor, and lender review required.
