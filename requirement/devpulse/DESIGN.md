---
name: DevPulse
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dce6'
  primary: '#e0fdff'
  on-primary: '#00373a'
  primary-container: '#00f2fe'
  on-primary-container: '#006a70'
  inverse-primary: '#00696f'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#e1ffec'
  on-tertiary: '#003824'
  tertiary-container: '#67f4b7'
  on-tertiary-container: '#006e4b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#00dce6'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-hero:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0em
  kbd-shortcut:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.04em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
---

## Brand & Style

This design system serves a technical, high-productivity developer audience that values speed, high information density, and meticulous craft. The visual language merges modern developer minimalism with controlled glassmorphism and luminous accents, evoking the precision of tools like Linear, Raycast, and Vercel.

### Personality & Demeanor
- **Hyper-Curated & Focused:** Zero visual noise, minimal decorative embellishments, and strict spatial economy.
- **Instrument-Grade:** Interfaces feel like native developer utilities rather than marketing landing pages.
- **Luminous Depth:** Deep dark-mode substrates anchored with hairline borders, translucent overlays, and deliberate electric neon points that direct focus to active states, categories, and essential actions.

### Design Movement
Modern Dark Developer Minimalist with Glassmorphic Micro-Elevations. High-density information grids, monospace telemetry details, crisp hairline division rules, and soft glowing accents against an ultra-dark canvas.

## Colors

The palette is engineered specifically for high-contrast dark workspaces, ensuring WCAG AAA legibility and rapid categorical scanning.

### Canvas & Surfaces
- **App Canvas (Zinc-950/Slate-950 Blend):** `#07090e` base canvas with `#090d16` secondary viewport underlays.
- **Surface Elevation 1 (Card/Panel Base):** `rgba(15, 23, 42, 0.65)` layered over canvas with subtle backdrops.
- **Surface Elevation 2 (Floating Popover/Hover):** `rgba(30, 41, 59, 0.75)`.
- **Structural Borders:** Hairline rules using `#1e293b` (slate-800) at rest, transitioning to `#334155` (slate-700) on interaction.

### Primary Accents & Gradients
- **Electric Cyan (`#00f2fe`):** Primary interactive focus, terminal-style glyphs, active tabs, and primary selection states.
- **Vibrant Indigo / Violet (`#6366f1` to `#8b5cf6`):** Command palette highlights, featured resource outlines, and brand moments.
- **Aurora Gradient:** Linear 135deg from `#00f2fe` via `#6366f1` to `#a855f7` used sparingly on hero resource highlights and focus rings.

### Category Taxonomy Colors
Category badges must maintain uniform optical balance using a low-opacity tinted container (`12-16%`) paired with a high-saturation text/icon glyph:
- **Frontend:** Cyan (`#22d3ee`, background `rgba(34, 211, 238, 0.12)`)
- **Backend:** Emerald (`#10b981`, background `rgba(16, 185, 129, 0.12)`)
- **DevOps & Cloud:** Amber (`#f59e0b`, background `rgba(245, 158, 11, 0.12)`)
- **AI & ML:** Violet (`#a855f7`, background `rgba(168, 85, 247, 0.12)`)
- **Mobile:** Rose (`#f43f5e`, background `rgba(244, 63, 94, 0.12)`)
- **UI/UX & Design Systems:** Sky Blue (`#38bdf8`, background `rgba(56, 189, 248, 0.12)`)

### Neutral Text Hierarchy
- **Primary Text:** `#f8fafc` (Slate-50)
- **Secondary Text:** `#94a3b8` (Slate-400)
- **Tertiary / Metadata:** `#64748b` (Slate-500)
- **Disabled / Muted:** `#334155` (Slate-700)

## Typography

Typography establishes an immediate developer feel. Geist supplies rational, hyper-legible geometric clarity for titles and descriptions, while JetBrains Mono provides mechanical precision for telemetry, keyboard shortcuts, URLs, tags, and category identifiers.

### Hierarchy Guidelines
- **Tabular Numerics:** Enable `font-feature-settings: "tnum"` globally across tables, counters, star ratings, and directory metrics.
- **Monospace Deployment:** Use `JetBrains Mono` strictly for technical metadata (e.g., `github.com/repo`, `v2.4.1`, `cmd+k`, status tags). Never use it for multiline body paragraphs.
- **Editorial Sub-Headings:** Use tight negative letter tracking on headline sizes (`-0.02em` to `-0.03em`) to mimic IDE and modern terminal dashboard titles.

## Layout & Spacing

The layout is built around a dense, high-utility fluid grid capable of transitioning seamlessly from a compact mobile feed to a multi-column command station on ultrawide developer displays.

### Layout Mechanics
- **Grid Architecture:** 12-column adaptive grid with a maximum content bound of `1440px`.
- **Breakpoints:**
  - `Mobile (<640px)`: Single column layout, edge-to-edge compact resource list items, fixed bottom command bar.
  - `Tablet (641px - 1024px)`: 2-column resource grid, collapsible sidebar navigation.
  - `Desktop (1025px - 1440px)`: 3-column resource cards or high-density table mode with persistent split-pane directory filters.
  - `Wide (>1440px)`: 4-column resource grid with dual ancillary inspection panels.
- **Density Controls:** Support standard developer density with tight internal padding (`space-sm` to `space-md` within card interiors) to maximize above-the-fold catalog visibility.

