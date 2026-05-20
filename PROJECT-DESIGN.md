# DESIGN IDENTITY: "Quiet Luxury" — Real Estate Website for Sarah Chen Realty, Austin TX

You are building a website that must make a luxury real estate agent's clients feel:

> "This agent is in a different league. I trust them immediately."

This site must look and feel MORE expensive than what every competitor has.  
When a prospect sees it, their first thought must be:

> "This costs $10,000+"

---

# VISUAL LANGUAGE — NON-NEGOTIABLE

## COLOR PALETTE

**(3 colors only. Nothing else. Ever.)**

| Purpose    | Color                                           | Hex       |
| ---------- | ----------------------------------------------- | --------- |
| Deep Navy  | backgrounds, cards, headers, text on light      | `#1a2744` |
| Warm Gold  | accents, CTA borders, highlights, active states | `#c9a96e` |
| Warm White | page backgrounds, text on dark, sections        | `#f9f6f0` |

---

## SUPPORTING NEUTRALS

**(support only, never dominant)**

| Usage                  | Value                         |
| ---------------------- | ----------------------------- |
| Body text on white     | `#1a1a1a`                     |
| Muted labels           | `#6b7280`                     |
| Divider lines on white | `rgba(0,0,0,0.08)`            |
| Divider lines on navy  | `rgba(255,255,255,0.12)`      |
| Box shadow             | `0 4px 20px rgba(0,0,0,0.08)` |

> Nothing heavier.

---

## WHAT YOU MUST NEVER DO WITH COLOR

- NO gradients on backgrounds (solid color blocks only)
- NO blue, teal, green, purple, red (even as accents)
- NO pure black (`#000`)
  - Use `#1a2744` or `#1a1a1a` instead
- NO pure white (`#fff`)
  - Use `#f9f6f0` instead
- NO navy gradients
  - Only solid `#1a2744`

---

# TYPOGRAPHY — NON-NEGOTIABLE

## Heading Font: Cormorant Garamond (serif)

### Use For

- H1
- H2
- H3
- Agent name
- Section titles
- Stat numbers
- Property prices

### Weights

- `400` — elegant
- `700` — bold headlines

### Character

Old-money serif. Commands trust and status.

---

## Body Font: Inter (sans-serif)

### Use For

- Body text
- Labels
- Buttons
- Navigation links
- Form fields
- Small text

### Weights

- `400`
- `500`
- `600`

### Character

Clean, modern. Readable at any size.

---

## Typography Rules

NEVER mix in other fonts.  
Two fonts. That's the rule.

---

## FONT SIZE SCALE

| Token  | Size   | Usage                                 |
| ------ | ------ | ------------------------------------- |
| `xs`   | `12px` | captions, fine print, compliance text |
| `sm`   | `14px` | form labels, nav links, metadata      |
| `base` | `16px` | body paragraphs, card descriptions    |
| `lg`   | `18px` | section subheadings, lead text        |
| `xl`   | `20px` | minor headings                        |
| `2xl`  | `24px` | property prices (gold)                |
| `3xl`  | `32px` | page headings, secondary titles       |
| `4xl`  | `48px` | primary section headings              |
| `5xl`  | `64px` | hero agent name                       |

---

## Line Heights

- Body: `1.5`
- Headings: `1.2`

Always.

---

# SPACING — LUXURY BREATHING ROOM

| Element                      | Specification                |
| ---------------------------- | ---------------------------- |
| Section vertical padding     | `80px desktop / 48px mobile` |
| Container horizontal padding | `40px`                       |
| Card padding                 | `24px`                       |
| Grid gap (cards)             | `32px`                       |
| Grid gap (text lists)        | `20px`                       |
| Button padding               | `12px 36px`                  |

---

## Luxury Design Rule

Luxury design = space.

Never crowd elements.

When in doubt:

> Add more white space.

---

# BUTTONS — EXACT SPECIFICATIONS

## Primary Button

Examples:

- “Schedule Showing”
- “Get Valuation”

### Default

- Border: `2px solid #c9a96e`
- Fill: transparent
- Text: `#c9a96e`

### Hover

- Background: `#c9a96e`
- Text: `#1a2744`

### Styling

- Padding: `12px 36px`
- Font: `Inter`
- Size: `15px`
- Weight: `500`
- Letter spacing: `0.5px`
- Border radius: `2px`
- Transition: `200ms ease-out`

### Rules

- NO shadows
- Almost sharp corners

---

## Secondary Button

Examples:

- “View Details”

### Default

- No border
- Text: `#c9a96e`
- Underline hidden

### Hover

- Underline appears
- `2px solid #c9a96e`
- Transition: `200ms`

### Typography

- Font: `Inter`
- Size: `14px`
- Weight: `500`

---

## Destructive / Muted Button

### Default

- No border
- Text: `#6b7280`

### Hover

- Text: `#1a2744`

