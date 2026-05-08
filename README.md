# AI Spend Audit

A free web app that helps startup founders and engineering managers instantly audit their AI tool spending — find overspend, discover cheaper alternatives, and calculate real savings.

Built as a lead-generation asset for [Credex](https://credex.rocks).

## Live Demo
_Link will be added after deployment_

## Screenshots
_Screenshots will be added as the UI is built_

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
```

## Decisions

1. **Next.js over plain React** — App Router gives us server components for API calls and easy deployment on Vercel. Better for SEO on the landing page.

2. **Supabase over Firebase** — Postgres gives structured querying for leads. Free tier is generous. Better for a finance-adjacent tool where data integrity matters.

3. **Hardcoded audit rules over AI** — The assignment correctly identifies this. Audit math must be defensible to a finance person. AI hallucinating savings numbers would be a trust killer.

4. **Anthropic API only for summary paragraph** — Keeps AI cost near zero per audit. The value is in the audit logic, not the summary.

5. **Email capture after results, never before** — Users must see value first. Gating before results kills conversion and trust.

## Tech Stack

- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (lead storage)
- Anthropic API (personalized summary)
- Resend (transactional email)
- Vercel (deployment)