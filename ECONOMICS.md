# Unit Economics

## What a Converted Lead Is Worth to Credex

Credex sells discounted AI infrastructure credits. Assume:
- Average deal size: $2,000 in credits purchased
- Gross margin on credits: ~30% (conservative for resold credits)
- Gross profit per customer: $600
- Average customer buys credits 3x over their lifetime
- LTV: $600 × 3 = **$1,800 per converted customer**

This is conservative. A 20-person engineering team buying Cursor
Enterprise credits could be a $10,000+ deal.

## CAC at Each GTM Channel

| Channel | Estimated CAC | Basis |
|---|---|---|
| Hacker News Show HN | ~$0 | Organic, time cost only |
| Reddit posts | ~$0 | Organic, time cost only |
| Twitter/X cold DM | ~$5 | Time cost at $50/hr, 10 min per DM |
| Newsletter sponsorship | ~$200 | $1000 CPM, 0.5% conversion |
| Paid Twitter ads | ~$150 | $3 CPC, 2% audit→lead conversion |

Organic channels dominate early. The audit tool itself is the
acquisition mechanism — CAC is near zero when users share their
results.

## Conversion Funnel Math

Working backwards from data on similar B2B lead-gen tools:
Landing page visitors:        1,000
→ Audit started (60%):          600
→ Audit completed (80%):        480
→ Email captured (20%):          96
→ Credex intro email sent:       96
→ Consultation booked (10%):      9
→ Credits purchased (40%):        4
→ Revenue per month:          ~$8,000

At these conversion rates, the tool pays for itself with
**4 customers per month** from 1,000 visitors. Vercel hosting
is free at this scale. Supabase free tier handles 50,000 rows.
Anthropic API cost per audit: ~$0.002 (100 word summary,
claude-haiku). Total marginal cost per audit: effectively $0.

## What Makes This $1M ARR in 18 Months

$1M ARR = ~$83K/month in credit sales.
At $2,000 average deal: **42 new customers per month.**

Working backwards from the funnel above:
- Need ~10,500 landing page visitors/month
- At Hacker News scale (5,000 visits per launch) + organic sharing:
  achievable with 2 viral posts per month
- The shareable URL feature compounds this — each shared audit
  result brings back 0.3 new visitors on average (conservative)
- At 480 audits/month completed, viral coefficient of 0.3 means
  144 additional visitors per month from sharing alone

**What has to be true:**
1. Audit quality is high enough that users trust and share results
2. Credex consultation → purchase rate stays above 40%
3. Average deal size grows as Credex lands larger teams
4. 2–3 distribution events per month (HN, Reddit, newsletter)

This is aggressive but not unrealistic for a tool with $0 CAC
on organic channels and a built-in viral loop.

## The Honest Risk

If Credex consultation → purchase conversion is below 20%,
the funnel breaks. The fix is sales process improvement, not
more top-of-funnel. That's the number to watch in month 1.