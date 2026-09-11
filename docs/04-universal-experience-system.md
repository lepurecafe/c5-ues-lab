# Universal Experience System (UES)

> **Version:** 0.5.0-draft  
> **Status:** Experimental canonical foundation; not yet a validated release  
> **Purpose:** combine a reusable UX Preset with a reusable Design Pack on top of an explicit Product Binding, then project the result across media, fidelities, platforms, and implementation frameworks without semantic drift.  
> **Audience:** product teams, UX/UI designers, graphic and editorial designers, researchers, engineers, AI implementation agents, and Design Pack authors.  
> **Predecessors:** `docs/03-ux-system.md` and Universal UX System v0.1. Their useful contracts are integrated here; the original documents remain evidence and migration references.

---

## 0. System contract

UES is a medium- and brand-agnostic operating system for designing experiences.

It is the canonical source of truth for:

- the user goal and experience semantics;
- objects, constraints, states, transitions, outcomes, and recovery;
- reusable experience patterns and UX Presets;
- the boundary between experience meaning and a Design Pack;
- projection into user flows, information architecture, low-fidelity and high-fidelity artifacts;
- adaptation to digital, physical, editorial, spatial, conversational, service, and multimodal media;
- mapping to Figma, code, production frameworks, and other implementation tools;
- evidence, extension, versioning, and promotion rules.

UES does **not** prescribe one visual style, one component library, one platform, one framework, or one ideal interface. It preserves meaning while allowing expression to vary deliberately.

When sources conflict, use this order:

```text
Human need and product requirements  → what must be achieved
UES Experience Core                  → what the experience means
Product Binding                      → which objects, constraints, actors, and risks apply
UX Preset                             → how this goal is structured and behaves
Design Pack                           → how meaning is expressed
Medium and Platform Adapter           → what the medium can support
Projection definition                 → what fidelity and artifact must show
Implementation                        → how it works in the real environment
Evidence                              → whether the result is valid
```

No lower layer may silently redefine a higher layer. A visual component, framework convention, or Figma convenience cannot remove required decision, state, accessibility, validation, or recovery meaning.

### 0.1 Normative language

The keywords below define requirement strength:

- **MUST / MUST NOT** — mandatory or prohibited for a conforming definition or artifact;
- **SHOULD / SHOULD NOT** — expected unless a documented, reviewable exception is justified;
- **MAY** — optional.

Lowercase language remains explanatory unless another contract explicitly promotes it to a requirement. `Applicable` means the author must either satisfy the rule or record why it does not apply.

### 0.2 Conformance levels

Conformance is reported by layer; it is never one undifferentiated pass.

| Level | What it proves |
| --- | --- |
| Semantic | goals, objects, Steps, states, transitions, outcomes, and references are coherent |
| UX Preset | the selected Preset changes the required structure and behavior |
| Design Pack | the Pack preserves required meaning and declares capability gaps |
| Medium | translation preserves meaning or records loss and compensation |
| Projection | the artifact contains what its fidelity and purpose require |
| Adapter | required semantics and states have valid mappings or reviewed gaps |
| Runtime/production | behavior works in the real technical or physical target |
| Accessibility | applicable operation and perception have concrete evidence |
| Human-use | representative people can understand and accomplish the intended goal |

A Figma artifact MAY demonstrate Semantic, UX Preset, Design Pack, Medium, and Projection conformance. It MUST NOT be presented as Runtime, physical-use, or human-use evidence without the corresponding test.

### 0.3 Conflict and deviation resolution

When sources conflict, classify the problem before resolving it:

1. **Requirement gap:** obtain product authority or record a temporary assumption; do not turn it into a Core rule.
2. **Experience gap:** repair the product binding, flow, state, or recovery contract.
3. **Design Pack gap:** preserve the semantic requirement and add an approved expression or declare a blocking gap.
4. **Medium gap:** record the lost affordance and provide compensation or an alternate path.
5. **Adapter gap:** repair the mapping without weakening Experience meaning.
6. **Implementation defect:** align the runtime or produced artifact with the approved contracts.
7. **Core gap:** create an Extension Proposal only when existing composition cannot express the need.

Every material deviation uses one primary classification and reports static/schema, visual/Figma, runtime, accessibility, and human-use evidence separately.

---

## 1. System architecture

```text
User Goal
  ↓
Experience Core
  ├─ Objects and constraints
  ├─ Flow, state, transition, outcome
  ├─ Step, primitive, pattern
  └─ invariants and accessibility floor
  ↓
Experience Definition
  └─ required Product Binding
  ↓
UX Preset
  ├─ flow and information architecture
  ├─ interaction, disclosure, and commitment policy
  └─ validation, recovery, and success evidence
  ↓
Design Pack
  ├─ character and expression grammar
  ├─ information hierarchy and density
  └─ capability declaration
  ↓
Medium + Platform Adapter
  ├─ web / mobile / desktop
  ├─ book / editorial / print
  ├─ spatial / exhibition / physical
  ├─ conversational / voice / agent
  └─ service / motion / multimodal
  ↓
Projection
  ├─ user flow / IA / service blueprint
  ├─ low-fi / high-fi
  ├─ Figma / diagram / document
  └─ prototype / framework / production
  ↓
Validation and Evidence
```

### 1.1 Stability by layer

| Layer | Stability | May change frequently | Must remain explicit |
| --- | --- | --- | --- |
| Experience Core | highest | only by versioned system change | semantics, invariants, accessibility |
| Experience definition | product lifecycle | objects, constraints, task scope | goal, success, failure cost |
| UX Preset | reusable and replaceable | selected behavioral configuration | structural effect, policy, and required recovery |
| Design Pack | reusable and replaceable | character, hierarchy, expression | capability and semantic coverage |
| Medium/Platform Adapter | target-dependent | representation and input mode | preserved meaning and limitations |
| Projection | artifact-dependent | fidelity and visible detail | purpose, source version, omissions |
| Implementation | release-dependent | framework and runtime mechanics | observable behavior and evidence |

### 1.2 Canonical vocabulary

| Term | Meaning |
| --- | --- |
| **Goal** | A human outcome worth accomplishing. |
| **Experience** | The end-to-end structure that helps achieve one goal. |
| **Product Binding** | The product-specific actors, objects, constraints, authority, data, result evidence, and failure cost bound to an Experience. |
| **Object** | A meaningful thing a person views, creates, chooses, changes, or receives. |
| **Constraint** | A condition that limits valid action or interpretation. |
| **Flow** | Directed steps, branches, loops, exits, and outcomes. |
| **Pattern** | A reusable solution to a recurring experience problem. |
| **Step** | A semantic interaction or communication unit; never synonymous with a screen. |
| **Primitive** | The smallest reusable semantic unit within a Step. |
| **State** | The current condition of an object, step, region, or experience. |
| **Transition** | A move between states, steps, or outcomes. |
| **Trigger** | The event that requests a transition. |
| **Guard** | The condition that must be true for a transition to occur. |
| **Outcome** | Success, alternative, failure, cancellation, or intentional exit. |
| **UX Preset** | A reusable behavioral configuration that changes flow, information architecture, interaction policy, validation, recovery, and success evidence for a goal family. |
| **Design Pack** | A portable character and expression system that renders experience semantics. |
| **Compatibility** | The declared ability of one Preset-Pack-Medium combination to preserve required semantics. |
| **Composition** | One versioned resolution of Product Binding, UX Preset, Design Pack, Adapters, and Projection. |
| **Adapter** | A controlled mapping from one system layer to a target medium, platform, Design Pack, or framework. |
| **Projection** | A purpose-specific artifact generated from the same experience definition. |
| **Evidence** | Recorded proof from review, test, observation, implementation, or use. |

