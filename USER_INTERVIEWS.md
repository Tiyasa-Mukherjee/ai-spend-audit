# User Interviews

Three interviews conducted via WhatsApp text on 2026-05-12 with professionals
who actively use AI tools at work.

---

## Interview 1 — R.M., Senior Technology Consultant, Enterprise client engagements

**Date:** 2026-05-12
**Format:** WhatsApp text

**Background:** Uses Microsoft Copilot ecosystem extensively for client work.

### Direct Quotes

**On tools used:**
"I primarily utilize CoPilot for all my client engagements, particularly CoPilot Studio, Microsoft 365 CoPilot, and Azure AI Foundry."

**On spend:**
"I typically opt for the CoPilot Studio Message Pack subscription which requires a payment of approximately USD 200, providing me with a capacity of 25,000 messages. Since the capacity of 25,000 messages is quite substantial, I rarely utilize more than half of that amount per month, resulting in my monthly cost being around USD 100."

**On trusting a free audit tool:**
"No, I will conduct self-verification independently and possibly utilize other comparable tools (typically Microsoft tools or other reliable paid tools) for cross-verification."

### Most Surprising Thing
He already knows he's using only half his message capacity — effectively paying $200 for $100 worth of usage — but doesn't consider this overspending because he values the headroom. This reframes what "overspending" means: it's not just about price per feature, it's about perceived insurance value. A user paying for unused capacity isn't necessarily irrational.

### What It Changed About My Design
The audit tool should not just flag unused capacity as waste. It should ask "do you need this headroom?" before recommending a downgrade. Added a note in the audit engine reasoning: recommendations must account for intentional over-provisioning, not just usage mismatch.

---

## Interview 2 — S.K., Professional, Mid-size organization

**Date:** 2026-05-12
**Format:** WhatsApp text

**Background:** Uses a combination of ChatGPT and Gemini for work tasks.

### Direct Quotes

**On tools used:**
"I generally use combination of different AI tools such as ChatGPT, Gemini."

**On spend:**
"INR 299 monthly."

**On whether they're overpaying:**
"I believe I am with the right plan."

**On trusting a free audit tool:**
"No, I will self verify by myself and maybe through other similar kind of tools to cross verify."

### Most Surprising Thing
INR 299/month for both ChatGPT and Gemini paid versions is surprisingly low — standard paid plans cost significantly more. This suggests they may be on promotional, bundled, or regional pricing that the audit tool doesn't account for. The assumption that "paid = standard international pricing" is wrong for Indian users.

### What It Changed About My Design
The tool needs to handle regional pricing variations. Indian users may pay significantly different amounts than the USD prices in PRICING_DATA.md. Added a note to ARCHITECTURE.md about this as a known limitation and future improvement.

---

## Interview 3 — A.B., Technology Professional, Enterprise environment

**Date:** 2026-05-12
**Format:** WhatsApp text

**Background:** Power user — uses ChatGPT Pro and M365 Copilot with thorough knowledge of pricing.

### Direct Quotes

**On tools used:**
"Yes. All of them."

**On spend:**
"ChatGPT = INR 399/month, M365 Copilot = USD 30/month."

**On whether they're overpaying:**
"I am not overpaying, as I have analyzed pricing models and capabilities of both the platforms thoroughly."

**On trusting a free audit tool:**
"No."

### Most Surprising Thing
All three interviewees independently said they would NOT trust a free tool's recommendation and would self-verify. This was consistent across different levels of technical sophistication. The assumption that "showing savings = instant trust" is wrong. Trust is the actual barrier, not awareness of overspending.

### What It Changed About My Design
The results page needs to show its work — not just "you could save $X" but "here's exactly why, here's the pricing source, here's the date we verified it." Added source citations to each recommendation card and a "How we calculate this" section. The Credex consultation CTA also needs reframing — instead of "book a consultation" it should say "verify these savings with a Credex expert" which matches how these users already think.