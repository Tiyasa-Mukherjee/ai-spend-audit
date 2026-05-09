# Prompts

## Anthropic API — Personalized Audit Summary

_Full prompt will be added after API integration is built (Day 4)._

## Design Decisions
- The audit math itself uses zero AI — hardcoded rules only
- AI is used only for the ~100 word summary paragraph
- Fallback to templated summary if API fails or rate limits