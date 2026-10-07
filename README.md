# portfolio-unykorn

Client-facing portfolio and services site for **portfolio.unykorn.org**

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/services` | `services/index.html` |
| `/systems` | `systems/index.html` |
| `/systems/troptions` | `systems/troptions/index.html` (Turnkey Exchange Infrastructure — Sale · Lease · SaaS) |
| `/command-center` | `command-center/index.html` |
| `/developer` | `developer/index.html` (Quant API Portal & Docs — Access Gate: `12345`) |
| `/rwa-readiness` | `rwa-readiness/index.html` |
| `/build-request` | `build-request/index.html` |
| `/blockchain-fraud` | `blockchain-fraud/index.html` (Blockchain Fraud forensic intelligence — free scam checks, flat-fee tracing) |
| `/data/troptions-catalog.json` | TROPTIONS machine catalog |

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