Use stable lowercase IDs. Recommended forms:

```text
experience: workshop.reserve
pattern: search
step: select-candidate
primitive: Action.Primary
preset: decision.reserve
pack: royal-mail
medium: editorial.book
projection: lowfi.mobile
adapter: swiftui-ios
```

### 1.3 Composition contract

The central UES operation is:

```text
Designed Output = Bind(
  Product Binding,
  UX Preset,
  Design Pack,
  Medium / Platform Adapter,
  Projection / Fidelity
)
```

`UX Preset × Design Pack` are the two primary reusable design axes. Product Binding is the required semantic substrate that prevents a reusable combination from becoming generic or context-blind. Medium/Platform and Projection determine where and at what resolution the composed result is expressed.

A conforming Designed Output MUST declare all five inputs. An Experience definition MAY exist before they are selected, but it is not a composed design output until the combination is resolved.

Layer ownership is exclusive unless an explicit Adapter rule says otherwise:

| Decision | Owning layer |
| --- | --- |
| user, goal, objects, constraints, authority, data, failure cost | Product Binding |
| flow topology, IA, task priority, selection, disclosure, validation, recovery, success evidence | UX Preset |
| character, hierarchy expression, density, typography, color, imagery, shape, material, motion tone | Design Pack |
| affordance, input mode, physical/digital representation, lost capability and compensation | Medium/Platform Adapter |
| fidelity, artifact form, required detail, declared omissions | Projection |
| components, framework behavior, production mechanics | Framework/Implementation Adapter |

When layers conflict, use this priority:

```text
Safety and accessibility
→ Product requirements and binding
→ Experience Core
→ UX Preset behavior
→ Medium capability and compensation
→ Design Pack expression
→ Projection convenience
→ Framework convenience
```

A lower-priority layer MUST express, adapt, or declare a gap. It MUST NOT override a higher-priority meaning silently.

---

## 2. Experience Core

### 2.1 Core principles

1. **Goal before interface.** Start from the desired human outcome, not a component inventory.
2. **Meaning before appearance.** Experience meaning survives changes in brand, medium, fidelity, and framework.
3. **Object before page.** Define the objects people understand and manipulate before defining containers.
4. **Step, not screen.** A Step may become a page, spread, panel, prompt, voice turn, physical station, or service moment.
5. **Explicit condition.** Operational states, data qualifiers, validation results, environmental conditions, transitions, outcomes, and recovery are classified rather than collapsed into one state list.
6. **Truthful consequence.** All dependent representations update from one state source.
7. **Recoverable progress.** Preserve safe context and provide the shortest viable recovery.
8. **Progressive disclosure.** Reveal complexity and commitment when they become relevant.
9. **Accessibility is structural.** It begins in the Experience Core and is verified again in every projection.
10. **Evidence before promotion.** An attractive artifact is not sufficient evidence for a stable system rule.

### 2.2 Generic object model

Products bind their own nouns to this model. A binding may omit concepts that genuinely do not apply, but must explain material omissions.

| Generic concept | Meaning |
| --- | --- |
| Candidate | an available option or source of content |
| Selection | a candidate intentionally retained for a decision or composition |
| Constraint | a condition limiting validity or relevance |
| Commitment | an action that makes a choice, change, or publication effective |
| Result | visible or otherwise perceivable evidence of an outcome |
| Authority | the person or system allowed to change or commit state |
| Provenance | where content, data, or a recommendation came from |
| Recovery | a safe continuation after failure, interruption, or reversal |

### 2.3 System invariants

These rules survive every UX Preset, Design Pack, medium, viewport, fidelity, and framework.

1. **One source of truth:** objects, selections, constraints, recommendations, totals, conflicts, eligibility, status, and action availability derive from an explicit state model.
2. **Synchronized consequence:** after a transition, every dependent surface or artifact reflects the new state together.
3. **Known authority:** distinguish system recommendation, user choice, collaborator choice, generated suggestion, and unavailable/invalid facts.
4. **Safe commitment:** commitment is available only when required state is valid; otherwise show the reason and shortest repair path.
5. **Reversible cost:** high-cost selection, replacement, deletion, ordering, interruption, or publication has proportional confirmation, undo, version history, or safe fallback.
6. **Context preservation:** Back, Retry, and recovery retain safe input, selection, position, and progress.
7. **No silent disappearance:** filtered, hidden, unavailable, or moved objects remain explained if they still affect the decision.
8. **Field resilience:** time pressure, low attention, offline operation, permissions, device output, and environmental constraints receive a known-safe fallback when applicable.
9. **Semantic redundancy:** status, risk, and selection never depend on color, position, sound, motion, or one sensory channel alone.
10. **Declared uncertainty:** incomplete, stale, inferred, generated, or preference-based information is not presented as confirmed truth.

### 2.4 Flow, state, and transition contract

Every Experience declares:

- entry conditions;
- steps and material branches;
- success, alternative, failure, cancellation, and exit outcomes where applicable;
- data read, written, retained, or cleared;
- triggers, guards, and recovery paths;
- authority and collaboration rules when multiple actors can change state.

UES classifies dynamic terms before registering them. This prevents an implementation default, data quality, environmental cause, transition, or outcome from being mistaken for the same kind of state.

| Class | Core examples | Extension rule |
| --- | --- | --- |
| Operational state | `idle`, `active`, `loading`, `processing`, `disabled`, `empty`, `unavailable`, `warning`, `error` | products MAY add domain states such as `playing`, `paused`, or `editing` |
| Progress/completeness qualifier | `progress`, `partial` | attach scope and what remains |
| Data-quality qualifier | `stale`, `uncertain`, `generated` | declare provenance, freshness, or limitation |
| Validation result | `valid`, `invalid` | connect to the affected object and repair |
| Environmental condition | `offline`, `permission-denied`, `conflict`, `device-route-failure` | state affected capability and fallback |
| Transition kind | `success`, `failure`, `back`, `retry`, `cancel`, `timeout`, `alternative`, `interrupt`, `exit`, `external` | declare trigger and destination |
| Outcome kind | `success`, `alternative`, `failure`, `cancelled`, `exit` | declare terminal or resumable status |

`default` is an implementation default, not a Core state. Every state or qualifier declares scope as `experience`, `step`, `region`, `object`, or `primitive`. A product-local state MUST define its meaning and exits; it MUST NOT silently redefine a Core term.

Every material transition records:

```yaml
transition:
  from: local-step-or-state-id
  to: local-step-state-or-outcome-id
  trigger: local-control-or-system-event-id
  kind: success|failure|optional|back|retry|cancel|timeout|alternative|interrupt|exit|external
  guard: string|null
  data_retention: discard|preserve-session|save-draft|conditional
  state_retention: preserve|reset|conditional
  side_effect_policy: none|pending|idempotent|compensate|non-repeatable
  retry_policy: not-applicable|user|automatic|conditional
  visible_consequence: string
  recovery_or_undo: string|null
  terminal: boolean
```

