# Scribbles | Kids Learning — Multi-Page Editorial Website Plan

An editorial, scroll-driven multi-page website for **Scribbles | Kids Learning** (Lucknow, India) that brings the brand's *"Learn. Understand. Express."* philosophy to life through a continuous pencil-drawn SVG learning path and interactive English literacy experiences.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Design & Interaction Decisions (Phase 1)**
> - **Instagram Content Presentation**: Curated post cards on *Parent Stories* and *Learning Journal* showcasing verified themes, early reading progress, and direct links to `@scribbles.lucknow`, without fabricating parent names, quotes, or photos.
> - **Admissions Enquiry Handoff**: Submitting the *Contact & Admissions* form validates parent input, formats a ready-to-send enquiry message with one-click copy, and provides a direct handoff button to Instagram DMs (`https://www.instagram.com/scribbles.lucknow/`).
> - **Interactive Learning Scope**: Full interactive experiences across *Phonics* (animated letter-to-word blending tiles), *Grammar* (interactive visual challenges for nouns, homophones, silent letters, punctuation, and spelling patterns), and *Reading Lab* (interactive *Reading Detective* comprehension experience).
> - **Logo Integration**: Seamless blending of the uploaded Scribbles logo mark (with its pencil, star, cloud, and rainbow details) onto the `#FFF8ED` Warm Paper header and footer canvas.

> [!NOTE]
> **Content Accuracy & Editorial Guardrails**
> No unverified fees, schedules, teacher biographies, phone/WhatsApp numbers, street addresses, or guaranteed curriculum outcomes will be added. The *Reading Detective* age range (4–7) is scoped strictly to that featured activity, and interactive website exercises will be clearly labelled as interactive demonstrations rather than official published worksheets.

---

## 1. Overview & Core Concept

- **What It Does**: A complete 12-page React web application presenting Scribbles' online learning (*Phonics*, *Communication*, *Grammar*), offline learning (*Early Learning*, *Tuition*), flagship *Reading Detective* lab, verified *Parent Stories*, editorial *Learning Journal*, and *Contact & Admissions* portal.
- **Target Audience**: Parents and guardians in Lucknow (and online families) seeking a patient, understanding-first, confidence-building approach to English literacy for their children, alongside curious young learners exploring interactive word and story activities.
- **Key Value**: Transforms static programme descriptions into a tactile, storybook-editorial journey. As parents scroll, a hand-drawn SVG path actively sketches the progression from single letter sounds to blended words, story comprehension, and confident expression.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **The Learning Path Discovery (Home & About)**: Visitors land on a full-viewport Warm Paper hero crossed by an animated pencil-drawn SVG route. Scrolling with Lenis + GSAP ScrollTrigger draws the path via `stroke-dasharray`/`stroke-dashoffset` and guides an illustrated pencil/star traveler along `SVGPathElement.getPointAtLength()` across five checkpoints (*01. Discover → 02. Explore → 03. Create → 04. Understand → 05. Express*).
2. **Programme Exploration (Programmes → 5 Dedicated Pages)**: Parents navigate via the clean top bar *Programmes* dropdown or visual editorial grids into dedicated pages for *Phonics*, *Communication*, *Grammar*, *Early Learning*, and *Tuition*.
3. **Interactive Learning Playgrounds**:
   - *Phonics*: Step-by-step sound-to-word interactive tiles demonstrating `C-A-T` and `D-O-G` blending and decoding.
   - *Grammar*: Playful, interactive exercises covering naming words (nouns), homophones (`KNIGHT` / `NIGHT`), silent letters, punctuation marks, and spelling patterns (`sweep → swept`).
   - *Reading Lab (Reading Detective)*: Detective-themed comprehension showcase for ages 4–7 with three progressive stages, sample passages, clickable clue highlights, and interactive thinking-question cards with instant constructive feedback.
4. **Social Proof & Editorial Journal (Parent Stories & Learning Journal)**: Filterable magazine-style journal (*Reading Tips*, *Phonics*, *Grammar*, *Communication*, *Learning Through Play*) and verified parent feedback cards linking directly to `@scribbles.lucknow`.
5. **Admissions Enquiry (Contact & Admissions)**: Accessible form capturing parent/guardian name, email, preferred programme, preferred learning format (Online / Offline), and optional message—generating a formatted DM template and opening Instagram.