### Typography

- Font: `Inter`
- Size: `14px`
- Weight: `400`

---

## BUTTON RULES

NEVER:

- Use solid filled colored buttons
- Use rounded corners larger than `4px`
- Use drop shadows on buttons

---

# CARDS — EXACT SPECIFICATION

Applicable To:

- Property cards
- Content cards
- CTA cards

---

## Base Style

| Property      | Value                         |
| ------------- | ----------------------------- |
| Background    | `#ffffff` or `#f9f6f0`        |
| Border        | `1px solid rgba(0,0,0,0.08)`  |
| Shadow        | `0 4px 20px rgba(0,0,0,0.06)` |
| Border radius | `4px`                         |

---

## Hover State

| Property    | Value                          |
| ----------- | ------------------------------ |
| Shadow      | `0 12px 40px rgba(0,0,0,0.12)` |
| Translate Y | `-4px`                         |
| Transition  | `250ms ease-out`               |

---

## Pricing

- Font: `Cormorant Garamond`
- Size: `24px`
- Weight: `700`
- Color: `#c9a96e`

---

## Address / Title

- Font: `Inter`
- Size: `16px`
- Weight: `500`
- Color: `#1a1a1a`

---

## Meta Information

Examples:

- beds
- baths
- sqft

### Style

- Font: `Inter`
- Size: `14px`
- Weight: `400`
- Color: `#6b7280`

---

# ANIMATIONS — CONTROLLED, NOT SHOWY

## Fade-In On Scroll

### Behavior

- `opacity: 0 → 1`
- `translateY: 20px → 0`

### Timing

- Duration: `500ms`
- Easing: `ease-out`

### Libraries

- `framer-motion`
- `react-intersection-observer`

### Stagger

- `80ms` delay between children

---

## Hover Transitions

### Duration

- `200ms ease-out`

### Properties

- color
- background
- shadow
- transform

---

## Count-Up Stats

### Timing

- `2000ms ease-out`

### Trigger

- Scroll into view
- Once only

### Libraries

- `react-intersection-observer`
- `useCountUp`

---

## Loading States

### Skeleton Shimmer

- Use Tailwind `animate-pulse`

### Shimmer Direction

- Left → right

### Colors

- `#e5e7eb → transparent`

---

## WHAT YOU NEVER DO WITH ANIMATION

- NO spring or bounce animations
- NO rotation effects
- NO parallax scrolling
- NO duration longer than `600ms`
- NO duration shorter than `150ms`
- Nothing flashy or attention-seeking

Animation should feel invisible and refined.

---

# IMAGERY RULES

## Hero Images

- Architectural photography
- Luxury homes
- Never people
- Never obvious stock photos

---

## Property Photos

- Real photography aesthetic
- No illustrations

---

## Agent Headshot

- Professional
- Natural background
- Not studio-white

---

## Neighborhood Images

- Aerial architecture
- Upscale residential streets
- Never tourist imagery

---

# UNSPLASH SEARCH QUERIES

## Hero

- `luxury home exterior Austin`
- `modern home architecture`

## Neighborhood

- `residential neighborhood aerial`
- `upscale street`

## Interior

- `luxury interior living room`
- `modern kitchen light`

---

# NEXT.JS IMAGE RULES

Always:

- Use `quality={85}`
- Set proper `sizes` prop

Never:

- Use raw `<img>` tags

---

# RESPONSIVE BEHAVIOR

## Mobile (<768px)

### Layout

- All grids collapse to 1 column

### Spacing

- `48px` vertical padding
- `20px` side padding

### Typography

- Reduce font sizes by `15%`

### Buttons

- Full-width

### Navigation

- Hamburger menu only
- No desktop nav visible

---

## Tablet (768px–1024px)

### Layout

- 2-column grids

### Spacing

- `60px` vertical padding
- `32px` side padding

### Typography

- Reduce font sizes by `8%`

---

## Desktop (1024px+)

- Full design system as specified
- Max container width: `1200px`
- Center aligned

---

## Testing Requirement

Always test at:

> `375px` width (iPhone SE)

before considering the design complete.

---

# WHAT THE SITE MUST FEEL LIKE

Open a bespoke `$10,000+` website for a top-performing luxury real estate agent.

The experience must feel:

- Quiet
- Spacious
- Confident
- Restrained
- Premium

Comparable brands:

- Rolls-Royce
- Bottega Veneta
- White-glove private banking

---

# WHAT IT MUST NOT FEEL LIKE

NOT:

- Template-looking
- Feature-heavy
- Busy
- Generic blue real-estate branding
- Zillow clone aesthetics

NOT:

- Web 2.0
- Excessive shadows
- Gradient banners
- Handshake stock photography

---

# FINAL DESIGN RULE

If any component looks like it could exist on:

- Wix
- Squarespace
- Generic real estate templates

→ redesign it completely.
