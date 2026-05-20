# Round 2 Devlog

## 2026-05-20 10:00 - Start
Received Round 2 assignment. Read carefully. 4 features needed:
1. Persistent audit storage with pricing snapshot
2. Pricing-change detection endpoint
3. Notification emails via Resend
4. Diff view on re-run

Plan: build in order. Start with DB schema, then API, then UI.

## 2026-05-20 17:31 - Setup
Created round-2-reaudit branch. Installed Resend. Added pricing_snapshot
and user_email columns to audits table via Supabase SQL editor.
Created all new files: lib/resend.ts, app/api/detect-changes/route.ts,
app/audit/[id]/diff/page.tsx

## 2026-05-20 17:45 - DB schema done
Supabase ALTER TABLE ran successfully. Two new columns added to audits:
pricing_snapshot JSONB and user_email TEXT. Ready to wire up in API.

## 2026-05-20 18:30 - Research
Researched Resend API docs to understand how to send HTML emails.
Decided to use onboarding@resend.dev as sender since custom domain
not set up. Documented this limitation in ROUND2_PR.md risks section.

## 2026-05-20 19:00 - Break
Took a break. Assignment explicitly said don't all-nighter.
Resumed later in the night.

## 2026-05-21 00:00 - Resumed
Back to building. Started writing lib/resend.ts and the detect-changes
logic. Decided to compare recommendedAction text strings to detect changes
- simple but defensible for this scope.

## 2026-05-21 01:00 - Blocker on comparison logic
Spent time understanding how to compare old vs new recommendations.
Old results come back from Supabase as plain JSON, not typed objects.
Used type assertions to work around this - noted as a fragility in
ROUND2_PR.md open questions.

## 2026-05-21 02:00 - Diff view UI
Built the diff view page at /audit/[id]/diff. Decided on orange highlight
for changed rows, collapsed grey for unchanged. Total savings delta shown
as headline. Back to original audit button at bottom.

## 2026-05-21 03:00 - Integration and wiring
Wired email field into SpendForm. Hit useState outside component bug -
useState was at module level. Fixed by moving inside SpendForm function.
Updated /api/audit/route.ts to save pricing_snapshot and user_email.

## 2026-05-21 03:35 - Core features complete
All 4 features built. Updated ROUND2_PR.md and ROUND2_REFLECTION.md.

## 2026-05-21 04:00 - Full flow tested locally
Tested end to end on localhost:3000.
- Submitted audit with GitHub Copilot Business 2 seats plus email
- Results page loaded correctly
- GET /api/detect-changes returned auditsChecked: 1, emailsSent: 0 - correct, pricing unchanged
- Diff view at /audit/[id]/diff rendered correctly showing No change in savings
All 4 features working end to end.

## 2026-05-21 04:10 - PR created and deployed
Created PR on GitHub from round-2-reaudit into main. Left open, not merged.
Vercel auto-deployed preview branch. Updated RESEND_API_KEY in Vercel
with real key. Redeployed preview.
Preview URL: https://ai-spend-audit-git-round-2-reaudit-tiyasa-mukherjees-projects.vercel.app

## 2026-05-21 04:20 - Submitting
All deliverables ready. Submitting Round 2 form now.