### Visual Identity & Theme
- **Aesthetic Direction**: Warm editorial storybook meets contemporary creative studio—airy asymmetric grids, generous negative space, organic SVG image masks, curved separators, and hand-drawn ink annotations.
- **Color Palette & Mood** (60-30-10 discipline):
  - *60% Dominant Neutral Canvas*: Warm Paper (`#FFF8ED`) with crisp paper grain subtlety.
  - *30% Structural Surfaces*: Soft Mint (`#DDE9D9`), Sky Blue (`#C5E3EC`), hairline ink borders (`rgba(38, 53, 47, 0.12)`), and Deep Ink (`#26352F`) typography.
  - *10% Controlled Accents*: Forest Green (`#466B56`) for primary CTAs and active states, Sunflower (`#F5CB65`) and Soft Coral (`#EF9B82`) for educational highlights and interactive states (always paired with text/icon labels, never hue-only).
- **Typography & Hierarchy**:
  - *Display*: `Fraunces` (expressive editorial headings with `text-wrap: balance`, `clamp(2.25rem, 4.5vw, 4.25rem)`).
  - *Body & UI*: `Nunito Sans` (high-legibility reading prose, clean single-line navigation controls).
  - *Handwritten Annotations*: `Caveat` (sparing margin notes and playful educational callouts).
- **Component & Anti-Slop Discipline**:
  - Clean 3-zone top bar (`[Scribbles Logo]` — `[About, Programmes ▾, Reading Lab, Parent Stories, Contact]` — `[Enquire Now]`) transitioning smoothly from transparent to solid Warm Paper on scroll.
  - Static metadata rendered as clean unboxed typography with `·` or `/` separators (zero static pill badges); interactive category filters rendered as clean segmented `<button>` controls.
  - Custom hand-crafted SVG educational illustrations (open books, letter tiles, magnifying glass, speech bubbles, pencil path markers) instead of generic stock photography or unverified classroom photos.

### Interactive Feedback & Motion
- **Scroll-Linked Path Engine**: Synchronized Lenis smooth scroll + GSAP ScrollTrigger scrub driving SVG path drawing, moving traveler coordinates, organic mask reveals, and staggered editorial entrances.
- **Responsive & Accessible Motion**: Dedicated simplified vertical path composition for mobile/tablet viewports; full `prefers-reduced-motion` support that renders all paths, illustrations, and content cleanly in their resting state without scroll-driven motion.
- **Micro-Interactions**: Hand-drawn SVG underline reveals, gentle hovering alphabet tiles, animated directional arrows on CTAs, optional subtle desktop pointer follower, and clean route transitions.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Scroll-Path Architecture via Pure GSAP + Native SVG Geometry**
  - *Chosen Approach*: Use standard GSAP ScrollTrigger `scrub` combined with native `SVGPathElement.getTotalLength()` and `getPointAtLength()`, recalculated safely via `ResizeObserver` and GSAP `matchMedia()`.
  - *Why*: Delivers responsive, award-grade path-following animations across desktop and mobile without relying on paid GSAP plugins, while cleanly isolating lifecycle teardown in React hooks.
  - *Alternatives Considered*: Static CSS keyframe animations (rejected because path progress must respond directly to scroll position).

- **Decision 2: Bespoke Editorial SVG Illustrations Over Stock Photography**
  - *Chosen Approach*: Pair the real uploaded Scribbles brand logo with custom-crafted, cohesive vector illustrations (books, sound tiles, detective clues, speech bubbles, paper textures).
  - *Why*: Preserves 100% authenticity with the brand's real identity—avoiding fabricated student/teacher images or generic preschool stock clichés—while ensuring instant load times and zero broken image URLs.
  - *Alternatives Considered*: Generating realistic classroom imagery (rejected per brand authenticity rules).

- **Decision 3: Client-Side Instagram DM Handoff for Admissions**
  - *Chosen Approach*: Validate enquiries client-side, format a structured message block with one-click clipboard copy, and link directly to `https://www.instagram.com/scribbles.lucknow/`.
  - *Why*: Matches Scribbles' real admissions workflow (Instagram DMs) transparently without inventing backend email servers, phone numbers, or fake scheduling calendars.

