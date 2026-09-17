# Handoff: Monday Briefs logo (direction 1B — "Fifty Thousand to One")

## Overview
A replacement identity mark for Monday Briefs. The chosen direction keeps the two
equities of the existing logo — the indigo field of dots and the gold accent that
marks what matters — and gives them a job: a field of indigo source dots narrows
**4 → 3 → 2 → 1** into a single solid gold block. Many thousands of words in, one
brief out. Nine dots instead of twenty-eight, so every element is a shape rather
than a sub-pixel smudge at nav size.

The old mark packed a 7 × 4 dot grid and a 2px chamfered corner into a 34px tile;
neither survived below about 40px, and the gold column read as dirt. This one is
drawn to hold at 16px.

## About the design files
Everything in this bundle is **production-ready SVG plus a reference React
component**, not a prototype to screenshot. The SVGs are final geometry and final
colours and can ship as-is. `MondayBriefsLogo.tsx` is a *reference
implementation* — recreate it in whatever the target codebase already uses
(React, Vue, Svelte, SwiftUI, plain HTML) following that project's existing
component and token conventions. Do not add a new styling library for it.

The live exploration that produced this direction lives in the parent project as
`Monday Briefs Logo.dc.html` (option **1B**), if you want to see it beside the
three alternatives.

## Fidelity
**High-fidelity.** Final geometry, final hex values, final reduction rules.
Reproduce the coordinates exactly — they sit on a 10-unit grid and the optical
balance depends on it.

## Assets

| File | Use | Canvas |
| --- | --- | --- |
| `mark.svg` | Primary mark, light backgrounds. Tight-cropped, no padding. | `0 0 42 34` |
| `mark-reversed.svg` | Primary mark on ink / dark backgrounds. | `0 0 42 34` |
| `mark-small.svg` | Reduced 5-dot mark for anything under 24px tall. | `0 0 31 24` |
| `icon.svg` | App icon: indigo tile, white dots, gold brief. | `0 0 48 48` |
| `favicon.svg` | Same artwork as `icon.svg`, conventional filename. | `0 0 48 48` |
| `lockup.svg` | Horizontal lockup, light. Wordmark is `<text>`. | `0 0 224 30` |
| `lockup-reversed.svg` | Horizontal lockup, dark. | `0 0 224 30` |
| `tokens.css` | The seven colour variables. | — |
| `MondayBriefsLogo.tsx` | Reference React implementation of all three forms. | — |

### A note on the lockup SVGs
Both lockup SVGs use a live `<text>` element with `font-family: Instrument Sans`.
If that font is not loaded in the consuming context the wordmark falls back to
the system UI font and the advance width changes. For anywhere you control the
page (the app, the site, the portal) use the **HTML lockup** — mark SVG next to a
styled `<span>`, as in `MondayBriefsLockup` — and reserve the lockup SVGs for
email signatures, slide masters and third-party profiles where a single file is
required. If a lockup must be a fixed-width image, outline the text in a vector
editor first and re-export.

## Geometry

The mark is drawn on a 10-unit grid, all dots `r = 2`.

| Column | x | Dot centres (y) | Opacity |
| --- | --- | --- | --- |
| 1 (sources) | 2 | 2, 12, 22, 32 | 0.32 |
| 2 | 12 | 7, 17, 27 | 0.56 |
| 3 | 22 | 12, 22 | 0.86 |
| Brief | 31 → 42 | y 10 → 24, `rx 2.5` | 1 (gold) |

- Every column is vertically centred on **y = 17**, so the narrowing reads as a funnel.
- Horizontal pitch is a constant 10 units; the gold block starts 9 units after the
  last dot centre, which is the one deliberate irregularity — it separates output
  from input.
- On dark backgrounds the dot ramp lightens to `#8E9BEA` at 0.5 / 0.72 / 1.0. The
  gold never changes.

### Reduced form (under 24px)
Drop column 3 and the fourth dot of column 1: three dots at x 2, two at x 12,
gold block at x 21–31, all centred on y = 12. Use it for favicons at 16–20px,
avatar slots, and any lockup where the mark renders below 24px tall.

## Design tokens

| Token | Hex | Where |
| --- | --- | --- |
| `--mb-indigo` | `#4C5CC9` | dot ramp, icon tile |
| `--mb-indigo-light` | `#8E9BEA` | dot ramp on dark |
| `--mb-gold` | `#F0C24A` | the brief block — the only accent, never used for text |
| `--mb-ink` | `#1E2536` | wordmark on light |
| `--mb-ink-deep` | `#14192A` | dark lockup background |
| `--mb-page` | `#F7F8FA` | page background (existing site value) |
| `--mb-hairline` | `#E4E7EE` | borders |

`#4C5CC9` is a half-step deeper than the site's current `#5063C9` so the faintest
dot column still holds against `#F7F8FA`. `#F0C24A` is the existing gold
(`#F6D96B` as rendered) pulled down for contrast at small sizes.

## Typography

| Role | Font | Size | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Wordmark | Instrument Sans | any | 600 | `-0.024em` |

Google Fonts:
```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Set in title case, never all caps, never letterspaced positive. `Monday Briefs`
is two words with a single space; no ligature or custom kerning pairs.

## Lockup rules

- **Mark-to-wordmark gap:** 0.5 × wordmark font size.
- **Mark height:** 1.15 × wordmark font size. At 26px type the mark is 30px tall.
- **Clearspace:** the height of one dot column gap (10 mark units ≈ 0.3 × mark
  height) on all four sides. Nothing crosses it.
- **Minimum sizes:** full mark 20px tall; reduced mark 14px tall; lockup 120px
  wide. Below 120px use the mark alone.
- **Vertical (stacked) lockup:** not drawn. If you need one, centre the mark above
  the wordmark with a gap of 0.6 × font size — but ask for a proper drawing first.

### Don't
- Don't recolour the gold block, and don't apply the gold to text.
- Don't equalise the dot opacities — the ramp is the idea.
- Don't rotate, mirror, or stretch the mark; the narrowing only reads left to right.
- Don't put the light mark on photography or on any fill darker than `#E4E7EE`;
  switch to the reversed mark at that point.
- Don't place the mark inside a second container (a circle avatar, a bordered
  chip) when `icon.svg` already provides the tiled form.

## Implementation notes

**Favicon set.** `favicon.svg` is the source of truth. Ship it as
`<link rel="icon" type="image/svg+xml" href="/favicon.svg">` with PNG fallbacks
rasterised at 32, 180 (apple-touch-icon) and 192/512 (web manifest). At 16px the
browser downscales the tile artwork; that form was designed for it, so no
separate 16px drawing is needed.

**Dark mode.** Switch on `prefers-color-scheme` or the app's theme flag; the
component takes `variant="reversed"`. The gold is identical in both, which is what
ties the two states together.

**OG image.** Not in this bundle. `icon.svg` at 128px on `#14192A` with the
reversed lockup beneath it is the intended composition; ask if you want it drawn.

**Accessibility.** The mark is decorative wherever the wordmark is present —
`aria-hidden="true"` on the SVG in that case, and let the text carry the name.
Standalone (favicon slot, avatar, nav on mobile) keep `role="img"` with
`aria-label="Monday Briefs"`, as shipped.

## Files in this bundle
```
mark.svg
mark-reversed.svg
mark-small.svg
icon.svg
favicon.svg
lockup.svg
lockup-reversed.svg
tokens.css
MondayBriefsLogo.tsx
README.md
```
