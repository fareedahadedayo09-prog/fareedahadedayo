# AI Automation Engineering Portfolio

A complete, responsive personal portfolio for an aspiring AI Automation Engineer and workflow builder.
Static, no backend, no paid services, deployable on Vercel's free tier.

Built with React 18, React Router 6, TypeScript and Vite. The production bundle is one JS file
(~87 kB gzipped) and one CSS file (~5 kB gzipped). No third-party scripts are loaded for icons,
logos or the calculator.

---

## 1. Quick start

```bash
cd portfolio
npm install
npm run dev        # http://localhost:5173
```

Other commands:

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # type-check only
```

---

## 2. What is on the site

| Route | Page |
| --- | --- |
| `/` | Hero with portrait, selected projects, engineering approach, full tool stack, interactive ROI calculator, demonstrations, dashboard evidence, privacy section, about, contact, practice-audit teaser |
| `/projects` | Projects index with status conventions |
| `/projects/:slug` | One case study per project, 14 fixed sections |
| `/audit` | Operations audit method (7 steps), supporting tools, sample documents, ROI calculator, CTA |
| `/audit/velara-skin-co` | Fictional practice audit demonstrating the method |
| `*` | 404 page |

Project slugs: `cod-order-confirmation`, `lead-qualification`, `returns-handler`, `invoice-extractor`.

Every internal link is wired. Buttons with no configured destination render as a clearly disabled
"Coming soon" control rather than a button that looks clickable and does nothing.

---

## 3. Project structure

```
portfolio/
├─ index.html              Meta tags, Open Graph, Twitter cards, font links
├─ vercel.json             Vercel framework, build command, SPA rewrites
├─ netlify.toml            Same for Netlify
├─ vite.config.ts
├─ public/
│  ├─ portrait.svg         THE PORTRAIT PLACEHOLDER - replace this
│  ├─ favicon.svg
│  ├─ og-image.svg         Social sharing image
│  └─ screenshots/         Put future screenshots here (create the folder)
└─ src/
   ├─ data/                ALL CONTENT LIVES HERE
   │  ├─ site.ts           Personal details, portrait path, contact, CTAs, links
   │  ├─ projects.ts       The four projects, full case studies, statuses
   │  ├─ tools.ts          Tool stack in three tiers with experience levels
   │  ├─ audit.ts          Audit method + the fictional Velara practice audit
   │  ├─ calculator.ts     ROI calculator fields and formulas
   │  ├─ content.ts        Engineering principles, about, privacy principles
   │  └─ demos.ts          Demonstration slots and dashboard evidence
   ├─ components/          Reusable UI (layout, portrait, placeholders, calculator, map)
   ├─ pages/               One component per route
   └─ styles/globals.css   Design tokens and all styling
