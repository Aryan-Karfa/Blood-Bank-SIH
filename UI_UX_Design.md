# SMART BLOOD-BANK INVENTORY & DEMAND INTELLIGENCE PLATFORM

## UX / UI DESIGN SYSTEM

**Demo / Internal Codename:** RAKTKOSH
**Official Product Name:** TBD
**Project Context:** Smart India Hackathon 2026
**Document Type:** UX / UI Design System
**Version:** 1.0
**Status:** Prototype Design Specification

---

# 1. DESIGN PURPOSE

This document defines the complete visual and interaction language for the prototype.

The objective is to create an interface that feels like a **serious healthcare operations and decision-support product**, rather than a generic AI-generated SaaS website.

The design must communicate:

* trust
* operational seriousness
* clarity
* information density
* intelligence
* reliability
* human oversight
* healthcare context

The visual system should make the prototype feel like a product that could plausibly evolve into a real operational platform.

---

# 2. PRIMARY DESIGN PRINCIPLE

## FUNCTION BEFORE DECORATION

Every visual element must serve at least one of the following purposes:

```text
INFORM
NAVIGATE
COMPARE
WARN
EXPLAIN
CONFIRM
ACT
```

Decorative elements that do not improve understanding should not be introduced merely to make the interface appear sophisticated.

---

# 3. DESIGN PERSONALITY

The product should feel:

### Serious

It deals with healthcare resources and time-sensitive decisions.

### Operational

The interface should feel designed for people doing actual work.

### Calm

Critical information should stand out because of hierarchy, not because the entire interface is visually loud.

### Data-rich

Tables, timelines, charts, statuses, and structured information are central components.

### Human-controlled

AI assists the operator. It does not visually dominate the interface or imply autonomous authority.

### Credible

The interface should avoid exaggerated startup aesthetics and promotional visual language.

---

# 4. VISUAL DIRECTION

The overall visual direction is:

> **Modern clinical operations interface with restrained editorial design and strong information hierarchy.**

It should sit visually somewhere between:

```text
Healthcare Operations
        +
Command Center
        +
Data Intelligence
        +
Institutional Software
```

It should NOT resemble:

```text
Generic SaaS
+
AI Startup Landing Page
+
Crypto Dashboard
+
Consumer Health App
```

---

# 5. CORE DESIGN RULE

The application should look like a **working operational system**.

Not:

> a collection of marketing cards.

Therefore:

* tables are preferred when information is tabular
* charts are preferred when information is temporal
* timelines are preferred when information is sequential
* status indicators are preferred when information represents state
* drawers and detail panels are preferred when deeper information is needed
* cards are used selectively

---

# 6. DESIGN CONSTRAINTS

The following are hard constraints for the prototype.

## 6.1 PROHIBITED VISUAL PATTERNS

The prototype must NOT use:

```text
1. Harsh gradients
2. Lucide icons
3. Pure white backgrounds
4. Rainbow coloring
5. Drop shadows
6. Three generic feature cards in a row
7. Emojis
8. Liquid glass
9. Em dashes
10. Inter
11. Geist
12. Space Grotesk
13. Coloured left stripes as decorative accents
14. Fake testimonials
15. Bento grids
16. Terminal-window sections
17. "It's not X, it's Y" copywriting
18. Checkmark bullet lists
19. Three pricing tiers
20. Purple + black AI-SaaS aesthetic
21. Missing skeleton loaders
22. Radial orbs
23. Dot-grid backgrounds
24. Sparkle icons
25. Animated arrows used as decoration
26. Missing Terms of Service
27. Missing Privacy Policy
28. Unnecessary hover animations
29. Neon colors
30. Generic pastel UI
```

These restrictions are considered part of the product design specification.

---

# 7. BACKGROUND SYSTEM

Pure white should not be used as the primary application background.

The interface should use a restrained warm-neutral or cool-neutral foundation.

Recommended direction:

```text
Primary Background
#F3F1EC

Secondary Surface
#E9E7E1

Primary Text
#202321

Secondary Text
#626661

Border
#C9C7C0
```

These values are starting points and may be refined during implementation.