Entry MUST point to an existing Step. Every Step MUST be reachable. Every nonterminal Step MUST have an outgoing transition. Every declared terminal outcome MUST be reachable. Loops MUST have a progress, stop, or exit condition.

Retry repeats only the failed operation and MUST NOT duplicate a completed side effect. Back, Retry, Cancel, Resume, and Exit declare retention independently. Cancellation is a deliberate transition and outcome, not an Error state. Timeouts, offline conditions, permission denial, device-route failure, expired sessions, and conflicts become explicit branches whenever they change the next action.

An Experience declares one exit policy:

```yaml
exit_policy:
  allowed: true
  confirmation: never|conditional|always
  destination: string
  data_retention: discard|preserve-session|save-draft|conditional
  pending_side_effects: none|continue|cancel-if-safe|confirm|compensate
  resume: unsupported|supported|conditional
```

### 2.5 Seven canonical Step Types

| Step | Purpose | Required consideration |
| --- | --- | --- |
| Inform | communicate purpose, context, or knowledge | do not block progress without a reason |
| Input | collect human or external information | validation, privacy, retained values |
| Select | choose one or more candidates | selected state, limits, consequence |
| Confirm | review a meaningful commitment | impact, edit/back, authority |
| Process | represent work performed by a system or service | progress, expectation, cancellation, recovery |
| Result | communicate returned content or completed outcome | evidence, interpretation, next action |
| Error | explain failure and guide recovery | cause, impact, preserved context, repair |

Normative Step obligations:

- **Inform** SHOULD be non-blocking. Blocking Inform MUST be necessary for comprehension, safety, consent, or a meaningful decision and MUST expose an outgoing transition.
- **Input** MUST distinguish required and optional values before submission. Applicable validation MUST identify the repair point. Valid values SHOULD survive recoverable failure unless an explicit security or privacy exception applies.
- **Select** MUST declare cardinality and distinguish selected, unselected, default, unavailable, and disabled options. Defaults MUST NOT create unintended consent.
- **Confirm** MUST summarize the decision, material data, authority, and consequence. An edit or Back route SHOULD remain available while correction is possible.
- **Process** MUST communicate perceptible work, decide wait/cancel/background/resume behavior, and terminate in a defined Step or outcome. Retry MUST declare duplicate-side-effect protection.
- **Result** MUST distinguish returned content, completion, partial completion, and failure, and MUST provide a next destination or intentional terminal state.
- **Error** SHOULD explain what happened, what it affects, and what can happen next. Retry is offered only when it can reasonably change the outcome.

### 2.6 Semantic Primitive families

| Family | Canonical primitives |
| --- | --- |
| Content | `Title`, `Description`, `Body`, `Media`, `Metadata`, `List`, `Summary`, `Container` |
| Input | `Text`, `Number`, `Date`, `Time`, `File`, `Search`, `Message`, `Sensor` |
| Selection | `Single`, `Multiple`, `Toggle`, `Range`, `Order`, `Placement` |
| Action | `Primary`, `Secondary`, `Tertiary`, `Destructive` |
| Navigation | `Next`, `Back`, `Close`, `Exit`, `Skip`, `Destination` |
| Feedback | `Info`, `Success`, `Warning`, `Error`, `Validation` |
| Status | `Loading`, `Processing`, `Progress`, `Empty`, `Disabled`, `Unavailable`, `Partial`, `Stale` |
| Context | `Breadcrumb`, `StepProgress`, `Section`, `Hierarchy`, `Scope`, `Location`, `Authority` |

Primitive names describe meaning, not visual components. `Action.Primary` may become a button, gesture, hardware control, spoken confirmation, printed instruction, or staffed service action.

### 2.7 Core Pattern library

The initial reusable library contains:

| Pattern | Canonical intent |
| --- | --- |
| Authentication | establish or recover trusted identity |
| Onboarding | establish purpose, capability, and a first useful action |
| Search | express intent and retrieve matching results |
| Browse | inspect a collection and move between overview and detail |
| Form | collect and validate structured information |
| Selection | choose one or more candidates with understandable consequences |
| ReviewConfirm | inspect a decision before commitment |
| CreateEdit | create or revise an object while retaining valid context |
| DestructiveAction | prevent and recover from high-cost removal or interruption |
| Transaction | exchange value, permission, or commitment |
| Permission | explain and request capability or access |
| UploadImport | bring external material into the experience |
| AsyncProcess | represent work that continues over time |
| EmptyRecovery | explain absence and provide an appropriate next path |
| ErrorRecovery | retry, modify, choose an alternative, go back, exit, or get help |
| PublishDistribute | prepare and release content to an audience or destination |
| LearnPractice | explain, demonstrate, practice, assess, and continue |
| MonitorRespond | observe changing state and take proportionate action |
| CollaborateHandoff | coordinate authority, contribution, review, and ownership transfer |

Patterns are composable and are not screen templates. A new visual arrangement does not justify a new Pattern.

### 2.8 Composition and edge-state rules

Merge Steps when they do not represent an independent judgment, system operation, meaningful state boundary, confirmation, or recovery boundary. Split a Step when a new decision, substantial Process, confirmation, separate failure/recovery path, or excessive cognitive/accessibility load requires it. Step-count reduction MUST NOT override clarity, consent, safety, or recoverability.

For every applicable condition below, declare scope, message obligation, permitted action, retention, recovery, accessible announcement, and terminal status.

| Condition | Classification | Minimum treatment |
| --- | --- | --- |
| first use | context, often `empty` | explain absence and offer creation, import, or orientation |
| loading | operational state | distinguish from Empty and Error; communicate meaningful delay |
| slow processing | processing qualifier | give wait expectation and cancel/background policy |
| partial work/data | qualifier | identify completed and missing portions; retry remainder or accept partial |
| stale data | data-quality qualifier | show freshness and safe refresh behavior |
| offline | environmental condition | explain affected scope and queue, cached, retry, or exit path |
| invalid input | validation result | identify object and repair; preserve valid values |
| permission denial | condition/outcome | explain limitation and feasible alternative |
| expired authorization | condition | preserve safe work and resume after re-authentication when possible |
| conflict | condition/failure reason | explain divergence and offer review, merge, replace, or cancel |
| quota/limit | guard/unavailable reason | show limit, current use, reset, or alternative |
| cancellation/timeout | transition/outcome | state retained work, destination, and duplicate-side-effect policy |
| destructive undo | recovery capability | state availability, scope, duration, and irreversible remainder |

Omitted material conditions require a documented waiver.

---

## 3. UX Preset system

### 3.1 Definition

A UX Preset is a portable behavioral configuration for a recurring goal shape. It changes information architecture and interaction—not only labels, defaults, or visual layout. It is distinct from a Core Pattern: Patterns solve recurring local experience problems, while a UX Preset coordinates multiple Patterns and policies across an end-to-end Experience.

Every composed Designed Output MUST select one UX Preset. If no specialized Preset applies, the project MUST declare a local neutral Preset rather than leave behavior implicit.

### 3.1.1 Canonical Preset Registry

