## What this PR does
Adds a "Re-audit on Pricing Change" system to the AI Spend Audit tool. When AI tool pricing changes, users who submitted their email are automatically notified with a consolidated email showing what changed and a one-click link to see their updated audit side-by-side with the original.

## Why
A one-time audit goes stale. Cursor raised prices in 2024, Claude added new tiers in 2025. Stale audits are worse than no audit - they give users false confidence. This PR makes audits live.

## How it works
1. Every audit now saves a `pricing_snapshot` (the exact pricing data used) and `user_email` to Supabase alongside the existing audit data
2. `POST /api/detect-changes` fetches all audits with emails, re-runs the audit engine with current pricing, compares recommendations - if anything changed, sends one consolidated email per user via Resend
3. Email contains what changed, how it affects their previous audit, and a clickable re-run link
4. `/audit/[id]/diff` shows the original audit vs new audit side-by-side with changed rows highlighted in orange and unchanged rows collapsed

Trigger: manual `POST /api/detect-changes` endpoint. Could be scheduled via GitHub Actions cron or Vercel Cron in production.

## What I cut
- **Unsubscribe link in email** - needed a separate DB table and token system. Not worth the 36h time cost vs shipping the diff view cleanly.
- **Automated cron scheduling** - Vercel Cron requires Pro plan. Used manual endpoint instead, documented the tradeoff.
- **Admin dashboard** - bonus feature, cut to protect core flow quality.
- **Tests for detect-changes** - Round 1 audit engine has 6 tests. The detection logic has zero. I chose to ship working end-to-end functionality and document this gap honestly.

## How to test it manually
1. Go to https://ai-spend-audit-tan.vercel.app
2. Submit an audit with any tool - enter your email in the email field
3. After seeing results, note the audit URL (contains UUID)
4. POST to /api/detect-changes - returns audits checked and emails sent
5. To see the diff view: visit /audit/[your-uuid]/diff
6. To simulate a pricing change: modify a price in lib/auditEngine.ts PRICING object, redeploy, then trigger /api/detect-changes

## What's tested
- Round 1: 6 automated tests on audit engine (npm test)
- Round 2: manual end-to-end testing of full flow
- No new automated tests written due to time constraint - would add detect-changes unit tests first if given more time

## Open questions / risks
- The detect-changes endpoint has no auth - anyone can POST to it and trigger emails. In production this needs a secret token or cron-only access.
- Resend free tier limits 100 emails/day - fine for this stage, needs upgrade at scale.
- Pricing snapshot comparison relies on recommendation text matching - fragile if recommendation copy changes slightly without pricing changing.