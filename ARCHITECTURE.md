# Architecture

## What I Built
AI Spend Audit is a Next.js web app that takes a startup's AI tool spend as input
and returns a defensible audit showing overspend, recommendations, and savings.

## System Diagram

```mermaid
graph TD
    A[User fills spend form] --> B[SpendForm.tsx]
    B --> C[localStorage persistence]
    B --> D[POST /api/audit]
    D --> E[auditEngine.ts - hardcoded rules]
    D --> F[Anthropic API - summary paragraph]
    D --> G[Supabase - save audit + lead]
    D --> H[Resend - transactional email]
    E --> I[AuditResult object]
    F --> I
    I --> J[Unique audit ID generated]
    J --> K[/audit/id - results page]
    K --> L[Lead capture form]
    L --> G
```

## Data Flow
1. User enters tools, plans, spend, seats, team size, use case in the form
2. On submit, form state is POSTed to `/api/audit`
3. `auditEngine.ts` runs hardcoded rules — no AI involved in the math
4. Anthropic API generates a ~100 word personalized summary paragraph
5. Audit saved to Supabase with a unique UUID
6. User redirected to `/audit/[id]` — the shareable results page
7. Identifying details stripped from public URL
8. On email capture, lead saved to Supabase leads table, transactional email sent via Resend

## Why This Stack

- **Next.js 15** — App Router gives server components for API routes, easy Vercel deployment, good SEO on landing page
- **TypeScript** — Audit engine has complex logic; types prevent savings calculation bugs
- **Tailwind + shadcn/ui** — Fast, accessible UI without custom CSS overhead
- **Supabase** — Postgres gives structured querying for leads; free tier generous; better than Firebase for finance-adjacent data where integrity matters
- **Anthropic API** — Assignment requirement; claude-haiku-3 keeps cost near zero per audit
- **Resend** — Simple transactional email, generous free tier, excellent Next.js integration

## Why Hardcoded Rules for Audit Logic
The audit math must be defensible to a finance person. AI hallucinating savings
numbers would destroy user trust instantly. Hardcoded rules with cited pricing
sources are auditable and explainable. AI is used only for the summary paragraph
where a wrong word doesn't cost the user money.

## What I'd Change at 10k Audits/Day
- Move audit engine to an edge function — current server component works but doesn't scale
- Add Redis caching for pricing data — currently in-memory, fine at low scale
- Queue Anthropic API calls — rate limits become a problem at volume
- Add a pricing data refresh job — tool prices change; hardcoded values need weekly verification
- Separate the lead storage write from the audit response — user shouldn't wait for DB write