# Reflection

## 1. The Hardest Bug

The worst one was when the results page kept showing 404 even though I could see in the terminal that the audit was being saved to Supabase. The UUID was right there in the logs. The data existed. But the page just wouldn't load.

I spent a while thinking it was a Supabase query problem. Checked the database directly — data was there. Then I thought maybe the redirect URL was wrong — console.logged it, looked fine. Then I thought maybe the folder structure was
wrong for the dynamic route.

Turned out it was none of those things. Next.js 16 changed how dynamic route params work — `params` is now a Promise and you have to await it before accessing `params.id`. I was writing `params.id` directly which threw a silent error. The fix was two lines. But finding it took way longer because I was
looking in the wrong places.

What I learned: read the actual error message carefully before assuming it's a data problem. The terminal literally said "params is a Promise" — I just didn't read it properly the first time.

---

## 2. A Decision I Reversed

On Day 2 I built the results page to just read from localStorage. No database, no API, no backend. It worked, it was fast, I was happy with it.
Then I realized — if everything is in localStorage, the URL is always `/audit`. Everyone who opens that link sees their own results, not yours. You can't share it. The "Copy link" button I was planning to add would be completely useless.
The shareable URL was a core requirement. I had to redo it properly — API route, Supabase, dynamic routing. Took about 3 hours to replace something that took 30 minutes to build originally.
I was a bit frustrated because it felt like going backwards. But it was the right call. Without a shareable URL the whole viral loop doesn't exist and the tool is just a calculator that nobody can share.

---

## 3. What I'd Build in Week 2

The user interviews showed me something I didn't expect — all three people said they wouldn't trust a free tool's recommendation without verifying it themselves. That surprised me. I assumed showing savings numbers would be
enough.
So week 2 would start there. Add pricing source links directly on each card so users can click and verify. Add a small "how we calculated this" section. Make the tool feel like it's showing its work rather than just telling you what to do.

After that — the email. Right now the lead capture saves the email to Supabase but no confirmation email goes out. Resend integration is half done. A proper email with the full audit summary would make people actually remember the tool
and share it. And then the embeddable widget if time allowed — a script tag version that newsletter writers could drop into their posts. That's the kind of passive distribution that compounds.

---

## 4. How I Used AI Tools

Used Claude throughout the week as a coding partner. Scaffolding components, writing API routes, debugging errors, drafting the markdown files like GTM and ECONOMICS.

What I didn't use it for: the pricing numbers in the audit engine — I checked every figure against the actual vendor pricing pages myself because wrong numbers would destroy the tool's credibility. The user interviews are real conversations, real quotes. And these reflection answers are my actual experience, not generated.

One time it was wrong: Claude gave me `params: { id: string }` for the dynamic route — that's Next.js 15 syntax. It caused the 404 bug I described above.
I caught it because the terminal error message specifically said "params is a Promise" which contradicted what the code was doing. Had to look up the Next.js 16 migration docs to confirm the fix.

---

## 5. Self-Rating

| Dimension | Rating | Reason |
|---|---|---|
| Discipline | 7/10 | Committed on 5 days, kept the devlog, but some days were reactive — fixing things that broke rather than building what I planned |
| Code Quality | 6/10 | TypeScript throughout, reasonably clean components, but the audit engine has repetition and I'd refactor it with more time |
| Design Sense | 7/10 | Clean and readable but I didn't test mobile properly and the results page could be visually stronger |
| Problem Solving | 8/10 | Debugged the params bug step by step, fixed CI failures the same day, adapted when the Anthropic API needed paid credits |
| Entrepreneurial Thinking | 7/10 | The GTM and economics show real thinking, and the trust insight from interviews actually changed the design — but I'd want more time to validate the assumptions |