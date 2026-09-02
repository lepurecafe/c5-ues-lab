# Rasterline Components

Each component keeps its **semantic role** independent from its visual variant. A visual variant must not silently change action cost, validation, selection, or recovery behavior.

## Button

**Observed variants:** `Primary`, `Secondary`, `Ghost`, `Accent`, `Danger`  
**Observed sizes:** `Small`, `Medium`, `Large`  
**Observed states:** `Disabled`, `Disabled Accent`

| Variant | Semantic use | Constraint |
| --- | --- | --- |
| Primary | one safe next action within a local region | use one dominant primary action per decision moment |
| Secondary | valid alternative or lower-priority action | must remain clearly actionable |
| Ghost | low-emphasis utility/navigation | never hide destructive or irreversible action here |
| Accent | bounded signal action or current active emphasis | avoid multiple simultaneous accent CTAs |
| Danger | destructive/high-cost action | requires prevention and a proportionate undo or confirmation path |

**Anatomy:** optional status/icon, concise action label, visible state treatment, focus treatment, disabled explanation when a required condition is missing.

## Badge and label

**Observed variants:** `Default`, `Accent`, `Muted`, `Error`, `Success`, `Outline`; source examples include numeric markers and step numbers.

- Use badges for compact categorical state, counts, short status, or system labels.
- Always make the badge’s meaning available in nearby text or an accessible name.
- Numeric badges do not replace an explanation of what the count represents.

## Card

| Variant | Observed treatment | Appropriate use |
| --- | --- | --- |
| Basic `[A-01]` | no texture | dense content and default operational grouping |
| Halftone `[A-02]` | halftone-dot overlay | non-critical feature group or atmospheric callout |
| Grid + Accent `[A-03]` | grid texture plus accent border | active, selected, or deliberately highlighted group |

Cards group information; they must not conceal an essential action, validation, or recovery control behind a decorative treatment.

## Input

**Observed forms:** basic text, prefixed text (`https://`), error, hint, select, textarea.

| State | Required expression |
| --- | --- |
| Resting | visible label and expected input form |
| Hint | concise format/example guidance linked to the input |
| Error | field-specific cause plus repair guidance; preserve safe input |
| Prefix | clarify whether the prefix is fixed or editable |
| Select | current value or explicit empty choice; options remain readable |

Example source language includes: “이 필드는 필수입니다” and “영문 소문자와 숫자만 사용.” Keep such constraints adjacent to the input they govern.

## Progress indicator

**Observed examples:** percentage (`42%`), fraction (`3/8`), and delta (`−10`, `+10`).

Use a progress indicator when it answers one of these questions: what is happening, how much is complete, what remains, or whether a measured condition has changed. Pair visual fill with an accessible text value.

## Divider

**Observed forms:** section label and `OR` separator.

Dividers establish an information boundary. They must not imply a disabled or unavailable path unless that state is explicitly labeled.