The final palette must remain restrained.

---

# 8. SEMANTIC COLOR SYSTEM

Color should communicate **meaning**, not decoration.

Recommended semantic categories:

```text
NORMAL
Muted neutral / controlled green

LOW
Muted blue

MODERATE
Muted amber

HIGH
Deep orange / amber

CRITICAL
Deep red

INFORMATION
Muted blue

SUCCESS
Deep green
```

Color must never be used simply because a section needs visual variety.

---

# 9. COLOR RULE

The interface should generally use:

```text
NEUTRAL BASE
      +
ONE PRIMARY ACCENT
      +
SEMANTIC STATUS COLORS
```

It should NOT use:

```text
BLUE + PURPLE + PINK + GREEN + ORANGE
```

unless those colors have an explicit semantic purpose.

---

# 10. TYPOGRAPHY

The typography must avoid the common AI/SaaS font combination.

Explicitly prohibited:

```text
Inter
Geist
Space Grotesk
```

---

## Recommended Primary Typeface

### IBM Plex Sans

Use for:

* navigation
* body copy
* labels
* tables
* buttons
* UI controls

It provides a technical and institutional character while remaining highly readable.

---

## Recommended Supporting Typeface

### IBM Plex Mono

Use sparingly for:

* IDs
* timestamps
* transaction references
* system values
* audit identifiers
* technical metadata

It should NOT be used for normal body text.

---

# 11. TYPOGRAPHIC HIERARCHY

Recommended hierarchy:

```text
Display
48–64px

Page Heading
32–40px

Section Heading
22–28px

Component Heading
16–20px

Body
14–16px

Secondary
12–14px

Metadata
11–13px
```

The exact values may adapt to screen size.

---

# 12. TYPOGRAPHY PRINCIPLE

Typography should establish hierarchy before color does.

A user should be able to scan:

```text
WHAT IS IMPORTANT?
WHAT NEEDS ATTENTION?
WHAT CAN I DO?
WHAT IS SUPPORTING INFORMATION?
```

without relying entirely on color.

---

# 13. SPACING SYSTEM

Use a consistent spacing scale.

Base unit:

```text
4px
```

Preferred spacing values:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Spacing should create hierarchy rather than decorative emptiness.

---

# 14. GRID SYSTEM

Desktop application:

```text
12-column grid
```

Recommended:

```text
Page margins
32–48px

Column gap
16–24px
```

Dashboard sections should align to the same underlying grid.

---

# 15. LAYOUT PRINCIPLE

Avoid isolated floating elements.

Prefer:

```text
PAGE
 ├── HEADER
 ├── CONTEXT
 ├── PRIMARY CONTENT
 │    ├── MAIN
 │    └── SUPPORTING
 └── ACTION / DETAIL
```

The page should read from:

**context → information → interpretation → action.**

---

# 16. CORNER RADIUS

Soft modern SaaS-style rounded cards are prohibited.

Use restrained radius:

```text
2px
4px
6px
```

Large cards should generally use:

```text
0–4px
```

depending on component.

The system should feel structured rather than bubbly.

---

# 17. BORDERS

Borders are an important structural tool.

Use borders to:

* divide sections
* define tables
* separate navigation
* establish panels
* indicate selected states
* organize dense information

Preferred border weight:

```text
1px
```

Use heavier borders only when there is a functional reason.

---

# 18. NO DROP SHADOWS

Drop shadows are prohibited.

Depth should instead be created through:

```text
Border
+
Background contrast
+
Spacing
+
Typography
```

This gives the interface a more institutional and deliberate appearance.

---

# 19. CARDS & PANELS

Cards should not be the default container for every piece of information.

Use cards when they represent:

* a distinct operational object
* a summary
* an alert
* an action
* a specific analytical unit

Avoid:

```text
CARD
CARD
CARD
```

for every section of the interface.

---

# 20. DASHBOARD STRUCTURE

The dashboard should prioritize operational information.

Recommended structure:

```text
┌─────────────────────────────────────────────┐
│ NETWORK STATUS                              │
├─────────────────────────────────────────────┤
│                                             │
│ CRITICAL CONDITIONS                         │
│                                             │
├───────────────────────────┬─────────────────┤
│                           │                 │
│ DEMAND / FORECAST         │ ACTIONS        │
│                           │                 │
├───────────────────────────┴─────────────────┤
│                                             │
│ NETWORK INVENTORY                           │
│                                             │
├────────────────────────────┬────────────────┤
│ EXPIRY / RISK              │ REQUESTS       │
└────────────────────────────┴────────────────┘
```

The exact arrangement can evolve during implementation.

---

# 21. NAVIGATION

The primary application navigation should be persistent on desktop.

Primary destinations:

```text
Dashboard
Inventory
Requests
Transfers
Forecast
Risk
Recommendations
Simulation
Audit
```

Navigation should use:

* text
* hierarchy
* spacing
* subtle active state

rather than decorative iconography.

---

# 22. ICONOGRAPHY

## No Lucide Icons

Lucide should not be used as the default icon library.

The preferred approach is:

### Minimal iconography.

If an icon is not necessary for understanding, do not add one.

Where symbols are necessary, use a carefully selected, consistent icon set or simple custom SVGs.

The interface should not contain an icon beside every label.

---

# 23. STATUS INDICATORS

Status should use:

```text
small marker
+
text label
```

Example:

```text
● CRITICAL
● HIGH
● MODERATE
● NORMAL
```

Do not rely solely on the marker's color.

---

# 24. BUTTONS

Buttons should be functional and restrained.

Primary actions:

```text
APPROVE TRANSFER
RUN SIMULATION
VIEW RECOMMENDATION
MATCH SUPPLY
```

Secondary actions:

```text
VIEW DETAILS
MODIFY
CANCEL
RESET
```

Avoid oversized pill-shaped CTA buttons.

---

# 25. BUTTON SHAPE

Buttons should generally use:

```text
2–4px radius
```

with clear borders.

Avoid:

```text
pill buttons
gradient buttons
glowing buttons
floating buttons
```

unless a very specific functional need exists.

---

# 26. TABLES

Tables are a primary component.

They should be used for:

* inventory
* requests
* transfers
* audit logs

Tables should prioritize:

* alignment
* readability
* consistent column widths
* clear headers
* status visibility
* useful density

---

# 27. TABLE INTERACTION

Rows may be selectable.

Selection should be communicated through:

* background change
* border
* typography
* focus state

Not dramatic animation.

Selecting a row may open:

```text
DETAIL DRAWER
```

instead of navigating away from the current context.

---

# 28. DETAIL DRAWERS

Drawers should be used when users need deeper information without losing the current operational context.

Potential uses:

```text
Inventory Detail
Request Detail
Transfer Detail
Risk Detail
Recommendation Detail
```

A drawer should contain:

```text
IDENTITY
STATUS
KEY INFORMATION
CONTEXT
RELATED INFORMATION
ACTION
```

---

# 29. MODALS

Use modals sparingly.

Appropriate uses:

* approval confirmation
* rejection confirmation
* simulation reset
* destructive action
* important acknowledgement

Avoid using modals for ordinary information that could be shown inline or in a drawer.

---

# 30. FORMS

Forms should be concise and operational.

Use:

```text
Label
Input
Supporting context
Validation
```

Avoid excessive visual decoration.

Inputs should have clear:

* default
* focus
* error
* disabled
* filled

states.

---

# 31. CHART DESIGN

Charts should prioritize analytical clarity.

Avoid:

* excessive colors
* gradients
* 3D effects
* decorative chart elements
* excessive animation

---

# 32. FORECAST CHART

The forecast chart should visually distinguish:

```text
HISTORICAL
─────────────
solid line

CURRENT
─────────────
transition point

FORECAST
─────────────
dashed / visually differentiated line
```

The chart should allow users to understand:

* where the current state ends
* what is projected
* where risk may emerge

---

# 33. RISK VISUALIZATION

Risk should not simply be represented by giant red numbers.

Instead use:

```text
RISK LEVEL
+
TIME HORIZON
+
CAUSE
+
IMPACT
+
AVAILABLE OPTIONS
```

Example:

