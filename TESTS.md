# Tests

_Tests will be written on Day 5 covering the audit engine.
Minimum 5 tests required, all must pass._

## Planned Test Cases

1. Cursor Business 2 seats → should flag overspend, recommend Pro
2. GitHub Copilot Business 2 seats → should flag overspend, recommend Individual
3. Claude Max for writing use case → should recommend Pro downgrade
4. All optimal plans → total savings should be 0
5. Multiple tools mixed → total savings should sum correctly

## How to Run
```bash
npm test
```