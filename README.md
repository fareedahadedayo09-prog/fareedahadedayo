# AI Automation Engineering Portfolio

A complete, responsive personal portfolio for an aspiring AI Automation Engineer and workflow builder.
Static, no backend, no paid services, deployable on Vercel's free tier.

Built with React 18, React Router 6, TypeScript and Vite. The production bundle is one JS file
(~75 kB gzipped) and one CSS file (~4.5 kB gzipped). No third-party scripts are loaded for icons or logos.

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
| `/` | Hero, selected projects, engineering approach, tool stack, privacy, about, contact and practice-audit teaser |
| `/projects` | Projects index |
| `/projects/:slug` | Case study with six sections and evidence |
| `/audit` | Operations audit method (7 steps), supporting tools, sample documents, CTA |
| `/audit/velara-skin-co` | Fictional practice audit demonstrating the method |
| `*` | 404 page |

Project slugs: `order-confirmation-risk-check`, `lead-qualification`, `returns-refunds-handler`, `invoice-extractor`.

Configured links work normally. Actions without a destination are omitted rather than shown as dead buttons.

---

## 3. Project structure

```
portfolio/
├─ index.html              Meta tags, Open Graph, Twitter cards, font links
├─ vercel.json             Vercel framework, build command, SPA rewrites
├─ netlify.toml            Same for Netlify
├─ vite.config.ts
├─ public/
│  ├─ resume.pdf           Downloadable resume
│  ├─ favicon.svg
│  ├─ og-image.svg         Social sharing image
│  └─ screenshots/         Optimized case-study screenshots
└─ src/
   ├─ data/                ALL CONTENT LIVES HERE
   │  ├─ site.ts           Personal details, resume, contact, CTAs and links
   │  ├─ projects.ts       The four projects, full case studies, statuses
   │  ├─ tools.ts          Technical tools and skills grouped by category
   │  ├─ audit.ts          Audit method + the fictional Velara practice audit
   │  ├─ content.ts        Engineering principles, about, privacy principles
   ├─ components/          Reusable UI (layout, project cards, buttons, process map)
   ├─ pages/               One component per route
   └─ styles/globals.css   Design tokens and all styling
```

---

## 4. How to update things

### 4.1 Add a Loom video to a case study

1. Record the Loom, copy the share URL.
2. In `src/data/projects.ts`, inside the relevant project object, set `loomUrl`:

```ts
loomUrl: 'https://www.loom.com/share/your-id',
```

3. The case study embeds a lightweight Loom player. If the URL is not a recognisable Loom share link,
   the page shows a labelled "Open demonstration" link instead of a broken embed.
The Loom player is shown in that project’s Evidence and testing section.

### 4.2 Add screenshots

1. Drop optimized files into `public/screenshots/`, for example `cod-01-workflow.webp`. Before adding evidence, redact customer names, email addresses, phone numbers, physical addresses and order identifiers.
2. In `src/data/projects.ts`, set `image` on the matching `screenshots` entry:

```ts
screenshots: [
  { id: 'cod-01', title: 'Workflow overview', caption: 'The full n8n workflow, entry to exit.',
    image: '/screenshots/cod-01-workflow.webp' },
],
```

3. `title` appears above the image, `caption` is visible below it, and optional `alt` provides separate
   alternative text. An optional `note` appears beneath the caption.
4. Add new entries to the array to add more screenshots. The grid wraps automatically.


### 4.3 Update project statuses and descriptions

Everything about a project lives in one object in `src/data/projects.ts`:

- `status` - `done`, `progress` or `planned`. Controls the colour badge.
- `statusLabel` / `statusDetail` - shown on the card and at the top of the case study.
- `summary` - the one-sentence card description.
- `overview` - the case-study lead paragraph.
- `sections` - the six case-study sections and their descriptive content.

To add a project: copy an existing object, change `slug`, fill in the sections, add it to the `projects`
array. It appears on `/projects`, on the home grid and gets its own route automatically.

### 4.4 Add a test scenario or result

Edit the `testing` section's `bullets` array in the project object. Each bullet is a scenario with its
state written into the sentence, for example:

```ts
'Duplicate submission is detected and suppressed: not started.',
```

### 4.5 Add documentation or code links

Set `links` on the project object:

```ts
links: [{ label: 'Workflow definition (JSON)', href: 'https://github.com/...' }],
```

Links render as buttons in the final section. With no entries the page says no documentation exists
rather than showing empty buttons.

### 4.6 Add contact details and your resume

All in `src/data/site.ts`:

```ts
resume:  { label: 'Resume', href: '/resume.pdf', detail: 'PDF' },
contact: {
  email:    { label: 'Email',    href: 'mailto:you@example.com' },
  linkedin: { label: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
  github:   { label: 'GitHub',   href: 'https://github.com/your-handle' },
},
```

The resume PDF belongs in `public/`. Its configured link appears in the header. Contact links appear only when configured.

### 4.7 Add booking links for the two CTAs

```ts
ctas: {
  primary:   { label: 'Request an AI Operations Audit', href: 'https://cal.com/you/30min' },
  secondary: { label: 'Book a Discovery Call',          href: 'https://cal.com/you/20min' },
},
```

### 4.8 Add the sample documents

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

### 4.9 Update technical skills

`src/data/tools.ts` lists tools and workflow skills you can use, grouped by category. Add or remove names in the relevant category’s `tools` array; the site renders them as compact skill chips. Case studies separately state which tools and workflow paths are demonstrated in each project.

### 4.10 Update social links

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
- [ ] Resume link opens the current PDF.
- [ ] Every evidence image loads and has an accurate caption.
- [ ] Sections marked `partial`, `planned` or `not-started` are described as such in their text.
- [ ] No fabricated metrics, clients, testimonials or personal details.
- [ ] Unconfigured contact and booking links are omitted; configured links work.
- [ ] Mobile layout checked at 375 px, tablet at 768 px, desktop at 1280 px and wide.
- [ ] No em dashes in visible copy.
- [ ] `npm run build` passes with no errors.

---

## 9. Optional enhancements

- Add a GitHub profile link if you want to feature public code.
- Add booking links if you decide to accept scheduled calls.
- Add workflow documentation or code links where it is safe to share them.
- Add end-to-end test evidence as the remaining project paths are verified.
- Add sample audit documents if you want to publish them.

---

## 10. Deliberate honesty notes

These are baked into the content and should be preserved when you edit:

- The COD order system is a working prototype. The delivery-date, duplicate and reminder paths still need end-to-end verification; dispatch scheduling and courier notifications are not built.
- BrightSun Solar is a lead-qualification case study. The warm path is demonstrated; the follow-up digest is disabled and the error alert is not yet tested.
- The Returns and Refunds case study is a completed standalone build. Its gallery documents a six-record returns queue, one auto-handled final-sale request and one human-escalated damaged-item/email-mismatch case; it does not claim production deployment or measured impact.
- The Invoice Extractor is planned and has not been implemented.
- Velara Skin Co. is fictional and labelled as illustrative wherever it appears.
- Monitoring, alerting and human handoff in the infrastructure tier are design capabilities, not running production systems.