```text
CRITICAL

Projected shortage in 18 hours.

Primary driver:
Emergency demand increase.

Network alternative:
Available.
```

---

# 34. AI RECOMMENDATION DESIGN

AI output must look like **decision support**, not a chatbot.

Avoid:

* chatbot bubbles
* sparkle icons
* "AI magic"
* glowing cards
* excessive purple
* conversational gimmicks

Instead present:

```text
RECOMMENDATION

Suggested Action

Transfer 20 O− PRBC

FROM
Hospital B

TO
Hospital A

WHY

Hospital A is projected to fall
below the operational threshold
within the forecast horizon.

EXPECTED IMPACT

Risk reduction:
CRITICAL → MODERATE
```

---

# 35. EXPLAINABILITY

Every important recommendation should provide a clear explanation.

The user should be able to answer:

```text
WHY THIS FACILITY?
WHY THIS COMPONENT?
WHY THIS QUANTITY?
WHY NOW?
WHAT IS THE EXPECTED EFFECT?
```

This is central to the credibility of the product.

---

# 36. HUMAN-IN-THE-LOOP DESIGN

The interface must visually distinguish:

```text
SYSTEM SUGGESTION
```

from:

```text
HUMAN DECISION
```

Recommended flow:

```text
SYSTEM ANALYSIS
       ↓
RECOMMENDATION
       ↓
OPERATOR REVIEW
       ↓
APPROVE / MODIFY / REJECT
       ↓
ACTION
```

The system should never visually imply that the AI independently performed a real-world transfer.

---

# 37. SIMULATION MODE

Simulation must have a distinct but restrained visual identity.

A persistent indicator should communicate:

```text
SIMULATION MODE
SYNTHETIC DATA
```

The design should not resemble a gaming interface.

---

# 38. SIMULATION SCENARIO SELECTOR

Scenarios:

```text
Normal Operations

Emergency Demand Spike

Supply Disruption

Expiry Cluster

Multi-Hospital Shortage
```

Each scenario should communicate:

* what will change
* affected facilities
* expected operational effect

---

# 39. SIMULATION FEEDBACK

After triggering a scenario, the interface should show the chain of consequences.

Example:

```text
DEMAND INCREASED
      ↓
FORECAST UPDATED
      ↓
RISK ESCALATED
      ↓
NETWORK ANALYSIS COMPLETED
      ↓
RECOMMENDATION GENERATED
```

This is more useful than simply showing an animation.

---

# 40. LOADING STATES

Skeleton loaders are REQUIRED.

They should appear when simulated data is being loaded or when a simulation is processing.

Skeletons should:

* match the actual layout
* avoid excessive animation
* avoid shimmer effects that feel decorative
* transition naturally into content

---

# 41. EMPTY STATES

Empty states should provide useful information.

Example:

```text
NO ACTIVE RECOMMENDATIONS

The current network state does not
require an immediate recommended action.
```

Avoid:

* emojis
* cartoon illustrations
* excessive decoration

---

# 42. ERROR STATES

Errors should be direct.

Example:

```text
UNABLE TO LOAD INVENTORY

The simulated inventory data could not
be loaded.

RETRY
```

No dramatic red-screen treatment.

---

# 43. SUCCESS STATES

Success states should confirm what happened.

Example:

```text
TRANSFER APPROVED

20 units of O− PRBC have been
allocated in the simulation.

Inventory and risk status updated.
```

---

# 44. ANIMATION

Animation should be functional.

Allowed:

* subtle state transitions
* drawer opening
* modal appearance
* chart update
* table state update
* navigation transition

Avoid:

* animated arrows
* bouncing buttons
* floating objects
* excessive hover movement
* attention-seeking animations

---

# 45. HOVER BEHAVIOUR

Hover states should primarily communicate:

```text
INTERACTIVE
```

They should not transform the visual appearance dramatically.

No:

```text
scale-up
lift
glow
shadow
bounce
```

as default interaction patterns.

---

# 46. DATA DENSITY

This is an operational product.

The interface should not be afraid of information density.

However:

> Density must remain structured.

Use:

* hierarchy
* whitespace between groups
* alignment
* separators
* typography

to keep dense information readable.

---

# 47. CONTENT DESIGN

Copy should be:

* direct
* precise
* operational
* neutral
* understandable

Avoid:

* exaggerated marketing language
* startup clichés
* AI buzzwords
* dramatic claims
* unnecessary metaphors

---

# 48. PROHIBITED COPY STYLE

Do not use:

> "It's not X. It's Y."

Do not use:

> "The future of..."

Do not use:

> "Revolutionizing..."

Do not use:

> "Powered by cutting-edge AI..."

Do not use:

> "Unlock..."

Do not use:

> "Supercharge..."

The interface should communicate what the system does rather than advertise it.

---

# 49. LANDING PAGE DESIGN

The landing page should be product-oriented.

Recommended structure:

```text
HEADER
   ↓
CORE PROPOSITION
   ↓
REAL PRODUCT VISUAL
   ↓
PROBLEM CONTEXT
   ↓
OPERATIONAL WORKFLOW
   ↓
SIMULATION PREVIEW
   ↓
PRODUCT ENTRY
   ↓
FOOTER
```

Avoid:

```text
Hero
↓
Three Feature Cards
↓
Testimonials
↓
Pricing
↓
Newsletter
```

That structure is explicitly prohibited for this project.

---

# 50. PRODUCT VISUALIZATION ON LANDING

The landing page should show the actual application.

Possible visualization:

```text
NETWORK STATUS

Hospital A
CRITICAL

Hospital B
STABLE

--------------------------------

Forecast
████████████

--------------------------------

Recommended Transfer
Hospital B → Hospital A
20 × O− PRBC
```

The product itself should be the visual proof.

---

# 51. FOOTER

The footer should include:

```text
Product
Documentation / Demo

Prototype Status

Privacy

Terms

Synthetic Data Notice
```

No fake social links or fake company information.

---

# 52. PRIVACY & TERMS

The prototype must include:

```text
/privacy
/terms
```

These pages should clearly communicate:

* prototype status
* synthetic data
* no real patient data
* no real hospital transactions
* no production guarantees

---

# 53. RESPONSIVE DESIGN

## Desktop

Primary design target.

The full operational workspace should be visible.

---

## Tablet

Content should reorganize rather than simply shrink.

---

## Mobile

Prioritize:

```text
Critical Risk
↓
Requests
↓
Recommendations
↓
Inventory
↓
Supporting Data
```

Complex tables may become:

```text
stacked records
```

or horizontally scrollable tables where appropriate.

---

# 54. ACCESSIBILITY

The design must maintain:

* sufficient contrast
* readable font sizes
* visible focus states
* semantic labels
* keyboard accessibility
* accessible form controls
* non-color-only status communication

Critical information should always have a textual representation.

---

# 55. INFORMATION HIERARCHY

Every screen should answer:

### Level 1

**What is happening?**

### Level 2

**Why is it happening?**

### Level 3

**What should I consider doing?**

### Level 4

**What supporting information explains it?**

This hierarchy should remain consistent across the product.

---

# 56. SCREEN COMPOSITION RULE

A screen should generally contain:

```text
CONTEXT
   ↓
PRIMARY INFORMATION
   ↓
INTERPRETATION
   ↓
ACTION
```

Not:

```text
TITLE
↓
RANDOM CARDS
↓
RANDOM CHART
↓
RANDOM BUTTON
```

---

# 57. CRITICAL INFORMATION PRIORITY

When multiple pieces of information compete for attention:

```text
CRITICAL RISK
      ↓
ACTION REQUIRED
      ↓
TIME-SENSITIVE INFORMATION
      ↓
CURRENT STATE
      ↓
ANALYTICS
      ↓
SECONDARY DETAILS
```

This hierarchy should influence both layout and typography.

---

# 58. OPERATIONAL STATUS LANGUAGE

Use consistent status vocabulary across the entire application.

Recommended:

```text
NORMAL
LOW
MODERATE
HIGH
CRITICAL
PENDING
IN REVIEW
APPROVED
REJECTED
IN TRANSIT
COMPLETED
EXPIRED
```