The reusable Decision Preset contracts live in [`ux-presets/README.md`](../ux-presets/README.md). Each contract makes the Preset operational by declaring its state/retention rules, authority and commitment vocabulary, required Pack/Medium capabilities, minimum semantic tests, and Product Binding inputs. The UES defines the architecture; a Registry contract defines a versioned unit that can be selected, tested, and promoted.

### 3.2 Required UX Preset Contract

```yaml
ux_preset:
  id: string
  name: string
  version: semver
  family: string
  status: proposed|experimental|validated|deprecated
  canonical_source: string
  goal_shape: string
  primary_task: string
  primary_commitment: string
  flow_topology: []
  required_patterns: []
  information_architecture:
    dominant_surface: string
    object_priority: []
    persistent_context: []
    may_defer: []
  interaction_policy:
    selection: string
    disclosure: string
    onboarding: string
    navigation: string
    confirmation: string
  state_policy:
    required_states: []
    derived_consequences: []
  validation_policy: []
  recovery_policy: []
  authority_policy: []
  feedback_policy: []
  success_evidence: []
  measurement: []
  medium_overrides: []
  requirements: []
  incompatibilities: []
  evidence: []
```

A Preset requirement describes behavior or information structure. Visual-only choices belong to the Design Pack. Product-specific nouns, data, legal rules, and business constraints belong to Product Binding.

Every Preset contract MUST also declare: (1) retention for Back, Cancel, Retry, Resume, and Exit; (2) distinctions among system recommendation, user draft, user commitment, confirmed outcome, and unavailable/invalid; (3) the minimum semantic capabilities a Pack and Medium Adapter must provide; and (4) a minimum semantic test suite. It MUST NOT convert product-specific policies into universal rules.

### 3.3 Decision Preset family

The initial family uses IDs `decision.reserve`, `decision.compare`, and `decision.plan`.

#### Reserve — fast single commitment

- **Use when:** one appropriate option should be committed quickly.
- **Structure:** discovery → one active selection → minimum configuration → confirmation → result.
- **Dominant aid:** fit explanation.
- **Required recovery:** edit constraints, replace, retry, or undo where feasible.
- **Must not become:** a hidden multi-item cart or irreversible action.

#### Compare — evidence-led choice

- **Use when:** differences among a small candidate set are the decision.
- **Structure:** discovery → candidate set → shared comparison surface → decision → confirmation → result.
- **Dominant aid:** common attributes, meaningful differences, rationale, and declared limitations.
- **Required recovery:** revise the set without losing comparison context.
- **Must not become:** a browse grid with a different heading, selection count, or CTA.

#### Plan — constraint-aware composition

- **Use when:** multiple objects must be arranged across time, sequence, space, resources, or rules.
- **Structure:** discovery → multi-selection → composition view → conflict resolution → confirmation → result.
- **Dominant aid:** order, placement, gaps, conflicts, totals, and feasibility.
- **Required recovery:** resolve, swap, reorder, re-place, or revert visibly.
- **Must not become:** Reserve with a higher selection cap.

### 3.4 Preset extension rule

Potential families such as `Create`, `Learn`, `Monitor`, or `Collaborate` are not automatically Core UX Presets. Promote a Preset only when it:

1. changes information architecture and interaction across at least two products;
2. cannot be expressed sufficiently by existing Patterns alone;
3. declares its dominant object, state, decision aid, commitment, result, and recovery;
4. can be expressed by more than one Design Pack and Medium Adapter;
5. reduces bespoke correction cost without hiding product-specific requirements.

---

## 4. Design Pack system

### 4.1 Definition

A Design Pack is a portable **character and expression grammar**. It determines how experience meaning is perceived while preserving the Experience Core.

A Design Pack may exist as:

- a Figma project or library;
- a Markdown contract;
- a paired Figma + Markdown package;
- a token registry plus documented assets;
- another inspectable format that satisfies the Pack Contract.

Figma and Markdown are valid source formats, but neither format alone guarantees completeness. The Pack manifest identifies what is canonical and how other artifacts synchronize with it.

### 4.2 Required Design Pack Contract

Every Pack declares:

```yaml
design_pack:
  id: string
  name: string
  version: semver
  status: proposed|experimental|validated|deprecated
  canonical_source:
    type: markdown|figma|hybrid|registry
    location: string
  character:
    intent: string
    emotional_range: []
    anti_characteristics: []
  expression:
    hierarchy: string
    density: string
    typography: string
    color: string
    imagery: string
    shape_and_surface: string
    motion_and_rhythm: string
    spatial_behavior: string
  information_rules:
    emphasis: []
    grouping: []
    sequence: []
    comparison: []
    status_and_feedback: []
  capabilities: []
  gaps: []
  approved_alternatives: []
  accessibility_floor: []
  supported_media: []
  evidence: []
```

### 4.3 Pack boundary

| A Design Pack may change | A Design Pack must not change |
| --- | --- |
| visual, editorial, material, spatial, and motion character | the primary human goal |
| hierarchy, rhythm, density, grouping, and navigation expression | object meaning, validity rules, or authority |
| component anatomy and content presentation | required state, validation, commitment, and recovery |
| how comparison, planning, status, and feedback are represented | whether comparison, planning, status, and recovery exist |
| medium-specific expression when declared | product requirements or evidence thresholds |

A minimal Pack may express comparison as a restrained specification sheet; an expressive Pack may use editorial cards or spatial juxtaposition. Neither may remove meaningful differences because its character favors simplicity.

### 4.4 Pack Capability Matrix

Every projection checks whether the active Pack can express the required semantics.

| Capability | Required declaration |
| --- | --- |
| hierarchy | primary, secondary, contextual, and suppressed information |
| collection | list, grid, sequence, spread, cluster, or physical grouping |
| comparison | aligned attributes and meaningful differences |
| composition | order, time, space, layers, or resource placement |
| state | selection, progress, warning, error, unavailable, success |
| recovery | retry, undo, alternative, edit, back, or assisted path |
| data | quantitative, qualitative, uncertain, stale, and generated information |
| accessibility | redundant and medium-appropriate perception and operation |

When a capability is missing, the Adapter must use an approved alternate representation or declare a blocking gap. It may not silently omit the meaning.

### 4.5 Pack and mapping-gap resolution

When required meaning lacks a direct expression, use this order:

```text
1. Verify the UES, Design Pack, and Adapter versions.
2. Search the Pack's existing capabilities and approved representations.
3. Compose supported expressions without losing required meaning.
4. Record a structured Pack or Adapter gap and a safe fallback if one exists.
5. Create a Design Pack work item when the meaning exists but expression is missing.
6. Create a UES Extension Proposal only when the semantic concept itself is missing.
```

```yaml
expression_gap:
  layer: design-pack|medium|adapter
  target: semantic-or-capability-id
  reason: string
  fallback: string|null
  semantic_limitations: string
  status: open|accepted|planned|resolved|blocking
  evidence: []
```

A Pack/Adapter is complete for one Experience when every used semantic and applicable state has either a valid mapping or a reviewed gap with a safe fallback and resolution status. Completeness is scoped to an Experience; it is not a universal claim about the Pack.

### 4.6 UX Preset × Design Pack compatibility

Compatibility is the intersection of UX Preset requirements and Design Pack capabilities after medium constraints are applied.

