# Korean Commercial — Foundation 운영 명세

> 정본 참조: [korean-commercial-system.md](korean-commercial-system.md) §§1–2. 값 또는 의미가 충돌하면 정본이 우선한다.

## 토큰 어댑터

| Raw token | Value | Semantic consumers |
| --- | --- | --- |
| `--dancheong-red` | `#C8352A` | `--primary`, `--error`, `--focus` |
| `--dancheong-blue` | `#1B4F8C` | `--secondary`, informational treatment |
| `--dancheong-green` | `#2A6B52` | `--success` only |
| `--dancheong-gold` | `#C8952A` | bounded `--accent`; warning only with independent semantic text/icon |
| `--dancheong-black` | `#1A1210` | `--foreground`, inverse depth |
| `--hanji-warm` | `#F4EFE4` | `--background`, main reading field |
| `--hanji-mid` | `#E8DFD0` | muted/recessed surface |
| `--hanji-dark` | `#C8BFAE` | border, divider |

```css
:root {
  --background: var(--hanji-warm);
  --foreground: var(--dancheong-black);
  --primary: var(--dancheong-red);
  --secondary: var(--dancheong-blue);
  --accent: var(--dancheong-gold);
  --success: var(--dancheong-green);
  --error: var(--dancheong-red);
  --border: var(--hanji-dark);
  --radius: 2px;
}
```

**Release rule:** actual foreground/background pairs must be contrast-measured after any brand or surface substitution. Gold must never be the only warning cue.

## Type and geometry

| Role | Source family | Contract |
| --- | --- | --- |
| Display | Nanum Myeongjo | editorial/cultural display only; source hero `clamp(2.8rem, 6vw, 5.5rem)`, weight 800 |
| Body/UI | Noto Sans KR | readable Korean UI and body; do not replace with condensed display type |
| Metadata | JetBrains Mono | section code, token, data label; not long prose |
| Hero | 58% warm reading field / 42% red geometric field | stacks on narrow screens, red region follows reading block |
| Accent strip | 6px five-color strip | closes a composition; does not communicate state |
| Shape | 2px corner radius, hairlines | no soft card or glass treatment |

## Spacing, layers, and motion

| Family | Values |
| --- | --- |
| Spacing | `4, 8, 16, 24, 32, 48, 80px` |
| Shadow | sm `0 1px 2px rgba(26,18,16,.06)`; md `0 4px 12px rgba(26,18,16,.08)`; lg `0 8px 24px rgba(26,18,16,.12)` |
| Duration | fast `100ms`; base `150ms`; slow `300ms` |
| Easing | `cubic-bezier(.2,0,0,1)` |
| Layers | sticky `200`; overlay `300`; toast `400` |

## Surface policy

- Hanji texture is a low-contrast material cue outside critical text, fields, tables, charts, or statuses.
- Bojagi geometry establishes region boundaries and responsive order; it does not sit behind data or become arbitrary pattern fill.
- No soft gradients, generic “Asian” ornaments, or unapproved cultural symbol substitutions.