Avoid inconsistent synonyms.

For example, do not use:

```text
Critical
Danger
Severe
Urgent
Extreme
```

interchangeably.

---

# 59. MICROCOPY

Prefer:

```text
VIEW RISK
VIEW DETAILS
APPROVE TRANSFER
REVIEW RECOMMENDATION
MATCH SUPPLY
RUN SIMULATION
RESET SCENARIO
```

Avoid:

```text
Let's go
Explore now
See what's happening
Make magic
Try it
```

The interface should feel operational.

---

# 60. DESIGN SYSTEM PRINCIPLE FOR AI

AI should be **quietly integrated** into the product.

The system should not repeatedly advertise:

```text
AI
AI
AI
AI
```

Instead, users should experience intelligence through:

* forecasts
* risk detection
* recommendations
* explanations
* prioritization

The intelligence should be evident from the product behavior.

---

# 61. VISUAL DIFFERENTIATION

The product should distinguish itself through:

### Information architecture

rather than decorative effects.

### Data relationships

rather than gradients.

### Operational workflows

rather than marketing sections.

### Explainability

rather than AI branding.

### Simulation

rather than static screenshots.

---

# 62. DESIGN QUALITY CHECK

Before approving any screen, ask:

```text
1. Does this look like operational software?

2. Is every visual element useful?

3. Is the information hierarchy obvious?

4. Could this screen exist without decorative AI aesthetics?

5. Are colors semantic?

6. Are borders doing useful structural work?

7. Is the typography readable?

8. Is the screen too card-heavy?

9. Does anything look generated purely for visual decoration?

10. Can a user understand what action to take?
```

If the answer to any question is unfavorable, revise the screen.

---

# 63. ANTI-VIBE-CODING FINAL CHECKLIST

Before finalizing the prototype:

```text
[ ] No harsh gradients
[ ] No Lucide icon system
[ ] No pure white application background
[ ] No rainbow UI
[ ] No drop shadows
[ ] No generic 3-card feature section
[ ] No emojis
[ ] No liquid glass
[ ] No em dashes
[ ] No Inter
[ ] No Geist
[ ] No Space Grotesk
[ ] No decorative coloured left stripes
[ ] No fake testimonials
[ ] No bento grid
[ ] No terminal window
[ ] No "It's not X, it's Y"
[ ] No checkmark bullet marketing
[ ] No pricing tiers
[ ] Actual product demo present
[ ] No soft generic rounded cards
[ ] No purple/black AI aesthetic
[ ] Skeleton loaders implemented
[ ] No radial orbs
[ ] No dot grids
[ ] No sparkle icons
[ ] No decorative animated arrows
[ ] Privacy page exists
[ ] Terms page exists
[ ] No unnecessary hover animations
[ ] No neon colors
[ ] No generic pastel palette
```

---

# 64. FINAL DESIGN DEFINITION

The RAKTKOSH prototype should feel like:

```text
A SERIOUS
HEALTHCARE OPERATIONS SYSTEM

WITH

DATA-DENSE INTERFACES
+
CLEAR INFORMATION HIERARCHY
+
RESTRAINED VISUAL DESIGN
+
EXPLAINABLE INTELLIGENCE
+
HUMAN CONTROL
+
REAL INTERACTION
```

The design should not attempt to impress users through visual effects.

It should impress them through **clarity, realism, coherence, and demonstrated intelligence.**

---

# 65. DESIGN NORTH STAR

The final visual experience should communicate one fundamental idea:

> **This looks like a system people could actually work with.**

Every design decision should support that goal.

---

# 66. DOCUMENT RELATIONSHIP

This UX/UI Design System defines **how the product should look and behave visually**.

It works alongside:

```text
PRODUCT BRIEF
      ↓
PROTOTYPE PRD
      ↓
UX / UI DESIGN SYSTEM
      ↓
INFORMATION ARCHITECTURE
      ↓
MOCK DATA & DATA MODEL
      ↓
INTELLIGENCE & SIMULATION
      ↓
DEMO SCRIPT
```

The PRD defines **what must exist**.

This document defines **how it should be experienced**.
