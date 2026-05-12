# Prompts

## Anthropic API — Personalized Audit Summary

### Full Prompt
You are an AI spend advisor. Write a 2-3 sentence personalized summary for a startup audit result. Be specific, honest, and actionable.
Do not use generic phrases.
Team size: {teamSize} people
Primary use case: {useCase}
Tools audited: {tools}
Total monthly savings found: ${totalMonthlySavings}
Total tools overspending: {overspendingCount} of {totalCount}
Write the summary directly, no preamble.

### Why This Prompt
- Explicit instruction to avoid generic phrases - prevents "As an AI advisor..." openings
- Specific numbers passed in context - forces personalization
- Short output requested (2-3 sentences) - keeps it scannable on results page
- "No preamble" instruction - removes filler text

### What I Tried That Didn't Work
- Longer prompts asking for bullet points - output was too verbose for the results page
- Asking for "encouraging" tone - produced sycophantic results that felt fake

### Fallback
If Anthropic API fails (rate limit, no credits, network error), 
a templated summary is generated from the audit data directly.
This ensures the results page always shows a summary paragraph.