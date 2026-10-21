# Compound_Interest engineering guidance

<!-- ecc-engineering-defaults:start -->
## Engineering defaults
For coding work, read [.engineering/defaults.md](.engineering/defaults.md).
These are shared fallback conventions; the existing project owner, nested instructions,
skills, model choices, domain contracts and stronger verification/release gates remain authoritative.
No hooks, permissions, MCP services or background automation are installed by this guidance.

### Project adaptation
React client in `client/` with Express at the root. Use the existing lockfiles. Candidate checks: `npm --prefix client test -- --watchAll=false` and `npm run build`; the root test script is a failing placeholder, not a passing test suite. Test compound-interest rounding and invalid inputs.
<!-- ecc-engineering-defaults:end -->
