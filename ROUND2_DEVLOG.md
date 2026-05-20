# Round 2 Devlog

## 2026-05-20 10:00 — Start
Received Round 2 assignment. Read carefully. 4 features needed:
1. Persistent audit storage with pricing snapshot
2. Pricing-change detection endpoint
3. Notification emails via Resend
4. Diff view on re-run

Plan: build in order. Start with DB schema, then API, then UI.

## 2026-05-20 17:31 — Setup
Created round-2-reaudit branch. Installed Resend. Added pricing_snapshot
and user_email columns to audits table via Supabase SQL editor.
Created all new files: lib/resend.ts, app/api/detect-changes/route.ts,
app/audit/[id]/diff/page.tsx

## 2026-05-21 03:35 — Building
Updated app/api/audit/route.ts to save pricing snapshot with every audit.
Built lib/resend.ts with sendPricingChangeEmail function.
Built /api/detect-changes — fetches all audits with emails, re-runs audit
engine with current pricing, compares recommendations, sends consolidated
email per user if anything changed.
Built diff view page at /audit/[id]/diff showing old vs new side by side.

## 2026-05-21 — Testing
Running npm run dev to test full flow locally before deploying.