## Elevation & Depth

Visual hierarchy uses physical glass layering, subtle luminous perimeter strokes, and radial spotlight glows rather than muddy drop shadows.

### Depth Stack
1. **Base Layer (Canvas):** Pure `#07090e` with optional subtle dot-matrix background pattern (`rgba(255, 255, 255, 0.03)` spaced at `24px`).
2. **Elevated Surfaces (Cards, Tables):** `background: rgba(15, 23, 42, 0.65)`, `backdrop-filter: blur(12px)`, bordered by `1px solid rgba(148, 163, 184, 0.08)`.
3. **Interactive Hover State:** Border shifts dynamically to `1px solid rgba(0, 242, 254, 0.35)` with an ambient cyan underglow: `box-shadow: 0 0 20px -4px rgba(0, 242, 254, 0.12)`.
4. **Overlays & Command Menus (Modal / Raycast Palette):** `background: rgba(9, 13, 22, 0.88)`, `backdrop-filter: blur(24px)`, enclosed by `1px solid rgba(99, 102, 241, 0.35)` and an ambient shadow: `box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05)`.
5. **Spotlight Highlights:** Mouse-tracking radial gradient overlays on cards using `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.08), transparent 80%)`.

## Shapes

The geometric framework favors sharp, technical corners with slight softening to maintain an engineered aesthetic.

- **Standard Base Radii (`roundedness: 1`):** Base units sit at `0.25rem` (`4px`) for nested code tags and chips, scaling to `0.5rem` (`8px`) for buttons, search inputs, and cards.
- **Modals & Flyouts:** `0.75rem` (`12px`) outer radius to establish an elevated boundary against the structural grid.
- **Status Dots & Pill Avatars:** Kept fully circular (`rounded-full`) exclusively for category indicator dots, live status beacons, and collaborator avatars.

## Components

### 1. Bookmark & Resource Cards
- **Architecture:** Stacked or horizontal layout with `p-4`, built with elevated glass (`rgba(15, 23, 42, 0.65)`), hairline border (`rgba(148, 163, 184, 0.08)`), and `rounded-lg` corners.
- **Header:** Favicon / brand monogram (24x24px, rounded-md with internal border) paired with resource title in `headline-sm` and external link icon.
- **Body:** Description limited to 2 lines (`body-md` in `slate-400`).
- **Footer Metadata:** JetBrains Mono category chip (left), GitHub star counter / release date tag (right), and quick-copy bookmark icon button.
- **Interactions:** Subtle vertical translation (`-2px`) on hover with cyan/indigo illuminated stroke.

### 2. Category Badges & Chips
- **Container:** Inline-flex, height `22px`, padding `0 8px`, `rounded-sm`.
- **Styling:** Monospace text in `code-sm`, uppercase, font weight 600. Background rendered at `12%` opacity of the category color, with a matching `1px` border at `24%` opacity.
- **Variants:** Features a `5px` solid indicator dot prefixed before the category name.

### 3. Command Palette (Cmd + K)
- **Shell:** Centered modal, max width `640px`, backdrop blur `24px`, background `rgba(9, 13, 22, 0.9)`.
- **Search Bar:** Large borderless input (`body-lg`), auto-focused with a glowing cyan magnifying glyph and an inline `ESC` keyboard badge.
- **Results List:** Grouped by categories (Bookmarks, Collections, Actions). Active item highlighted with `background: rgba(99, 102, 241, 0.15)` and an electric cyan left-accent border (`2px solid #00f2fe`).

### 4. Interactive Buttons
- **Primary:** Background `#00f2fe`, text `#07090e` (dark-on-light contrast), font weight 600, `rounded-md`. Subtle hover glow: `0 0 16px rgba(0, 242, 254, 0.4)`.
- **Secondary / Ghost:** Transparent background with hairline border `rgba(148, 163, 184, 0.15)`, text `#f8fafc`. Hover fills with `rgba(255, 255, 255, 0.05)`.
- **Icon Buttons:** Fixed aspect ratio (`32x32px` or `28x28px`), centered glyph in `slate-400`, transitioning to cyan or violet on hover.

### 5. Input Fields & Search Bars
- **Surface:** `rgba(15, 23, 42, 0.8)`, border `1px solid #1e293b`.
- **Focus State:** Border shifts directly to `#00f2fe` with matching `0 0 0 1px #00f2fe` ring; no heavy outlines.
- **Accessories:** Integrated right-aligned keyboard shortcut hint badges (`⌘K`, `/`, `Enter`) styled in `kbd-shortcut`.

### 6. Code Tags & Monospace Snippets
- **In-line Snippets:** `JetBrains Mono`, `text-[12px]`, background `rgba(255, 255, 255, 0.06)`, border `rgba(255, 255, 255, 0.1)`, padding `2px 6px`, `rounded-sm`.
- **Terminal Bar:** Preview bar for quick-install packages (`npm i @devpulse/core`) equipped with single-click copy action, feedback state changing briefly to emerald green text with an animated checkmark icon.

### 7. Filter Pills & Segmented Controls
- Compact container with `padding: 2px`, `background: rgba(15, 23, 42, 0.9)`, `border: 1px solid #1e293b`.
- Selected tab contains a distinct elevated pill background (`rgba(30, 41, 59, 0.9)`) with white text and a hairline bottom cyan thread.