| Status | Meaning | Required action |
| --- | --- | --- |
| `supported` | the Pack directly expresses every required Preset capability | proceed with declared mappings |
| `supported-with-adaptation` | approved alternate expressions preserve meaning | record adaptations in the Composition Manifest |
| `limited` | the result remains usable but a noncritical semantic limitation exists | expose the limitation and obtain review before production use |
| `blocking` | required meaning, safety, accessibility, or recovery cannot be preserved | do not generate a conforming output with this combination |

```yaml
compatibility:
  ux_preset: preset.id
  design_pack: pack.id
  medium: medium.id
  status: supported|supported-with-adaptation|limited|blocking
  required_capabilities: []
  direct_capabilities: []
  adaptations: []
  limitations: []
  blocking_gaps: []
  decision: proceed|review|required-change|stop
```

Compatibility MUST be determined from declared requirements and capabilities, not aesthetic preference. A `blocking` result cannot be bypassed by a lower-fidelity Projection or framework shortcut.

---

## 5. Medium and Platform Adapters

Experience meaning remains stable while representation adapts to the medium's affordances and limits.

### 5.1 Medium families

| Medium family | Possible forms | Adaptation concerns |
| --- | --- | --- |
| Digital interactive | web, mobile, desktop, wearable | navigation model, input mode, viewport, permissions, offline state |
| Editorial and print | book, magazine, manual, poster, report, packaging | reading order, pagination, cross-reference, physical scale, static-state explanation |
| Spatial and environmental | exhibition, installation, signage, retail, public space | movement, distance, orientation, dwell time, reach, shared use |
| Conversational | chat, voice, agent, guided dialogue | turn state, memory, confirmation, uncertainty, interruption |
| Service | facilitated workshop, event, support, hospitality | actor roles, frontstage/backstage, handoff, wait state, recovery ownership |
| Motion and time-based | film, title sequence, instructional motion, performance cue | timing, sequence, pause/replay, sensory redundancy |
| Physical product | controls, instruments, objects, printed interfaces | affordance, feedback, safety, ergonomics, manufacturing limits |
| Multimodal | combined screen, sound, hardware, space, and human facilitation | synchronization, fallback channel, authority, environmental failure |

### 5.2 Medium translation rule

A medium translation records:

```text
semantic intent
→ available affordance
→ chosen representation
→ lost capability or constraint
→ compensation or alternate path
→ validation method
```

Example: `Compare` may project as a web table, mobile comparison stack, editorial spread, physical side-by-side display, or facilitated comparison exercise. The representation changes; shared attributes, meaningful differences, decision context, and recovery from an invalid choice remain.

### 5.3 Platform and input adaptation

Declare applicable input and context:

- touch, pointer, keyboard, switch, voice, gesture, sensor, hardware control, or facilitated action;
- one-handed use, shared display, distance viewing, darkness, noise, movement, time pressure, or intermittent connectivity;
- browser or OS navigation, windowing, permissions, output routes, interruption, persistence, and assistive technology;
- static, sequential, synchronous, asynchronous, or persistent presentation.

Responsive adaptation preserves decision priority. It may collapse secondary material only when current values, active state, and a route to restore that material remain perceptible.

Each adaptation declares `essential`, `persistent-context`, and `may-defer` semantics. Essential meaning, task status, and recovery remain available at every supported size or modality. A platform or medium override MUST state semantic equivalence and what it preserves; it cannot remove required consequence, validation, recovery, or accessibility.

### 5.4 Framework Adapter

Frameworks are implementation targets, not experience sources. A Framework Adapter maps semantic IDs to concrete behavior and components.

```text
Action.Primary       → SwiftUI Button / web button / physical control
Input.Text.Email     → HTML email input / native text field
Status.Progress      → progress indicator / spoken update / service status board
Context.Hierarchy    → heading structure / book section system / spatial wayfinding
```

Adapters declare supported UES and Design Pack versions, mappings, gaps, platform behavior, accessibility notes, and runtime evidence.

---

## 6. Projection system

A Projection is a purpose-specific view of the same Experience definition. Changing fidelity must not create a separate, divergent UX truth.

### 6.1 Projection types

| Projection | Primary question | Required content |
| --- | --- | --- |
| Concept map | what concepts and relationships matter? | goals, objects, constraints, relationships |
| User flow | how does a person move through decisions and outcomes? | entry, steps, branches, exits, recovery |
| Information architecture | how is information grouped and found? | object hierarchy, labels, navigation, scope |
| Service blueprint | who or what acts across frontstage and backstage? | actors, authority, handoffs, dependencies, failures |
| Low-fi | does structure and behavior make sense? | hierarchy, key content, state, action, recovery; minimal character |
| High-fi | can the Design Pack express the experience coherently? | Pack character, content fidelity, states, accessibility |
| Prototype | does interaction behave over time? | transitions, timing, input, feedback, edge states |
| Production | does it work in the target environment? | real data, platform behavior, telemetry, verified recovery |
| Editorial/physical specification | can the non-screen result be produced and used? | sequence, dimensions, material, legibility, interaction instructions |

### 6.2 Fidelity contract

Low-fi validates structure before character. It may omit final typography, imagery, materials, and polish, but it cannot omit the primary decision, material states, validation, or recovery merely because they are visually unfinished.

High-fi applies the Design Pack and realistic content. It must expose whether character and medium adaptation preserved the Experience Core.

Production evidence remains separate from design intent. A Figma prototype proves composition and simulated flow; it does not prove network behavior, device output, accessibility runtime, physical ergonomics, or real-world use.

### 6.3 Linked composition resolutions

The same Experience MUST be traceable through three linked semantic resolutions before medium-specific fidelity is applied:

```text
Level 1 — Pattern Flow
  end-to-end architecture and reusable Pattern composition
      ↓ expand with stable IDs
Level 2 — Step Flow
  decisions, Processes, branches, outcomes, and recovery boundaries
      ↓ expand with stable IDs
Level 3 — Semantic Composition
  content, input, selection, action, navigation, feedback, status, and context
      ↓ adapt to medium
Medium-specific Low-fi
      ↓ apply Design Pack
High-fi / Specification
      ↓ implement or produce
Prototype / Production evidence
```

`Semantic Composition` is medium-neutral. It may become a screen wireframe, editorial content map, spatial zone plan, conversation script, service blueprint segment, motion sequence, or physical-control layout.

Each expansion MUST preserve IDs, ownership, transitions, required states, and recovery. Figma success is measured by composition speed, semantic traceability, and consistency—not presentation polish alone.

### 6.4 Figma projection

Recommended neutral UES structure:

```text
00 System Overview
01 Objects and Flows
02 Step Types
03 Semantic Primitives
04 Core Patterns
05 UX Presets
06 Experience Composer
07 Design Pack Adapter
08 Medium and Platform Adapter
09 Projection Examples
10 Evidence and Extension Proposals
```

Figma artifacts use semantic names such as `UES/Step/Input`, `UES/Action/Primary`, and `UES/Preset/Decision/Compare`. Product visual components remain in the active Design Pack or product library. Figma records the UES version, Composition ID, Preset version, Pack version, Experience ID, Adapter ID, Projection type, and known omissions.

