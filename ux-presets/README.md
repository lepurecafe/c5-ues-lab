# UX Preset Registry

> **UES compatibility:** `0.5.0-draft`  
> **Purpose:** turn the UES UX Preset family into reusable, testable behavioral contracts. A preset changes information architecture and interaction policy; it never supplies product data, legal policy, brand expression, or component styling.

## Registry

| ID | Goal shape | Primary commitment | Canonical contract | Status |
| --- | --- | --- | --- | --- |
| `decision.reserve` | one suitable option, quickly | commit one valid candidate | [Reserve](decision.reserve.md) | experimental |
| `decision.compare` | make a defensible choice among a small set | choose and commit a winner | [Compare](decision.compare.md) | experimental |
| `decision.plan` | make a feasible multi-object arrangement | commit a valid composition | [Plan](decision.plan.md) | experimental |

## Shared operating contract

Every preset document must declare these items. Product-specific values belong in the Product Binding; visual treatment and component anatomy belong in the Design Pack.

| Contract area | Required declaration |
| --- | --- |
| Goal and commitment | primary task, dominant decision aid, commit point, result evidence |
| State and retention | source state, derived consequences, Back/Cancel/Retry/Resume/Exit retention policy |
| Authority | what is a system recommendation, user draft, user commitment, confirmed outcome, or unavailable fact |
| Recovery | invalid input, empty result, loading/partial/stale data, failure, permission, conflict, interruption |
| Capability floor | semantic capabilities a Design Pack and Medium Adapter must express |
| Test suite | minimum success and edge cases; implementation evidence remains separate |
| Evidence | source, status, limits, and promotion requirements |

## Common authority vocabulary

| Term | Meaning |
| --- | --- |
| `system-recommendation` | calculated proposal; never a user commitment |
| `user-draft` | reversible user intent not yet committed |
| `user-commitment` | user confirmed an action; may still await execution |
| `confirmed-outcome` | system has evidence that the commitment completed |
| `unavailable-or-invalid` | cannot currently be selected or committed; reason and repair path are required |

No projection may display these as the same state. A recommendation can prefill a draft only if the user can identify it, inspect its basis where material, and change it before commitment.

## Common retention vocabulary

| Event | Minimum policy |
| --- | --- |
| Back | retain safe, relevant draft unless leaving would make it misleading; explain any reset |
| Cancel | stop uncommitted work; retain or discard the draft according to declared cost and privacy policy |
| Retry | preserve input and last known safe context; prevent duplicate side effects |
| Resume | restore context only when identity, freshness, and authority remain valid |
| Exit | state whether draft is saved, discarded, or recoverable later; do not imply a commitment occurred |

## Promotion rule

These files are experimental contracts. Promote a preset to `validated` only after it has been exercised in at least two Product Bindings and two materially different Design Packs or Medium Adapters, with documented semantic, accessibility, and representative-use evidence. A visually successful preview is not enough.

## Using a preset in a composition

```yaml
composition:
  ux_preset: decision.compare
  ux_preset_version: 0.1.0
  product_binding: product.binding.id
  design_pack: pack.id
  medium_adapter: medium.id
  compatibility: supported|supported-with-adaptation|limited|blocking
```

The composition must separately record Design Pack capability mappings, medium losses, assumptions, and runtime evidence.
