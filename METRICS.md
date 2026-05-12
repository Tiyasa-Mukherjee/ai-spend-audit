# Metrics

## North Star Metric
**Audits completed per week**

Why: This is a lead-gen tool. An audit completed means a user saw real
value - they inputted their stack and got a result. Everything else
(email captures, consultations booked, credits sold) flows downstream
from this. DAU is wrong for a tool people use once a quarter. Revenue
is too lagging. Audits completed is the leading indicator that the
tool is working.

## Three Input Metrics

1. **Landing page → audit started rate**
   Measures whether the hero copy and form are compelling enough to
   get visitors to engage. Target: >60%. If this is low, the problem
   is messaging or form friction, not the audit quality.

2. **Audit started → audit completed rate**
   Measures form completion. If users drop off mid-form, the input
   flow is too complex. Target: >80%. The localStorage persistence
   feature directly supports this metric.

3. **Audit completed → email captured rate**
   Measures whether the audit result is valuable enough that users
   want to save it. Target: >25% for high-savings audits (>$100/mo),
   >10% overall. This is the monetization gateway.

## What I'd Instrument First
- Pageview on `/` (landing)
- Form start event (first tool added)
- Audit submitted event (with total_monthly_savings value)
- Results page view (with audit_id)
- Email capture event
- Credex CTA click event (for >$500/mo savings cases)

Simple Posthog or Plausible setup covers all of this in under an hour.

## Pivot Trigger
If after 500 audits completed, email capture rate is below 5% AND
Credex CTA click rate is below 1%, the audit results are not
compelling enough - either the savings calculations are too
conservative, the copy on the results page isn't landing, or the
Credex offer isn't relevant to the users we're attracting.

That's the signal to run 5 user interviews immediately and
redesign the results page before continuing distribution.