The neutral UES Figma library SHOULD provide reusable Flow Nodes, Flow Connectors, Steps, Semantic Primitives, Pattern Cards, Pattern Flows, Experience Flows, and Adapter Mapping References. Connector variants expose transition kind with text or shape redundancy rather than color alone. Unsupported semantics remain in an explicit Extension Proposal area.

### 6.5 Projection manifest

```yaml
projection:
  id: string
  composition: composition.id
  experience: experience.id
  ues_version: 0.5.0-draft
  ux_preset: preset.id
  ux_preset_version: semver
  design_pack: pack.id
  design_pack_version: semver
  medium: medium.id
  platform: string|null
  fidelity: concept|flow|ia|lowfi|highfi|prototype|production|specification
  adapter: adapter.id
  required_states: []
  declared_omissions: []
  conformance_claims: []
  evidence: []
```

### 6.6 Composition Manifest

The Composition Manifest is the reproducible record of one resolved combination. It is the handoff source for AI, Figma, documentation, code, and non-screen production specifications.

```yaml
composition:
  id: string
  ues_version: 0.5.0-draft
  product_binding: binding.id
  ux_preset:
    id: preset.id
    version: semver
  design_pack:
    id: pack.id
    version: semver
  medium_adapter:
    id: medium.id
    version: semver
  platform_adapter: adapter.id|null
  framework_adapter: adapter.id|null
  projection:
    type: concept|flow|ia|blueprint|lowfi|highfi|prototype|production|specification
    fidelity: string
  compatibility:
    status: supported|supported-with-adaptation|limited|blocking
    adaptations: []
    limitations: []
  resolved_ownership: []
  declared_assumptions: []
  declared_omissions: []
  gaps: []
  outputs: []
```

A composition with `blocking` compatibility MUST NOT be marked resolved. Any change to Product Binding, Preset, Pack, Medium, or Projection version creates a new manifest revision.

### 6.7 Required output set

A full reusable composition package defines these outputs, even when the current task generates only a declared subset:

| Output | Purpose |
| --- | --- |
| Composition Manifest | record all inputs, versions, compatibility, assumptions, and gaps |
| Pattern Flow | show the end-to-end Pattern architecture |
| Step Flow | show decisions, transitions, outcomes, and recovery boundaries |
| Semantic Composition | show medium-neutral primitives, state, ownership, and priority |
| Medium-specific Low-fi | resolve affordance, hierarchy, structure, and recovery without final character |
| Design Pack High-fi or specification | apply character and realistic content to the target medium |
| State and edge-state set | expose applicable loading, empty, partial, error, conflict, interruption, and recovery |
| Capability and gap report | record Preset requirements, Pack capabilities, adaptations, and blockers |
| Validation report | report only the conformance levels actually checked |
| Manual-correction record | attribute corrections to Binding, Preset, Pack, Medium, Projection, or implementation |

A task MAY request one output, but the Composition Manifest MUST record what was generated, deferred, or not applicable. Omission from the current task does not remove a semantic requirement from later projections.

---

## 7. Product and experience binding

Before creating a flow, Figma file, Design Pack projection, or implementation, declare:

```yaml
product_binding:
  id: string
  experience_id: experience.id
  name: string
  primary_user: string
  other_actors: []
  goal:
    primary: string
    secondary: []
  operating_context: string
  objects: []
  constraints: []
  authority: []
  commitment: string
  result_evidence: string
  failure_cost: string
  patterns: []
  entry: string
  outcomes:
    success: string
    alternatives: []
    failure: string|null
  recovery_policy: string
  accessibility_needs: []
  data_and_provenance: []
```

### 7.1 C5 Random Beat Maker binding

- **ID:** `c5.random-beat-maker`
- **Primary user:** battle host without a dedicated DJ.
- **Context:** noisy, dark, time-pressured performance setting.
- **Objects:** rights-cleared beats, current beat, queued beat, round, audio route.
- **Constraints:** BPM, genre, energy, round length, output availability, usage rights.
- **Commitment:** start playback or commit the next-beat transition.
- **Result evidence:** audible output plus redundant visible Playing state, metadata, and next cue.
- **Failure cost:** lost battle flow, silent output, wrong beat, accidental interruption.
- **Recovery:** hold/undo transition, fallback beat, output-route recovery, safe stop confirmation.

This binding is an evidence source and example, not a limit on UES scope.

Example composition choice:

```yaml
composition:
  product_binding: c5.random-beat-maker
  ux_preset: decision.reserve
  design_pack: pack.id
  medium_adapter: digital-interactive.mobile
  projection: highfi
```

Use `decision.plan` instead when the intended composition is a multi-round set rather than immediate playback.

---

## 8. Content, data, recommendation, and trust

1. Content identifies the human task before technical or product detail.
2. Actions use clear verbs and name material consequences.
3. Validation is placed near the affected input and describes repair.
4. Valid input is retained after recoverable validation or service failure.
5. Empty states distinguish first use, no match, lack of permission, unavailable service, and absence of content.
6. Data provenance, freshness, limitations, and incompleteness are visible when they affect interpretation.
7. Recommendations state relevant criteria and update when source state changes.
8. User choice and system recommendation remain distinguishable after an override.
9. AI-generated output declares generated status, uncertainty, provenance/citation status where material, and available human control.
10. No generated, recommended, stale, or inferred output is represented as verified fact.

---

## 9. Accessibility and inclusive-use floor

Every applicable projection preserves:

- perceivable names, roles, states, values, hierarchy, and instructions;
- operation through the target medium's relevant input modes;
- task-ordered focus, reading, movement, or facilitation sequence;
- errors and recovery connected to the affected object or action;
- redundant expression beyond color, location, sound, motion, shape, or one sensory channel;
- target size, contrast, text scaling, reflow, reduced motion, timing control, locale, and content-length resilience where applicable;
- physical reach, distance legibility, environmental sound/light, mobility, fatigue, and safety where applicable;
- an alternative for time limits, auto-advance, permission denial, inaccessible controls, or failed output channels;
- equivalent meaning when a medium cannot support the preferred interaction.

Accessibility requirements are semantic acceptance criteria first and concrete implementation evidence second.

---

## 10. Extension, versioning, and governance

### 10.1 Extension protocol

Before adding a Core concept, ask:

1. Can an existing Pattern express the need?
2. Can existing Steps and Primitives compose it?
3. Is it product-specific, a UX Preset, a Design Pack capability, or a Medium Adapter rule rather than Core?
4. Does it change semantics, state, transition, accessibility, trust, or recovery—not only appearance?
5. Which adapters, projections, schemas, and migrations would change?
6. What evidence would justify promotion?

```yaml
extension_proposal:
  id: string
  type: core|pattern|ux-preset|design-pack-capability|medium|adapter|schema
  owner: string
  decision_authority: string
  problem: string
  existing_system:
    considered: []
    why_insufficient: string
  proposed_contract: string
  affected_layers: []
  evidence_required: []
  migration: string
  governance_status: proposed|under-review|accepted|released|rejected|deprecated|removed
  evidence_maturity: proposed|projected|implemented|observed|validated|canonical
```

### 10.2 Governance status

Governance records who has approved a change; evidence maturity records what has been demonstrated. They MUST NOT be conflated.

```text
proposed → under-review → accepted → released → deprecated → removed
                       ↘ rejected
```

