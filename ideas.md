# Sweet Flour Campaign Roadmap — Design Ideas

## Approach 1: Warm Artisan Editorial
<response>
<text>
**Design Movement:** Warm editorial / artisan bakery meets premium agency dashboard

**Core Principles:**
- Warm cream and chocolate brown palette echoing the Sweet Flour website header
- Script + serif typography pairing (Playfair Display + DM Sans) for brand authenticity
- Horizontal timeline with card-based campaign entries, not a spreadsheet
- Generous whitespace with warm off-white backgrounds and subtle grain texture

**Color Philosophy:**
- Background: warm cream #FBF7F2
- Primary: deep chocolate brown #3D1A0A (matches Sweet Flour nav)
- Accent: warm caramel #C8813A
- Seasonal highlights: soft pastels per occasion (pink Valentine, green Easter, etc.)
- Text: near-black #2C1A0E

**Layout Paradigm:**
- Left sidebar with quarter/month navigation
- Main area: horizontal Gantt-style timeline for campaigns
- Right drawer: campaign detail panel slides in on click
- Top bar: filters (channel, type, status) + view toggle (monthly/quarterly)

**Signature Elements:**
- Subtle flour/dot texture on sidebar
- Rounded pill badges for campaign types
- Soft drop shadows on cards (no hard borders)

**Interaction Philosophy:**
- Click any campaign row → detail drawer slides in from right
- Hover → card lifts with warm shadow
- Filter chips animate in/out

**Animation:**
- Framer Motion: cards fade+slide in on mount
- Drawer: spring slide from right
- Filter: smooth height collapse

**Typography System:**
- Display: Playfair Display (headings, section titles)
- Body: DM Sans (data, labels, filters)
</text>
<probability>0.08</probability>
</response>

## Approach 2: Modern Agency Dark Mode
<response>
<text>
**Design Movement:** Modern performance marketing agency — dark, data-dense, precise

**Core Principles:**
- Dark charcoal background with chocolate brown accent
- Monospace + sans-serif for data clarity
- Dense but scannable table-timeline hybrid
- Color-coded status system

**Color Philosophy:**
- Background: #1A1410 deep dark brown
- Cards: #2C2018
- Accent: #E8A84C warm gold
- Text: #F5EDE0 warm white

**Layout Paradigm:**
- Full-width timeline with sticky header
- Collapsible campaign groups
- Inline editing capability

**Typography System:**
- JetBrains Mono for data
- Inter for UI labels
</text>
<probability>0.05</probability>
</response>

## Approach 3: Soft Pastel Planning Board
<response>
<text>
**Design Movement:** Notion-meets-bakery planning board — soft, pastel, approachable

**Core Principles:**
- Soft pastel backgrounds per season
- Kanban-style column layout
- Illustrated seasonal icons
- Playful but professional

**Color Philosophy:**
- Background: #FAFAFA
- Seasonal columns: pastel tints
- Typography: Nunito rounded

**Layout Paradigm:**
- Kanban columns by month
- Drag-and-drop cards
- Seasonal color coding

**Typography System:**
- Nunito for headings
- Inter for body
</text>
<probability>0.07</probability>
</response>

---

## CHOSEN APPROACH: Approach 1 — Warm Artisan Editorial

**Rationale:** Matches Sweet Flour's existing brand identity (chocolate brown nav, warm cream tones, script logo). Feels premium and crafted, not generic. The horizontal timeline with drawer detail panel is the most functional for a campaign planning tool used by a client + media + creative team.
