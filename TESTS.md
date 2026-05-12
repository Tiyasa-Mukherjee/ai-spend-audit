# Tests

## How to Run
```bash
npm test
```

## Test Results
6 tests, all passing. Runtime: ~0.5s

## Test File
`__tests__/auditEngine.test.ts`

| Test | What it covers |
|---|---|
| Cursor Business 2 seats → downgrade to Pro | Overspend detection for small teams on Business plan |
| GitHub Copilot Business 2 seats → Individual | Correct savings calculation ($18/mo) |
| Claude Max for writing → downgrade to Pro | Use-case aware recommendations |
| Cursor Pro 1 seat → optimal | No false positives on correct plans |
| Multiple tools → total savings sum | Aggregate savings calculation accuracy |
| No negative savings | Edge case — savings floor at zero |