An accepted proposal does not change the Core until a versioned release is published. Rejected and deprecated proposals remain recorded with rationale, replacement, and migration where applicable.

### 10.3 Evidence maturity

| Level | Meaning |
| --- | --- |
| Proposed | plausible rule with no projection evidence |
| Projected | expressed in at least one inspectable artifact |
| Implemented | behaves in a runnable or producible target |
| Observed | reviewed with representative human use or expert evaluation |
| Validated | survives the required cross-product, cross-Pack, cross-medium checks |
| Canonical | approved for stable reuse with version and migration responsibility |

No rule becomes stable after one attractive prototype. A candidate Core or UX Preset rule normally requires:

1. at least two materially different experience bindings;
2. at least two strongly different Design Packs;
3. more than one relevant medium, platform, or fidelity projection;
4. state, recovery, accessibility, and trust checks;
5. recorded AI-generated and human-corrected defects;
6. evidence that reuse reduces bespoke correction without flattening product character.

### 10.4 Versioning

Use semantic versioning:

- **MAJOR:** breaking semantic or layer-boundary change;
- **MINOR:** backward-compatible Core, UX Preset, schema, or capability addition;
- **PATCH:** clarification or correction without changed meaning.

Never rename or remove canonical IDs silently. Deprecated IDs retain a replacement, rationale, migration, and target removal version. Design Packs, Adapters, projections, and implementations declare supported UES versions.

### 10.5 Release gate

This document remains `draft` until applicable registries and schemas parse, canonical fixtures pass structural and semantic validation, required Pack/Adapter mappings are reviewed, and the foundation success criteria have recorded evidence. A document title or attractive projection MUST NOT be treated as release evidence.

---

## 11. AI and implementation-agent contract

An AI agent using UES must:

1. identify the goal, actors, objects, context, outcome, and failure cost;
2. inspect active requirements, UES version, Product Binding, UX Preset, Design Pack, Adapters, and target Projection;
3. reuse Core Patterns before proposing new system vocabulary;
4. declare flows, states, transitions, guards, exits, and recovery;
5. select and resolve the required UX Preset before applying a Design Pack;
6. resolve expression through the active Design Pack and record capability gaps;
7. adapt through the declared medium/platform rather than assuming a screen;
8. resolve compatibility and create or update the Composition Manifest;
9. generate only the fidelity required and declare intentional omissions;
10. preserve semantic IDs across flow, low-fi, high-fi, Figma, code, and specifications;
11. verify applicable accessibility and failure behavior in the concrete target;
12. separate generated suggestion, implemented behavior, test evidence, and human acceptance;
13. create an Extension Proposal rather than silently changing the Core.

An agent may make local presentation decisions inside an approved Design Pack and Adapter. It may not invent a Core rule, hide a Pack gap, claim unsupported portability, or promote an unvalidated projection to canonical status.

### 11.1 Deterministic resolution order

```text
1. Resolve Goal, actors, desired outcome, and failure cost.
2. Resolve requirements, context, authority, and constraints.
3. Search existing Core Patterns and local compositions.
4. Resolve Flow nodes to canonical Step Types.
5. Compose Steps from registered Semantic Primitives.
6. Define states, qualifiers, transitions, outcomes, exit, retention, and side effects.
7. Resolve the UX Preset requirements against the Product Binding.
8. Resolve expression through the active Design Pack.
9. Resolve Preset-Pack compatibility and any approved adaptation.
10. Resolve medium, platform, fidelity, and Framework Adapters.
11. Create or update the Composition Manifest.
12. Classify missing expression as Pack, Medium, or Adapter gaps.
13. Propose a Core extension only for a true semantic gap.
14. Generate or produce the requested outputs.
15. Validate only the conformance levels actually inspected.
```

When several valid solutions exist, prioritize Goal, safety and informed commitment, clarity, accessibility, consistency, recoverability, efficiency, and implementation simplicity—in that order. Material financial, legal, privacy, permission, destructive, irreversible, or Core semantic choices require product authority rather than an agent default.

---

## 12. Validation protocol

### 12.1 Fixed and variable axes

To test one layer, keep the others constant.

| Experiment axis | Keep fixed | Change | Primary question |
| --- | --- | --- | --- |
| Character | experience, UX Preset, medium, task | Design Pack | does meaning survive while character changes? |
| Preset | experience data, Pack, medium | UX Preset | do IA and interaction actually change? |
| Medium | experience, UX Preset, Pack intent | Medium Adapter | does meaning survive a different affordance? |
| Fidelity | experience, UX Preset, Pack | projection fidelity | does each artifact answer its intended question? |
| Framework | experience, Pack, platform behavior | implementation adapter | does runtime behavior remain consistent? |
| Domain | Core rule, Pattern, test method | product binding | is the rule genuinely reusable? |

### 12.2 Validation checklist

- [ ] Goal, actors, objects, authority, success, and failure cost are explicit.
- [ ] Existing Patterns and UX Presets were considered before extension.
- [ ] Entry, success, alternative, failure, cancellation, retry, back, and exit paths were assessed.
- [ ] State changes update all dependent selections, totals, conflicts, recommendations, actions, results, and cues.
- [ ] Loading, empty, partial, stale, unavailable, permission, validation, conflict, and recovery states were assessed.
- [ ] The Design Pack changes coherent expression beyond palette, font, and radius.
- [ ] The Design Pack preserves required comparison, planning, status, validation, and recovery meaning.
- [ ] The Medium Adapter records lost capabilities and compensation.
- [ ] The Projection declares fidelity, omissions, source versions, and evidence.
- [ ] Accessibility is testable in the target medium and implementation.
- [ ] Figma, specifications, and code share canonical IDs and versions where applicable.
- [ ] Manual correction is attributable to Core, Binding, Preset, Pack, Medium, Projection, or implementation.
- [ ] New concepts follow the Extension Protocol.

### 12.3 Evaluation dimensions

Record applicable dimensions, method, artifact, and evidence strength:

- goal fit;
- experience integrity;
- character fidelity;
- Design Pack capability coverage;
- medium fit;
- accessibility;
- state and recovery integrity;
- trust and provenance clarity;
- Figma ↔ specification ↔ implementation portability;
- AI generation and human correction cost;
- real-use success, time, error, reversal, and recovery where measurable.

### 12.4 Semantic validation contract

Schema validation and semantic validation are distinct. A structurally valid document can still contain unreachable Steps, stale dependent state, unsafe retries, incomplete Preset realization, or unmapped Pack capabilities.

Run applicable checks in this order:

1. Load the pinned UES, Pack, and schema versions.
2. Validate syntax and structural schema when a schema exists.
3. Verify unique IDs and resolved references.
4. Verify entry, reachability, outgoing transitions, terminal outcomes, and intentional loop exits.
5. Verify Pattern roles, Strategy requirements, and composition invariants.
6. Verify every interactive semantic maps to a transition or documented local effect.
7. Verify one unambiguous primary commitment per decision context.
8. Verify Back, Retry, Cancel, Resume, and Exit retention policies.
9. Verify Retry side-effect and duplicate-execution policies.
10. Verify destructive or irreversible commitments have proportional confirmation or reliable Undo.
11. Verify applicable failure, timeout, interruption, permission, conflict, and recovery paths.
12. Verify synchronized consequences for selection, totals, recommendations, conflicts, CTA availability, results, and cues.
13. Verify Design Pack capability coverage and reviewed gaps.
14. Verify medium translation, semantic equivalence, essential priorities, and compensation.
15. Verify Projection fidelity, omissions, and source traceability.
16. Record runtime, accessibility, physical-use, and human-use evidence separately.

