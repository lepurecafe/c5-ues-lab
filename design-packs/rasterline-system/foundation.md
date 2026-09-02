# Rasterline Foundation

## 1. Color tokens

These values were observed in the Figma Make foundation panel. Use semantic names rather than raw values in implementation.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#0A0A0A` | primary canvas |
| `--foreground` | `#F0ECE0` | primary text and high-emphasis border |
| `--accent` | `#E8FF00` | active signal, primary emphasis, intentional highlight |
| `--card` | `#111111` | raised surface |
| `--secondary` | `#1A1A1A` | secondary surface |
| `--muted` | `#1F1F1F` | quiet surface or fill |
| `--muted-foreground` | `#6B6560` | secondary text; validate contrast per size/use |
| `--border` | `#2A2A2A` | default separator and resting border |

### Color rules

1. Reserve `--accent` for the current primary action, active/selected signal, or a bounded status emphasis.
2. Never encode progress, validation, risk, or selection in color alone; pair it with text, icon, position, or pattern.
3. Use `--foreground` for essential text. `--muted-foreground` is for non-essential metadata only until contrast is verified.
4. Do not introduce gradients as a default Rasterline primitive; texture is made through raster, grid, or scanline pattern.

## 2. Typography

The source declares **Space Mono** for headings/labels and **DM Sans** for body copy.

| Role | Source scale | Family | Usage |
| --- | --- | --- | --- |
| Display | `6xl–8xl` | Space Mono | page/system identity only |
| H1 | `4xl–5xl` | Space Mono | major section title |
| H2 | `2xl–3xl` | Space Mono | section title |
| H3 | `lg–xl` | Space Mono | group title |
| H4 | `base` | Space Mono | local title |
| Body | `base` | DM Sans | explanatory and input-support copy |
| Caption | `xs` | DM Sans | metadata and secondary labels |
| Mono | `sm` | Space Mono | IDs, counters, status, technical labels |

### Type rules

- Use uppercase or structured mono labels sparingly to mark system regions, identifiers, or states; never turn paragraph-length copy into all caps.
- Keep display type for entry/identity moments. Operational screens should privilege readable body text and clear labels.
- Do not rely on a font alone to differentiate a control state.

## 3. Spacing scale

Observed scale: `4`, `8`, `12`, `16`, `24`, `32`, `40`, `48`, `64`, `80`, `96` px.

| Intent | Preferred values |
| --- | --- |
| icon-to-label / tightly related items | 4–8 px |
| control internals / compact lists | 12–16 px |
| component padding / related groups | 16–24 px |
| section grouping | 32–48 px |
| major visual break | 64–96 px |

Do not invent intermediate spacing values without a documented adapter reason.

## 4. Surface and border grammar

- The base surface is near-black; layered surfaces distinguish structure, not decoration.
- Resting controls and cards use visible borders. A foreground border marks focused or hovered attention; an accent border is reserved for an intentional active/emphasis state.
- Keep corners squared or minimally rounded. Excessively soft cards dilute the archival-operational character.
- Each textured surface must retain a plain-text, high-contrast reading path.

