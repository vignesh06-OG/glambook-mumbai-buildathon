# Mumbai Salon Marketplace

City-based beauty salon discovery and booking platform — built for **SuperXgen AI Startup Buildathon 2026**.

## Live demo

<!-- TODO: Vercel deploy ke baad yahan URL paste karo -->
**Coming soon** — see [SETUP_GUIDE.md](./SETUP_GUIDE.md) for deploy steps.

## Demo video

<!-- TODO: YouTube upload ke baad link yahan -->
**Coming soon**

## Full submit guide

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** — GitHub, Vercel, video (step-by-step)
- **[SUBMISSION.md](./SUBMISSION.md)** — form text + demo script

## Features

- Landing page with Mumbai-focused branding
- Salon listings with search, area, category, and home-service filters
- Salon detail pages with services and pricing
- End-to-end booking flow with confirmation page
- **AI Smart Finder** — natural-language salon recommendations

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- TypeScript + Tailwind CSS
- Deploy: [Vercel](https://vercel.com)

## Getting started

```bash
cd beauty-salon-marketplace
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change city

Edit `src/lib/config.ts` and update salon data in `src/lib/salons.ts`.

## AI workflow (for submission)

| Step | Tool |
|------|------|
| Project scaffold | `create-next-app` |
| UI & components | Cursor / Claude |
| Salon copy & data | ChatGPT |
| Smart matching logic | Custom keyword + scoring (`src/lib/ai-recommend.ts`) |
| Deploy | Vercel |

## Submit checklist

- [ ] Live website link
- [ ] Public GitHub repo
- [ ] 2–3 min demo video
- [ ] Short AI tools explanation (see table above)

## Project structure

```
src/
  app/           # Pages (home, salon detail, booking)
  components/    # UI components
  lib/           # Config, data, AI recommender
```

---

Built independently from `idealabproject` — standalone buildathon repo.
