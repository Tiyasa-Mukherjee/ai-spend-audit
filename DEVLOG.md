## Day 1 — 2026-05-06

**Hours worked:** 1

**What I did:**
- Read and understood the Credex assignment in full
- Created GitHub repository using GitHub Desktop
- Initialized project with README
- Planned initial approach and evaluated tech stack options

**What I learned:**
- This is more of a product + entrepreneurial assignment than pure coding
- Commit discipline and daily logging are evaluated as seriously as the code

**Blockers / what I'm stuck on:**
- Choosing final tech stack

**Plan for tomorrow:**
- Set up Next.js project
- Start UI structure

---

## Day 2 — 2026-05-08

**Hours worked:** 4

**What I did:**
- Fixed README.md filename (was README.md.txt)
- Scaffolded Next.js 15 project with TypeScript and Tailwind
- Wrote proper README.md with Decisions section, setup instructions, and environment variables
- Locked final tech stack: Next.js + TypeScript + Tailwind + Supabase + Anthropic API + Resend
- Installed shadcn/ui with Nova preset and added button, input, label, select, card, badge, progress components
- Created types/index.ts with all TypeScript interfaces (ToolEntry, AuditInput, AuditResult, etc.)
- Built lib/auditEngine.ts with hardcoded audit logic for all 8 tools
- Built components/ToolRow.tsx - single tool input row with tool/plan/spend/seats fields
- Built components/SpendForm.tsx - full form with localStorage persistence, add/remove tools
- Updated app/page.tsx with hero section and form integration

**What I learned:**
- create-next-app conflicts with existing files - moved them temporarily to resolve
- Hardcoded audit rules are the right call - AI hallucinating savings numbers would destroy trust
- localStorage persistence means users don't lose their form data on refresh

**Blockers / what I'm stuck on:**
- Form is working but audit results are only logged to console — results page not built yet

**Plan for tomorrow:**
- Build audit results page
- Set up Supabase for lead storage
- Wire up Anthropic API for AI summary
- Set up shareable URL system

## Day 3 — 2026-05-09

**Hours worked:** 5

**What I did:**
- Set up Supabase project with audits, leads, rate_limits tables
- Built /api/audit route — runs audit engine, saves to Supabase, calls Anthropic API
- Built /api/leads route — saves email captures
- Built app/audit/[id]/page.tsx — server component with dynamic routing
- Built AuditResults component with per-tool breakdown, email capture, share link
- Fixed params Promise issue in Next.js 16 dynamic routes
- Fixed SpendForm import path issue
- Full audit flow working end to end — form → API → Supabase → shareable results page

**What I learned:**
- Next.js 16 requires params to be awaited as a Promise in server components
- Anthropic API needs API key in .env.local — fallback summary works without it
- The audit was being saved correctly even when the results page was 404ing

**Blockers / what I'm stuck on:**
- Anthropic API key not set yet — using fallback summary
- Need to add Anthropic API key to get real AI summaries

**Plan for tomorrow:**
- Get Anthropic API key and add to .env.local
- Set up GitHub Actions CI/CD
- Write 5+ tests for audit engine
- Deploy to Vercel

## Day 4 — 2026-05-10

**Hours worked:** 2

**What I did:**
- Installed Jest and ts-jest for testing
- Written 6 automated tests for the audit engine — all passing
- Set up GitHub Actions CI pipeline (.github/workflows/ci.yml)
- Added Supabase secrets to GitHub repository
- Fixed tsconfig.json to include Jest types
- Attempted Anthropic API key setup — requires $5 minimum credits, using fallback summary

**What I learned:**
- Jest needs ts-node for TypeScript config files — switched to jest.config.js instead
- GitHub Actions secrets keep credentials out of the codebase
- VS Code TypeScript errors and actual test failures are different things — tests passed despite VS Code showing errors

**Blockers / what I'm stuck on:**
- Anthropic API key requires paid credits — fallback summary working fine
- CI build step may fail if env vars not properly set

**Plan for tomorrow:**
- Deploy to Vercel
- Update TESTS.md and PROMPTS.md with real content
- Do user interviews
- Update README with screenshots

## Day 5 — 2026-05-11

**Hours worked:** 3

**What I did:**
- Deployed to Vercel — live at https://ai-spend-audit-tan.vercel.app
- Added all environment variables to Vercel
- Confirmed full audit flow works in production
- Updated README with live deployment URL
- Completed TESTS.md with all 6 test cases documented
- Completed PROMPTS.md with full prompt and reasoning
- Started user interview outreach

**What I learned:**
- Vercel deployment with Next.js is seamless — Import .env feature saves time
- Production environment works identically to local

**Blockers / what I'm stuck on:**
- User interviews not done yet — need 3 real conversations before 13th May
- REFLECTION.md still needs real answers from the week

**Plan for tomorrow:**
- Complete all 3 user interviews
- Write USER_INTERVIEWS.md
- Write REFLECTION.md
- Take screenshots for README
- Final polish and submission prep

## Day 6 — 2026-05-12

**Hours worked:** 4

**What I did:**
- Deployed to Vercel successfully — live at https://ai-spend-audit-tan.vercel.app
- Completed USER_INTERVIEWS.md with 3 real interviews
- Completed REFLECTION.md with all 5 questions
- Updated TESTS.md and PROMPTS.md with real content
- Removed auto-generated AGENTS.md and CLAUDE.md files
- Confirmed all 12 required markdown files present
- Confirmed 6 distinct commit days
- Full audit flow tested on production — working end to end

**What I learned:**
- All 3 interviewees said they wouldn't trust a free tool without self-verifying — trust is the real barrier, not awareness
- Regional pricing (INR vs USD) is a gap in the current audit engine

**Blockers / what I'm stuck on:**
- Resend email not configured — lead capture saves but no confirmation email sent
- Lighthouse scores not checked yet

**Plan for tomorrow:**
- Check Lighthouse scores
- Final submission