```yaml
validation_result:
  status: pass|fail|pass-with-reviewed-gaps
  ues_version: 0.5.0-draft
  artifact_id: string
  conformance_claims: []
  structural_errors: []
  semantic_errors: []
  design_pack_gaps: []
  medium_gaps: []
  adapter_gaps: []
  projection_gaps: []
  runtime_evidence: []
  accessibility_evidence: []
  human_use_evidence: []
  reviewed_waivers: []
```

---

## 13. Recommended source structure

UES begins as this single canonical Markdown file. Extract supporting files only after repetition justifies them.

```text
docs/
  04-universal-experience-system.md    # canonical foundation
experience-system/
  registry.yaml                        # machine registry extracted when vocabulary stabilizes
  schemas/                             # structural schemas; generated or version-checked
    experience.schema.yaml
    design-pack.schema.yaml
    projection.schema.yaml
    adapter.schema.yaml
  fixtures/                            # validator examples, not normative prose
    account-create.yaml
    search.yaml
    ai-generation.yaml
  experiences/                         # product bindings
  ux-presets/                          # approved UX Preset contracts
  design-packs/                        # Markdown Pack contracts and Figma links
  adapters/
    medium/
    platform/
    framework/
  projections/                         # manifests, not duplicated design artifacts
  extensions/
    proposed/
    accepted/
    deprecated/
  evidence/
```

Markdown carries principles, semantics, contracts, prompts, evidence, and maturity. Structured YAML/JSON carries stable registries and mappings. Figma carries editable visual composition and Pack assets. Runtime prototypes and physical/editorial proofs validate behavior and use. No medium replaces the others.

The initial single-file mode keeps this document canonical. Extracted registries, schemas, HTML, diagrams, Figma references, generated code, fixtures, and validation reports are derived artifacts. They MUST record the source UES version and SHOULD record a source hash when generation becomes automated. Derived artifacts MUST NOT write new Core meaning back into UES without a reviewed extension or correction process.

Split supporting files only when vocabulary is stable enough to validate, navigation has become materially difficult, or independent ownership/versioning provides clear value. Do not create two independently edited canonical sources.

---

## 14. Current inheritance and evidence

UES 0.5.0-draft inherits the following validated or useful material:

- from the prior C5 UX System: Goal Profiles, explicit state derivation, recommendation/user-choice separation, recovery and reversibility, Design Pack boundaries, field resilience, measurement, and evidence-based promotion;
- from Universal UX System v0.1: canonical vocabulary, Step and Primitive grammar, Core Pattern composition, machine-readable schemas, extension policy, semantic versioning, agent rules, and project structure;
- from the Missing Content Supplement: normative language, term classification, detailed transition/exit rules, Pack/Adapter gap handling, linked Figma composition resolutions, deterministic agent resolution, semantic validation, and governance/evidence separation;
- from C5 experiments: a Design Pack can materially change hierarchy, layout anatomy, density, and component expression; labels and colors alone do not prove Strategy variation;
- from Royal Mail Goal Profile testing: Compare and Plan require distinct primary structures, while recommendation and conflict resolution must update their dependent state visibly;
- from the broader system goal: Design Packs and projections must operate beyond web and app UI, including editorial, physical, spatial, conversational, service, motion, and multimodal design.

The following remain unproven at foundation status:

- one complete experience projected across interactive, editorial, and spatial media;
- equivalent Markdown-only and Figma-first Design Packs;
- semantic validation of Composition/Projection manifests and end-to-end consistency across generated outputs (not equivalent to the implemented registry checks below);
- independent accessibility assessment across non-screen media;
- reliable generation of user flow, low-fi, high-fi, and production artifacts from one source without semantic drift.

Operational update (2026-09-11): Markdown-to-Manifest generation, drift detection, versioned Manifest input validation, registered source/ID/version checks, bounded OPEN/link scanning, regression tests, and CI command wiring are implemented. These validate the declared operational scope, not experience semantics, real-world execution, accessibility, or human usability. See [P0 implementation and verification](p0-reliability-hardening.md). Take 2 is a retired experiment plan; its historical artifacts do not establish current foundation validity. Future experiments will be designed separately; see [experiment lifecycle decision](experiment-status.md).

---

## 15. Foundation success criteria

The current UES 0.5.0-draft becomes a validated baseline when it can:

1. model at least one transactional, one creative, one learning, and one live/field experience without inventing unnecessary Core concepts;
2. project one experience into user flow, IA, low-fi, high-fi, and runnable or producible form from shared semantic IDs;
3. apply at least three strongly different Design Packs while preserving experience integrity;
4. apply one Design Pack from a Figma-first source and one from a Markdown-first source;
5. translate one experience across at least three medium families, including one non-screen medium;
6. reveal Pack and Adapter gaps instead of silently flattening the result;
7. let an AI agent generate artifacts and classify its own corrections by system layer;
8. demonstrate accessible, recoverable behavior in the target context;
9. preserve an inspectable evidence trail from proposal to canonical promotion.

Digital baseline fixtures SHOULD cover authentication, commerce, settings, AI conversation/generation, and dashboard/monitoring. Broader validation MUST also include editorial/print, spatial or service, and physical or multimodal targets so digital screen conventions do not become accidental Core rules.

---

## 16. Change record

| Version | Date | Change | Status |
| --- | --- | --- | --- |
| 0.2.0-foundation | 2026-08-24 | Integrated the prior C5 Goal Profile/state contracts with a universal architecture for Design Packs, media, platforms, and projections. | superseded draft |
| 0.3.0-draft | 2026-08-24 | Added normative conformance, classified states/conditions/outcomes, detailed transition and exit contracts, Step obligations, edge-state treatment, Pack gap resolution, linked semantic composition levels, governance separation, deterministic agent resolution, and semantic validation. | superseded draft |
| 0.4.0-draft | 2026-08-24 | Promoted UX Preset to a first-class reusable axis, added the Composition Contract and ownership priority, Preset schema, Preset-Pack compatibility, Composition Manifest, and required output set. | superseded draft |
| 0.5.0-draft | 2026-08-24 | Added the versioned UX Preset Registry: explicit state retention, authority/commitment vocabulary, Pack/Medium capability floors, and minimum semantic tests for Reserve, Compare, and Plan. | current draft |
| 0.5.0-draft (evidence correction) | 2026-09-11 | Corrected §14 operational vs semantic validation scope and §15 current version; recorded Take 2 retirement. No Core rule change or maturity promotion. | current draft |

---

## Final canonical rule

**Define the Product Binding first. Resolve a declared UX Preset and Design Pack as the two primary reusable axes, then adapt their combination to the target medium, platform, and Projection through an explicit Composition Manifest. Preserve objects, states, transitions, outcomes, accessibility, and recovery across every output. Never let character, fidelity, framework convenience, or AI generation silently redefine the experience.**
