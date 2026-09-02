# UES Composition Manifest

This project applies UES `0.4.0-draft` as `Product Binding × UX Preset × Design Pack × Medium/Projection` rather than treating the Design Pack as a color theme.

## Shared Product Binding

- **ID:** `binding.1m-electric-study.launch`
- **Actor:** performance-car enthusiast evaluating an unfamiliar electric concept
- **Primary outcome:** understand the concept, inspect its rationale and evidence, then optionally request updates
- **Objects:** concept identity, driving principles, electric architecture, target specifications, update request
- **Risk:** mistaking a speculative study for an official announced BMW product
- **Authority rule:** every projection identifies the work as an unofficial concept; target specifications are labeled as conceptual
- **State path:** `orientation → transition rationale → driving feel → architecture → target specs → update request → success`
- **Validation/recovery:** invalid email remains editable with an inline error; successful submission produces visible confirmation

## Local UX Preset

- **ID/version:** `launch.inform-consider@0.1.0-local`
- **Flow topology:** linear reveal with optional direct section access
- **Dominant surface:** image-led editorial sequence
- **Disclosure:** progressive, from identity and value to technical evidence
- **Primary commitment:** low-risk update request
- **Required evidence:** concept purpose, three principles, architecture, target-spec disclaimer, request confirmation
- **Recovery:** persistent navigation, editable form, validation message, return to any sequence step

## Design Pack

- **ID/version:** `ditherams.brutalist-archival@0.1.0`
- **Source:** user-provided Figma Make Design Pack
- **Character:** near-black archive field, cream foreground, fluorescent-yellow signal, mono labels, thin rules, square geometry, numbered linear sequence, grid/halftone image treatment
- **Ownership boundary:** Pack controls visual character and expression; it does not change the shared state path, validation, disclaimer, or success evidence

## Composition A — responsive website

```yaml
composition:
  id: 1m-electric-study.web.r1
  ues_version: 0.4.0-draft
  product_binding: binding.1m-electric-study.launch
  ux_preset: { id: launch.inform-consider, version: 0.1.0-local }
  design_pack: { id: ditherams.brutalist-archival, version: 0.1.0 }
  medium_adapter: { id: medium.web.responsive, version: 0.1.0-local }
  platform_adapter: adapter.web.browser
  framework_adapter: adapter.react.vite
  projection: { type: production, fidelity: responsive interactive HTML }
  compatibility:
    status: supported-with-adaptation
    adaptations:
      - six-step print sequence becomes scroll sections plus direct navigation
      - update request includes error, loading, and success states
    limitations:
      - no backend persistence or real mailing-list integration
  resolved_ownership:
    - UX Preset owns sequence, hierarchy, validation, recovery, and success evidence
    - Design Pack owns palette, typography character, borders, labels, image treatment, and geometry
  declared_assumptions:
    - BMW 1M is a proportion reference for an original badge-free electric study
  declared_omissions:
    - pricing, production date, homologation, and purchase flow
  gaps: []
  outputs: [index.html, src/App.jsx, src/styles.css]
```

## Composition B — A4 tri-fold pamphlet

```yaml
composition:
  id: 1m-electric-study.print.r1
  ues_version: 0.4.0-draft
  product_binding: binding.1m-electric-study.launch
  ux_preset: { id: launch.inform-consider, version: 0.1.0-local }
  design_pack: { id: ditherams.brutalist-archival, version: 0.1.0 }
  medium_adapter: { id: medium.print.a4-landscape-trifold, version: 0.1.0-local }
  platform_adapter: null
  framework_adapter: adapter.html.print-css
  projection: { type: production, fidelity: print-ready HTML plus rendered raster pages }
  compatibility:
    status: supported-with-adaptation
    adaptations:
      - scroll sequence becomes cover, flap, back, and three-panel inside reading order
      - interactive validation becomes a call-to-action directing readers to the website
    limitations:
      - physical fold, duplex alignment, paper stock, and printer color profile require production proofing
  resolved_ownership:
    - UX Preset owns reading order and retained information meaning
    - Design Pack owns panel rhythm and printed visual character
  declared_assumptions:
    - A4 landscape, 100 percent scale, duplex long-edge output
  declared_omissions:
    - crop marks, bleed, ICC profile, and regulatory copy
  gaps: []
  outputs: [pamphlet.html, pamphlet.css, pamphlet-outside.png, pamphlet-inside.png]
```
