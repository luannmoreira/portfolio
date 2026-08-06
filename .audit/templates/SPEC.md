# SPEC-<NNN> · <title>

**Findings:** AUDIT-042, A11Y-007 · **Severity:** Critical · **Effort:** S · **Wave:** 1

## Problem

What is wrong, with `file:line` evidence. No solution here.

## Why it matters

User impact or risk. If you cannot write this, the item is not worth doing.

## Scope

**In:** files and behaviors that change.
**Out:** what explicitly does NOT change in this spec (prevents scope creep).

## Approach

Technical direction in 3–8 steps. Not finished code — the decision, already made.

## Acceptance criteria

Verifiable by command or test. One checkbox each.

- [ ] `pnpm --filter blog exec playwright test contact-modal -g "focus trap"` passes
- [ ] axe reports 0 critical violations on /contact in both themes
- [ ] `pnpm --filter blog typecheck && lint && build` green

## Test plan

New test (file + scenario) and existing tests that must stay green.

## Risk and rollback

Regression risk: low/medium/high + what could break.
Rollback: `git revert <sha>` — no migration, no data change.

## Notes

Alternatives considered and rejected, with reasons.
