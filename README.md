# Fareedah Adedayo — AI Workflow Automation Portfolio

A responsive portfolio built with React, TypeScript and Vite. It presents selected workflow-automation projects, their implementation approach, available test evidence and known limitations.

**Role:** AI Workflow Automation Builder  
**Focus:** workflow orchestration, AI/LLM integration, APIs, webhooks, structured data and human-reviewed handoffs.

> Project pages distinguish working builds, prototypes, partial verification and planned work. The portfolio does not claim production deployments or measured business results where those have not been established.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run build` | Type-check and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Node.js test suite in `tests/` |

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Portfolio homepage |
| `/projects` | Project index |
| `/projects/order-confirmation-risk-check` | COD order confirmation and risk assessment |
| `/projects/returns-refunds-handler` | Returns and refunds policy handler |
| `/projects/lead-qualification` | BrightSun Solar lead qualification |
| `/projects/glowlab-lifecycle` | GlowLab storefront and lifecycle prototype |
| `/tools` | Tools and technologies inventory |
| `/simulators` | Interactive project walkthroughs |

Unknown routes render the not-found page. The Vercel configuration includes SPA routing support for direct route visits.

## Selected projects

### COD Order Confirmation & Risk Assessment
An n8n workflow for cash-on-delivery order intake, duplicate checks, customer confirmation, availability capture, reminders and staff follow-up. Duplicate detection has been tested; detailed end-to-end coverage for the other paths still needs to be recorded. The workflow is not currently running.

### Returns & Refunds Policy Handler
A staged n8n workflow that validates return requests and evaluates explicit policy rules. Complete and missing-field paths were walkthrough-verified. Out-of-policy escalation is implemented but not yet verified end to end; order lookup, conflict detection and live queue notification remain incomplete.

### BrightSun Solar — Claude-Assisted Lead Qualification
An Airtable form and connected base feed an n8n workflow that uses the built-in Anthropic node with Claude in an AI-assisted step. The portfolio includes examples of test-enquiry acknowledgement and warm-lead staff notification. The exact prompt, input/output contract and systematic branch coverage still need documenting.

### GlowLab — AI-Assisted E-commerce Platform
A fictional skincare storefront and customer-lifecycle prototype. It demonstrates simulated event intake, segmentation, wait steps and exit checks. Events are simulated and messages are staged rather than sent; it is not connected to a live store.

Project pages contain the current status, workflow explanation, evidence and limitations for each build. Tool names on a project page refer to that project's implementation, not necessarily the entire tools inventory.

## Repository structure

```text
.
├── public/                 Static assets and project screenshots
├── src/
│   ├── components/         Shared layout and interface components
│   ├── data/               Portfolio content, project definitions and simulators
│   ├── pages/              Route-level React components
│   └── styles/             Global styles and design tokens
├── tests/                  Node.js tests
├── index.html              Document metadata and app entry point
├── package.json            Scripts and dependencies
├── tsconfig.json           TypeScript configuration
├── vercel.json             Vercel deployment and SPA routing
└── vite.config.ts          Vite configuration
```

Most portfolio copy and project details are maintained in `src/data/`. The case-study page renders the structured project definitions from `src/data/projects.ts`; the interactive walkthroughs are defined in `src/data/simulators.ts`.

## Technology

- React 18
- TypeScript
- Vite
- React Router
- Node.js built-in test runner

The portfolio is a frontend application. Project integrations described on the site belong to the individual demonstration workflows; the portfolio website itself does not expose a backend API.

## Evidence and accuracy

- Screenshots and walkthroughs are labelled as test or illustrative evidence where applicable.
- Prototype and planned features are not presented as completed production capabilities.
- No revenue, conversion, time-saving or customer outcome metrics are claimed without measurement.
- API keys, credentials and customer records should never be committed to this repository.

## Before publishing changes

Run the checks locally:

```bash
npm run typecheck
npm test
npm run build
```

Then review the homepage, each project route, the tools page and simulator interactions at desktop and mobile widths. Confirm that screenshots load and that no project status or claim exceeds the available evidence.

## Deployment

The repository includes Vercel configuration. Connect the repository to a Vercel project and use:

- Build command: `npm run build`
- Output directory: `dist`

Do not deploy a feature branch to the production project unless that is intentional. Review and test changes before merging them into the production branch.