- **Decision 4: 12 Independent Routes with Shared Layout Shell & Dynamic SEO Metadata**
  - *Chosen Approach*: Client-side routing via `react-router-dom` across all 12 dedicated routes, paired with a reusable document-head metadata manager updating `<title>`, meta description, Open Graph tags, and verified Lucknow LocalBusiness JSON-LD per route.
  - *Why*: Ensures every page is independently linkable, bookmarkable, SEO-ready, and uniquely composed while sharing consistent navigation, Lenis/GSAP lifecycle, and footer.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Hierarchy

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                         Application Shell & Routing                       │
│   BrowserRouter ──▶ Lenis + GSAP ScrollTrigger Sync ──▶ PageTransition    │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌───────────────────┐   ┌───────────────────────┐   ┌───────────────────┐
│   Global Chrome   │   │   Scroll SVG Engine   │   │   Route Metadata  │
│                   │   │                       │   │                   │
│ • Navbar (3-zone  │   │ • ScrollPath          │   │ • Title & Meta    │
│   + Programmes    │   │   (getPointAtLength   │   │ • OpenGraph Tags  │
│   dropdown/mobile)│   │    + stroke-dashoffset│   │ • Verified Local  │
│ • Footer          │   │    + resize/reduced-  │   │   Business JSON-LD│
│ • CustomCursor    │   │    motion awareness)  │   │                   │
└───────────────────┘   │ • PathCheckpoint      │   └───────────────────┘
                        │ • AnimatedSection     │
                        └───────────┬───────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────────┐     ┌────────────────────┐     ┌──────────────────────┐
│ Editorial Pages  │     │  Interactive Labs  │     │  Stories & Enquiries │
│                  │     │                    │     │                      │
│ • Home (8 sects) │     │ • Phonics (Sound   │     │ • Parent Stories     │
│ • About          │     │   → Word Tiles)    │     │   (Instagram cards)  │
│ • Programmes     │     │ • Grammar (5 Mini  │     │ • Learning Journal   │
│ • Communication  │     │   Visual Labs)     │     │   (Category filters) │
│ • Early Learning │     │ • Reading Lab      │     │ • Contact &          │
│ • Tuition        │     │   (Reading         │     │   Admissions Form    │
│                  │     │   Detective Quiz)  │     │   (DM Handoff)       │
└──────────────────┘     └────────────────────┘     └──────────────────────┘
```

### Data Model & Content Separation
- **Structured Content Modules**: All verified brand philosophy, programme descriptions, Reading Detective sample passages, grammar challenge sets, journal categories, and Instagram-linked story records live in typed data modules separated from presentational components.
- **Interactive State**:
  - *Phonics Blending*: Selected sound tile state, step-by-step word assembly (`C + A + T → CAT`, `D + O + G → DOG`), and audio-visual emphasis cues.
  - *Grammar Challenges*: Per-concept interactive toggles and answer verification for Nouns, Homophones (`KNIGHT`/`NIGHT`), Silent Letters, Punctuation, and Spelling Patterns (`sweep → swept`).
  - *Reading Detective Lab*: Stage selector (3 difficulty stages), passage clue reveal toggles, multiple-choice thinking questions, progress tracking, and constructive explanation feedback.
  - *Learning Journal*: Active category filter state (`All`, `Reading Tips`, `Phonics`, `Grammar`, `Communication`, `Learning Through Play`).
  - *Admissions Form*: Controlled fields with inline validation, generated DM message preview, clipboard copy state, and direct Instagram launch action.

### Interactive Component & State Mapping
- **Navigation & Dropdown**: Desktop hover/click dropdown for *Programmes* (keyboard accessible with `Escape` and arrow/tab support) and full-screen accessible mobile drawer preserving $\ge 44\text{px}$ tap targets and $\le 15\%$ sticky header height.
- **ScrollPath Hook**: Computes responsive path dimensions, registers GSAP ScrollTrigger `scrub` timeline inside `gsap.context()` for clean unmount cleanup, and bypasses scroll transforms automatically when `prefers-reduced-motion: reduce` is active.
- **SEO & Accessibility**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), skip-to-content link, visible `focus-visible` outlines in Forest Green, WCAG AA contrast across `#FFF8ED` and `#26352F`, and per-route title/meta/JSON-LD updates.
