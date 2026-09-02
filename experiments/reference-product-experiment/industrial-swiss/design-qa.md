# Industrial Swiss Reference Product — Design QA

## Reference and implementation

- Reference: `public/assets/selected-concept.png` — selected ImageGen concept, Supreme × Carhartt industrial-Swiss character.
- Implementation: `implementation-compare.png` — 1440 × 1024 viewport, Compare profile and Design category state.
- Side-by-side visual comparison: `design-qa-comparison.png`.
- Runtime: `http://localhost:4174` during QA.

## Visual verdict

**Passed.** The implementation retains the reference's dark workwear field, red rule and CTA, condensed industrial display hierarchy, left filter rail, poster-card browse field, and right reservation rail. The comparison uses the same goal: compare two sessions after narrowing to Design.

Deliberate adaptation: the `EXPERIMENT AXIS 02` strip makes the three Goal Profiles visible so this reference product can test the requested second experiment axis. It is not part of the source concept, but it changes product behavior rather than merely decorative chrome.

## Focused checks

| Region | Result |
| --- | --- |
| Header / primary hierarchy | Pass — wordmark, search, progress path, red divider and condensed type hierarchy preserved. |
| Browse anatomy | Pass — filter rail → card field → selection rail remains the dominant three-column arrangement. |
| Session cards | Pass — 4-column poster rhythm, high-contrast imagery, seat scarcity and selected red state preserved. |
| Goal Profile semantics | Pass — Reserve is one selection; Compare starts with two selections and compare-specific heading/CTA; Plan starts with a two-session weekend plan and allows three selections. |
| States / recovery | Pass — Loading, empty, error messaging, filter reset, clear selection, hold, email validation and booking confirmation are operable. |
| Accessibility basics | Pass — semantic headings, labeled controls, visible selected states, checkbox controls, live feedback and invalid-email alert are present. |
| Console health | Pass — no error-level console entries after interaction testing. |

## Functional evidence

- `COMPARE` changed the heading to `COMPARE THE FIELD` and prepared two selected workshops.
- `PLAN` changed the heading to `BUILD YOUR WEEKEND` and prepared a time-based multi-session selection.
- `EMPTY` exposed `NO SESSIONS FOUND`, whose recovery returns to the browse field.
- Reserving exposed a ticket-email field; invalid input exposed an alert; a valid address produced `MOBILE TICKET SENT`.
- Build and site-worker tests passed: 4/4.

## Follow-up learning

This result is character-faithful because component anatomy is carried by the pack: poster cards, narrow rails, condensed hierarchy, hard borders and workwear contrast. Yet the UX preset still needs a more explicit machine-readable adapter contract before the same product is generated for the other two characters. The next pass should make the differences in navigation, comparison representation, density, recovery, and motion testable as tokens/rules—not only as React conditional branches.

## QA history

- 2026-08-21 — Added reservation email validation/confirmation and expanded the browse field to eight cards to match the reference card density. Final result: passed.