```

---

## 4. How to update things

### 4.1 Replace the portrait

1. Copy your photo to `public/` as `portrait.jpg` (or `.webp`). A 4:5 or 1:1 crop works best,
   400-800 KB.
2. Open `src/data/site.ts` and change one line:

```ts
portrait: {
  src: '/portrait.jpg',
  alt: 'Your professional portrait',
  caption: 'Portrait',
}
```

3. That is the whole update. The frame, caption, aspect ratio and responsive behaviour stay as they are.

If the file is missing or fails to load, the site automatically shows the clean labelled placeholder
instead of a broken image. Nothing else needs to change.

### 4.2 Add a Loom video to a case study

1. Record the Loom, copy the share URL.
2. In `src/data/projects.ts`, inside the relevant project object, set `demo.loomUrl`:

```ts
demo: {
  loomUrl: 'https://www.loom.com/share/your-id',
  scenarios: ['Confirmation path', 'Cancellation branch', 'Validation failure'],
},
```

3. The case study embeds a lightweight Loom player. If the URL is not a recognisable Loom share link,
   the page shows a labelled "Open demonstration" link instead of a broken embed.
4. `scenarios` becomes the visible list of demonstrated test scenarios. Leave it empty and the page says
   "None recorded yet" rather than inventing a list.

The demonstrations section on the home page reads from the same data, so it updates automatically.

### 4.3 Add screenshots

1. Drop files into `public/screenshots/`, for example `cod-01-workflow.png`.
2. In `src/data/projects.ts`, set `image` on the matching `screenshots` entry:

```ts
screenshots: [
  { id: 'cod-01', title: 'Workflow overview', caption: 'The full n8n workflow, entry to exit.',
    image: '/screenshots/cod-01-workflow.png', ratio: 'wide' },
],
```

3. `title` is the placeholder label, `caption` becomes the image alternative text and the visible
   caption. `ratio` is `wide` (16:10), `box` (1:1) or `tall` (4:5); images are cropped with
   `object-fit: cover` and never distorted.
4. Add new entries to the array to add more screenshots. The grid wraps automatically.

The demo cards on the home page can take a separate `screenshot` object in `src/data/demos.ts`.

### 4.4 Update project statuses and descriptions

Everything about a project lives in one object in `src/data/projects.ts`:

- `status` - `done`, `progress` or `planned`. Controls the colour badge.
- `statusLabel` / `statusDetail` - shown on the card and at the top of the case study.
- `summary` - the one-sentence card description.
- `overview` - the case-study lead paragraph.
- `sections` - the 14 case-study sections. Each has a `status` of `verified`, `partial`, `planned` or
  `not-started`, which renders as a label on the section.

To mark a feature as actually built, change its section `status` to `verified` and update the text.
To mark it as not built, change it to `planned` or `not-started`. The label updates everywhere with no
other change.

To add a project: copy an existing object, change `slug`, fill in the sections, add it to the `projects`
array. It appears on `/projects`, on the home grid and gets its own route automatically.

### 4.5 Add a test scenario or result

Edit the `testing` section's `bullets` array in the project object. Each bullet is a scenario with its
state written into the sentence, for example:

```ts
'Duplicate submission is detected and suppressed: not started.',
```

### 4.6 Add documentation or code links

Set `links` on the project object:

```ts
links: [{ label: 'Workflow definition (JSON)', href: 'https://github.com/...' }],
```

Links render as buttons in the final section. With no entries the page says no documentation exists
rather than showing empty buttons.

### 4.7 Add contact details and your resume

All in `src/data/site.ts`:

```ts
resume:  { label: 'Resume', href: '/resume.pdf', detail: 'PDF' },
contact: {
  email:    { label: 'Email',    href: 'mailto:you@example.com' },
  linkedin: { label: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
  github:   { label: 'GitHub',   href: 'https://github.com/your-handle' },
},
```

Drop the resume PDF into `public/`. Setting `href` on any entry converts it from a placeholder into a
live link in the header, contact section and footer at once.

### 4.8 Add booking links for the two CTAs

```ts
ctas: {
  primary:   { label: 'Request an AI Operations Audit', href: 'https://cal.com/you/30min' },
  secondary: { label: 'Book a Discovery Call',          href: 'https://cal.com/you/20min' },
},
```

### 4.9 Add the sample documents

1. Create the PDFs and put them in `public/`.
2. In `src/data/site.ts`:

```ts
documents: {
  auditReport:          { label: 'Sample AI Operations Audit Report', href: '/audit-report.pdf', format: 'PDF' },
  implementationProposal: { label: 'One-page Automation Implementation Proposal', href: '/proposal.pdf', format: 'PDF' },
},
```

Until `href` is set, the page shows a labelled "Document coming soon" placeholder instead of a broken
download button.

### 4.10 Update the tool stack

`src/data/tools.ts`. Every tool carries an `experience` value that controls how it is described:

- `primary` - my main tool for this job
- `used` - worked with it on a specific project
- `learning` - know what it does, started working with it
- `planned` - part of a design, not yet used in a build

To add a tool, add an object to `coreTools` (featured, with a description), `supportingTools`
(compact chip list) or `opsTools` (infrastructure tier). It appears with no other change.

### 4.11 Update the ROI calculator defaults

`src/data/calculator.ts` - `DEFAULT_INPUTS`. The fields, formulas and the disclaimer are also in that
file. The calculator runs entirely in the browser and makes no network call.

### 4.12 Update social links

```ts
social: {
  linkedin: 'https://linkedin.com/in/your-profile',
  x:        'https://x.com/your-handle',
  posts: ['https://...'],
},
```

---

## 5. Deploy to Vercel

The site is fully static, so deployment is a build and an upload. Pick one of the two routes below.

### Option A: Vercel CLI (fastest, no GitHub account needed)

```bash
cd portfolio
npm install          # already done locally, but Vercel's machine is separate
npm i -g vercel
vercel
```

The first run asks you to log in (it opens a browser), asks for the project directory (press Enter
to accept `.`), and asks whether the settings look right (press Enter again). It deploys to a
`<project>.vercel.app` URL immediately.

For the production deploy, run:

```bash
vercel --prod
```

Your site will be live at something like `my-portfolio-abc123.vercel.app`.

### Option B: Git repository (best for ongoing updates)

This is the better route once you want every future change to deploy automatically.

1. Create an empty repository on GitHub, for example `portfolio`.
2. From this folder:

```bash
cd portfolio
git init
git add -A
git commit -m "Initial portfolio build"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/portfolio.git
git push -u origin main
```

3. On Vercel, click **Add New Project**, import that repository, and click **Deploy**.

Vercel detects the Vite framework automatically. Confirm:
   - **Framework preset:** Vite
   - **Build command:** `npm run build` (set automatically by `vercel.json`)
   - **Output directory:** `dist` (set automatically by `vercel.json`)

### Notes

- `node_modules` and `dist` are already in `.gitignore`, so the push stays small.
- Vercel installs dependencies itself from `package-lock.json`. No manual steps on their side.
- **No environment variables are needed.** There are no API keys, secrets or credentials anywhere
  in this project.
- The free tier covers this site comfortably: it is static with no server functions and no per-request
  cost.

### Deep links

`vercel.json` contains a rewrite that serves `index.html` for every route, so refreshing on
`/projects/returns-handler` works. Do not delete that rewrite.

### Custom domain

Add it in the Vercel project settings under **Domains**. No code change is required.

### After the first deploy

Every time you change content, either push to GitHub (Option B deploys automatically) or run
`vercel --prod` again (Option A).

### Optional: replace the social image

`public/og-image.svg` works, but Twitter and some other platforms render PNG/JPG more reliably. If you
replace it, update the `og:image` and `twitter:image` references in `index.html`.

---

## 6. Deploy to Netlify (alternative)

`netlify.toml` already sets the build command and publish directory and adds the SPA redirect. Connect
the repository and deploy. No configuration needed.

---

## 7. What is deliberately excluded

These tools were explicitly excluded and should not be added unless a future project genuinely requires
them: Zendesk, Intercom, paid HubSpot tiers, Pinecone, LangChain, Docker. Adding them adds
subscriptions, complexity or infrastructure that this portfolio does not need.

---

## 8. Quality checklist

Before publishing, confirm:

- [ ] Every nav link resolves, including mobile.
- [ ] Each of the four project cards opens its case study.
- [ ] All four case-study routes load on a hard refresh (the `vercel.json` rewrite covers this).
- [ ] The portrait placeholder renders cleanly (or your photo is in place).
- [ ] Every "Demonstration coming soon" placeholder renders; no empty iframe.
- [ ] Every screenshot placeholder renders; no broken `img`.
- [ ] Sections marked `partial`, `planned` or `not-started` are described as such in their text.
- [ ] No fabricated metrics, clients, testimonials or personal details.
- [ ] Contact buttons are either live links or visibly "Coming soon", never dead clicks.
- [ ] Mobile layout checked at 375 px, tablet at 768 px, desktop at 1280 px and wide.
- [ ] No em dashes in visible copy.
- [ ] `npm run build` passes with no errors.

---

## 9. Still needed from you

The site is complete and publishable as it stands. These are the items that are still placeholders:

**Personal**
- [x] Name set as the wordmark and in page metadata (`site.wordmark`, `site.name`, `index.html`)
- [ ] Your professional photograph
- [ ] Background and current-focus lines for the About section
      (`about.placeholders` in `src/data/content.ts`)

**Contact**
- [x] Email address
- [x] LinkedIn profile URL
- [ ] GitHub profile URL
- [ ] Resume / CV PDF

**Calls to action**
- [ ] Booking link for the audit request (Cal.com, Calendly or similar)
- [ ] Booking link for the discovery call

**Projects**
- [ ] Correct the capability labels in the Lead Qualification and Returns Handler case studies to match
      the actual current build
- [ ] Add the test scenarios you actually ran, with their real results
- [ ] Add documentation or code links where they exist

**Evidence**
- [ ] Loom recordings for all four projects (recording planned after Projects 3 and 4 finish)
- [ ] Screenshots for all four projects
- [ ] Real recorded metrics to replace the dashboard sample data (`dashboardState` in `src/data/demos.ts`)

**Documents**
- [ ] Sample AI Operations Audit Report (PDF)
- [ ] One-page Automation Implementation Proposal (PDF)

**Social**
- [ ] LinkedIn URL, X handle, and any technical posts or project updates

---

## 10. Deliberate honesty notes

These are baked into the content and should be preserved when you edit:

- The COD system is described as completed **for the confirmed-order scenario only**. Cancellation,
  reminder, duplicate-handling and recovery paths are marked as partial or not started.
- The Lead Qualification System is described as a **project prototype**, not a deployed system.
- The Returns Handler is **in progress**; policy enforcement, conflicting-instruction handling and
  human escalation are labelled as designed, not built.
- The Invoice Extractor is **planned** and its page states that nothing has been implemented.
- Velara Skin Co. is **fictional** and labelled as illustrative on every page where it appears.
- Dashboard figures are **sample data** and labelled as such.
- Monitoring, alerting and human handoff in the infrastructure tier are described as **design
  capabilities and implementation options**, not as running production systems.
- The ROI calculator carries its own disclaimer and separates cost reduction, revenue impact and risk
  reduction so nothing is double-counted.
