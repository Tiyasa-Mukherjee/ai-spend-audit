# User Interviews

Three interviews conducted via WhatsApp text on 2026-05-12 with enterprise technology professionals who actively use AI tools at work.

---

## Interview 1 - Raja Mukherjee, Lead Enterprise Solution Architect & GIC CoE Lead - CoPilot, Power Platform & Microsoft 365

**Date:** 2026-05-12
**Format:** WhatsApp text

**Background:** Senior architect working on enterprise client engagements.
Uses Microsoft Copilot ecosystem extensively.

### Direct Quotes

**On tools used:**
"I primarily utilize CoPilot for all my engagements, particularly CoPilot Studio, Microsoft 365 CoPilot, and Azure AI Foundry."

**On spend:**
"I generally choose the CoPilot Studio Message Pack subscription, which necessitates a payment of around USD 200, granting me access to 25,000 messages. Since I seldom reach more than 2,000 messages per month, my actual monthly expenditure works out to no more than USD 20."

**On whether he's on the right plan:**
"Although there are numerous CoPilot Studio subscription plans available (such as Pay as you go / CoPilot Studio Message Pack / Tenant level license etc.), I believe that the CoPilot Studio Message Pack subscription is the most cost-effective option that I utilize."

**On trusting a free audit tool:**
"No, I will conduct self-verification independently and possibly utilize other comparable tools (typically Microsoft tools or other reliable paid tools) for cross-verification."

### Most Surprising Thing
He pays USD 200 upfront for 25,000 messages but uses fewer than 2,000 per month - technically paying for 12x more capacity than he needs. Yet he considers this the most cost-effective plan because of how the prepaid consumption model works. He's not overspending by his own logic - he's buying flexibility and headroom intentionally.
This completely reframes what "overspending" means. The tool assumes unused
capacity = waste. But for prepaid models, users are buying insurance, not
just usage. A finance person would call this overspending. An architect
managing client workloads would call it prudent planning.

### What It Changed About My Design
The audit tool shouldn't flag prepaid consumption plans the same way it
flags seat-based overspending. Future versions need to distinguish between
"paying for unused seats" (clear waste) and "buying message capacity as a
buffer" (intentional). Added this as a known limitation in ARCHITECTURE.md.

---

## Interview 2 - Aritra Ghosh, Architect (CoPilot, Power Platform & Microsoft 365)

**Date:** 2026-05-12
**Format:** WhatsApp text

**Background:** Technology architect using multiple AI tools for daily work.

### Direct Quotes

**On tools used:**
"I generally use combination of different AI tools such as ChatGPT, Gemini."

**On spend:**
"Paid version for Gemini and ChatGPT. INR 299 monthly."

**On whether he's overpaying:**
"I believe I am with the right plan."

**On trusting a free audit tool:**
"No, I will self verify by myself and maybe through other similar kind of
tools to cross verify."

### Most Surprising Thing
INR 299/month for both ChatGPT and Gemini paid versions combined is
significantly lower than standard international pricing - ChatGPT Plus alone
is $20/month (approximately INR 1,670). This suggests regional pricing,
promotional plans, or bundled subscriptions that the audit tool doesn't
account for at all.

The assumption built into the tool - that users pay standard USD pricing -
is simply wrong for a large portion of Indian users.

### What It Changed About My Design
The tool needs a "currency / region" field or at minimum a disclaimer that
pricing comparisons are based on USD rates. Indian users may be on
significantly different pricing tiers. This is a genuine gap that would
need to be addressed before launching in the Indian market, which is
actually a large part of the startup ecosystem Credex might target.

---

## Interview 3 - Sourav Paul, Architect (CoPilot, Power Platform)

**Date:** 2026-05-12
**Format:** WhatsApp text

**Background:** Senior architect, power user of multiple AI platforms.
Has independently analyzed pricing models before choosing plans.

### Direct Quotes

**On tools used:**
"Yes. All of them."

**On spend:**
"ChatGPT = INR 399/month, M365 Copilot = USD 30/month."

**On whether he's overpaying:**
"I am not overpaying, as I have analyzed pricing models and capabilities
of both the platforms thoroughly."

**On trusting a free audit tool:**
"No."

### Most Surprising Thing
All three interviewees independently said they would not trust a free
tool's recommendation without verifying it themselves. This wasn't one
person being cautious - it was a consistent pattern across three different
professionals at different seniority levels.

The assumption I started with - that showing savings numbers would be
compelling enough to drive action - is wrong. These users already think
critically about their tools. A free audit tool needs to earn trust before
it can drive behavior change, not after.

### What It Changed About My Design
The results page needs to show its work. Not just "you could save $X" but
"here's the exact pricing page we used, here's the date we verified it,
here's the reasoning." The Credex CTA also needs reframing - instead of
"book a consultation" it should say "verify these savings with a Credex
expert" which matches how these users already think about validation.

This is the most important design change that came out of the interviews.
Trust is the conversion barrier, not awareness.