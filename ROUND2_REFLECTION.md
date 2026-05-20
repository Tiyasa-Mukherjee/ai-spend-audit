# Round 2 Reflection

## 1. Most uncomfortable trade-off due to time pressure

I skipped writing automated tests for the new detect-changes logic. The
audit engine already has 6 tests from Round 1, but the pricing-change
detection and email notification flow has zero test coverage. The trade-off
was: ship working end-to-end functionality with no tests, or write tests
and risk not finishing the diff view. I chose to ship. If this were
production code I'd consider that unacceptable — a bug in detect-changes
could spam users with incorrect emails.

## 2. If deadline extended 24 hours, first thing I'd do

Write a test that simulates a pricing change — mock the PRICING object with
a modified price, run detect-changes against a stored audit, and assert the
correct email content is generated. That one test would catch the most
likely failure mode: the comparison logic producing false positives or
missing real changes.

## 3. One thing Round 1 me made harder for Round 2 me

The audit results are stored as a JSONB array in Supabase but the
ToolAuditResult type includes a nested toolEntry object. When I pull results
back from the database and try to compare them with freshly-run results, the
types don't perfectly match — the DB returns plain JSON, not typed objects.
I worked around it with type assertions but it's fragile. Round 1 me should
have stored a cleaner, flatter structure that's easier to deserialize and
compare programmatically.