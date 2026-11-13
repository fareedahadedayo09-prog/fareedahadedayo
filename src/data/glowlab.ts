/**
 * ──────────────────────────────────────────────────────────────────────────
 *  GLOWLAB CASE STUDY CONTENT
 * ──────────────────────────────────────────────────────────────────────────
 *
 *  GlowLab is an ONGOING project. Everything in this file is written to keep
 *  three things separate:
 *
 *    1. What the live demo storefront actually showed when it was checked.
 *    2. What the project is designed to do across Make.com, Supabase,
 *       Airtable and the Lumi assistant.
 *    3. What is still being built, tested or reviewed.
 *
 *  Rules followed here:
 *    · No completion language, no launch dates, no invented milestones.
 *    · No recovered-order, conversion or revenue numbers.
 *    · No claim that the automation runs for a real business.
 *    · Anything that could not be verified is labelled as such.
 *
 *  Change history for this file is local to the portfolio; the GlowLab
 *  storefront itself is a separate project and is not modified from here.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const GLOWLAB_DEMO_URL = 'https://glow-lab-puce.vercel.app/'

/** Label shown on every status surface for this project. */
export const GLOWLAB_STATUS_LABEL = 'In Progress'

export type BuildState = 'shipped' | 'in-progress' | 'review' | 'planned'

export const BUILD_STATE_LABEL: Record<BuildState, string> = {
  shipped: 'Visible in the live demo',
  'in-progress': 'Still being built',
  review: 'Needs review',
  planned: 'Planned · not connected yet',
}

/* ── Stack ──────────────────────────────────────────────────────────── */

export type StackItem = {
  name: string
  role: string
  layer: 'storefront' | 'orchestration' | 'data' | 'messaging' | 'ai'
}

export const GLOWLAB_STACK: StackItem[] = [
  {
    name: 'React',
    role: 'Storefront UI: catalogue, cart, demo checkout and the Lumi chat panel.',
    layer: 'storefront',
  },
  {
    name: 'Make.com',
    role: 'Orchestration: receives the checkout event and runs the scenario step by step.',
    layer: 'orchestration',
  },
  {
    name: 'Supabase',
    role: 'Backend data handling: stores order and customer records behind the storefront.',
    layer: 'data',
  },
  {
    name: 'Airtable',
    role: 'Operational tracking: gives a readable view of each run and where it stopped.',
    layer: 'data',
  },
  {
    name: 'Klaviyo',
    role: 'Planned follow-up layer for reminders. Not integrated yet — kept in the design, not connected.',
    layer: 'messaging',
  },
  {
    name: 'LLM integration',
    role: 'Powers Lumi. The storefront tells visitors messages are sent to Google Gemini.',
    layer: 'ai',
  },
  {
    name: 'APIs & webhooks',
    role: 'The plumbing between checkout, Make.com and the services above.',
    layer: 'orchestration',
  },
]

/* ── Overview ───────────────────────────────────────────────────────── */

export const GLOWLAB_OVERVIEW = {
  summary:
    'GlowLab is a fictional skincare store that I am building to explore one question: how does an online shop connect what a customer does at checkout with the follow-up that happens afterwards?',
  body: [
    'The demo storefront is a normal-feeling shop: a product catalogue, a cart, a demonstration checkout and an AI skincare assistant called Lumi. Behind the checkout, a separate automation prototype picks up the order event and works through consent, tracking and reminder steps.',
    'The point is not to sell skincare. GlowLab exists so I can design, break and rebuild the join between the storefront and the automation, and show the working parts in public as they come together.',
  ],
  isNot: [
    'Not a live commercial retailer — products, prices and checkout are a demonstration only.',
    'Not a finished product — parts are built, parts are being tested, and parts are still to be reviewed.',
    'Not a results story — there are no recovered orders, conversion figures or customers to report.',
  ],
}

/* ── Problem ────────────────────────────────────────────────────────── */

export const GLOWLAB_PROBLEM = {
  summary:
    'A small store has two jobs that scale badly: answering the same product questions, and following up with people who started a purchase but stopped.',
  whyItMatters:
    'Both jobs are easy to drop when a shop is busy. A late reminder is wasted, a reminder sent to someone who already bought is worse than none, and a customer who never got an answer usually does not ask twice.',
  bullets: [
    'Product questions arrive through chat and get answered from memory, so replies vary and helpful detail is lost.',
    'Abandoned carts are followed up only when someone remembers to look.',
    'There is no consistent consent check before a follow-up message goes out.',
    'Nobody can see, after the fact, why a particular customer did or did not receive a message.',
  ],
  designGoals: [
    'One place where the checkout event lands, so follow-up does not depend on memory.',
    'Consent and eligibility decided before any message is prepared.',
    'A readable record of every run for the person operating the store.',
    'An assistant that helps a shopper decide, without pretending to give medical advice.',
  ],
}

/* ── Solution ───────────────────────────────────────────────────────── */

export const GLOWLAB_SOLUTION: { title: string; kicker: string; detail: string; points: string[] }[] = [
  {
    title: 'The storefront',
    kicker: 'React · deployed on Vercel',
    detail:
      'A browsable skincare catalogue with category filters, product detail views, a cart and a demonstration checkout. Checkout is explicit about being simulated: no payment is taken and nothing is dispatched.',
    points: [
      'Catalogue with product categories, prices and detail views.',
      'Cart with quantity controls and an order summary.',
      'Demo checkout that records an order reference instead of taking payment.',
      'Published policies and FAQ pages so the shop reads as a real store.',
    ],
  },
  {
    title: 'Lumi, the skincare assistant',
    kicker: 'LLM integration · chat panel',
    detail:
      'Lumi sits in a chat panel on the storefront and helps a shopper narrow the catalogue using their skin concerns, routine and budget. It is shopping guidance, and the panel says so: it does not diagnose conditions.',
    points: [
      'Opens from the header and from a floating button on every page.',
      'Starter prompts for building a routine, finding a cleanser and checking an order.',
      'Answers are drawn from the catalogue rather than invented products.',
      'Visible disclaimer that messages are sent to a third-party model provider.',
    ],
  },
  {
    title: 'The checkout automation',
    kicker: 'Make.com · Supabase · Airtable',
    detail:
      'A separate automation receives the checkout event, checks consent and writes the operational record. Outbound email — an order confirmation and the abandoned-cart reminder sequence — is still being built, so nothing is sent to a customer yet.',
    points: [
      'Make.com runs the scenario and holds the branching logic.',
      'Supabase keeps the order and customer data behind the event.',
      'Airtable shows each run and its current stage for the operator.',
      'Message copy and the order-email layout exist as a design, not as an automated send.',
    ],
  },
]

/* ── Architecture ───────────────────────────────────────────────────── */

export type ArchitectureNode = {
  id: string
  title: string
  meta: string
  detail: string
  state: BuildState
}

export type ArchitectureLayer = {
  id: string
  title: string
  caption: string
  nodes: ArchitectureNode[]
}

export const GLOWLAB_ARCHITECTURE: {
  layers: ArchitectureLayer[]
  flows: { from: string; to: string; label: string }[]
  note: string
} = {
  layers: [
    {
      id: 'experience',
      title: '1 · Customer side',
      caption: 'What the shopper sees',
      nodes: [
        {
          id: 'storefront',
          title: 'React storefront',
          meta: 'Vercel',
          detail: 'Catches the browse, cart and checkout actions, including the checkout event that starts the automation.',
          state: 'shipped',
        },
        {
          id: 'lumi',
          title: 'Lumi assistant',
          meta: 'LLM chat panel',
          detail: 'Sends a shopper question plus catalogue context to the model and renders the reply in the panel.',
          state: 'in-progress',
        },
      ],
    },
    {
      id: 'orchestration',
      title: '2 · Orchestration',
      caption: 'Where the decisions happen',
      nodes: [
        {
          id: 'make',
          title: 'Make.com scenario',
          meta: 'Webhook trigger',
          detail: 'Receives the checkout payload, checks consent, decides the branch and calls the other services in order.',
          state: 'in-progress',
        },
      ],
    },
    {
      id: 'data',
      title: '3 · Records',
      caption: 'What the system remembers',
      nodes: [
        {
          id: 'supabase',
          title: 'Supabase',
          meta: 'Order data',
          detail: 'Supports backend data handling for the storefront and the records the automation works from.',
          state: 'in-progress',
        },
        {
          id: 'airtable',
          title: 'Airtable',
          meta: 'Operations view',
          detail: 'One row per run: consent result, current stage, timestamp and where the run stopped.',
          state: 'in-progress',
        },
      ],
    },
    {
      id: 'messaging',
      title: '4 · Follow-up',
      caption: 'How the customer hears back',
      nodes: [
        {
          id: 'klaviyo',
          title: 'Klaviyo',
          meta: 'Reminder sequence',
          detail: 'Planned home for the abandoned-cart reminder sequence and recovery link. Not integrated yet.',
          state: 'planned',
        },
      ],
    },
  ],
  flows: [
    { from: 'Checkout completed', to: 'Make.com webhook', label: 'order event, customer and cart payload' },
    { from: 'Make.com', to: 'Supabase', label: 'read and update the order record' },
    { from: 'Make.com', to: 'Airtable', label: 'write the run and its current stage' },
    { from: 'Abandoned cart', to: 'Klaviyo', label: 'planned reminder sequence — not connected yet' },
    { from: 'Lumi', to: 'Model provider', label: 'prompt with catalogue context' },
  ],
  note:
    'Read this as the intended wiring of one system, not as proof that every arrow has been exercised end to end. The storefront and the automation are deployed separately, and the automation has not been connected to a real shop.',
}

/* ── Workflow ───────────────────────────────────────────────────────── */

export type WorkflowNode = {
  id: string
  step: string
  title: string
  detail: string
  kind: 'event' | 'check' | 'record' | 'message' | 'stop'
}

export const GLOWLAB_WORKFLOW: WorkflowNode[] = [
  {
    id: 'checkout',
    step: '01',
    title: 'Checkout completes',
    detail:
      'The shopper submits the demonstration checkout. The storefront saves the order in Supabase and returns an order reference to the browser.',
    kind: 'event',
  },
  {
    id: 'webhook',
    step: '02',
    title: 'Make.com receives the event',
    detail:
      'A webhook hands the order payload to the scenario: customer reference, contact details, cart contents, cart total and the checkout timestamp.',
    kind: 'event',
  },
  {
    id: 'consent',
    step: '03',
    title: 'Consent and eligibility check',
    detail:
      'Before any message exists, the scenario checks that the customer agreed to follow-up, that the order is not already complete, and that no opt-out is recorded.',
    kind: 'check',
  },
  {
    id: 'track',
    step: '04',
    title: 'Write the operational record',
    detail:
      'The run is written to Airtable with its consent result and the stage it reached, so the state of any customer is readable without opening the scenario.',
    kind: 'record',
  },
  {
    id: 'handoff',
    step: '05',
    title: 'Prepare the order message',
    detail:
      'The scenario assembles the order details — order number, line items, total — that a confirmation email would need. The send step itself is not connected yet.',
    kind: 'message',
  },
  {
    id: 'reminder',
    step: '06',
    title: 'Reminder sequence (planned)',
    detail:
      'The abandoned-cart reminder with a recovery link back to the cart is designed but not connected. Klaviyo is the intended home for it; that integration has not been built.',
    kind: 'message',
  },
  {
    id: 'exit',
    step: '07',
    title: 'Exit conditions',
    detail:
      'A completed purchase or an opt-out between the event and the scheduled send should stop the sequence. Re-checking this at send time is part of the work still being finished.',
    kind: 'stop',
  },
]

/* ── Technical decisions ────────────────────────────────────────────── */

export type Decision = {
  service: string
  choice: string
  why: string
  tradeoff: string
}

export const GLOWLAB_DECISIONS: Decision[] = [
  {
    service: 'Make.com',
    choice: 'Visual orchestration rather than code hosted in the storefront',
    why: 'The scenario changes often while the flow is being figured out. A visual canvas makes each branch inspectable and lets a failure be traced to a single module.',
    tradeoff: 'The logic lives outside the repository, so it has to be documented here for anyone reviewing the project without access to the scenario.',
  },
  {
    service: 'Supabase',
    choice: 'Order and customer data in a database the automation can query',
    why: 'The checkout needs a source of truth for the order, and the scenario needs to read that record rather than trusting whatever arrives in the webhook payload.',
    tradeoff: 'Two systems now hold customer data, so the schema and the access rules need to be reviewed together.',
  },
  {
    service: 'Airtable',
    choice: 'A separate operational view instead of reading raw database rows',
    why: 'Whoever runs the store should be able to see what happened to a customer without querying a database. One row per run with a stage column is enough for that.',
    tradeoff: 'The same fact is written twice, so the Airtable view can drift from Supabase if a run fails between the two writes.',
  },
  {
    service: 'Klaviyo (planned)',
    choice: 'Reminder sequences to an email platform, once integrated',
    why: 'Sequenced follow-up, templates and unsubscribe handling belong to a tool built for them. The automation should decide whether to send; Klaviyo should own how.',
    tradeoff: 'Not integrated yet. Until it is, there is no reminder sequence in place and no delivered-message reporting for follow-up.',
  },
  {
    service: 'LLM for Lumi',
    choice: 'Model-generated answers bounded by catalogue context',
    why: 'Product questions are open-ended, so a rule-based reply tree would age badly. Keeping answers tied to catalogue context is the intent, so suggestions stay close to products that exist.',
    tradeoff: 'Model latency, rate limits and error states become part of the experience, and answers still need review before this could face real customers.',
  },
  {
    service: 'Shortened intervals',
    choice: 'Compressed reminder spacing for demonstration',
    why: 'A sequence that waits a day between steps cannot be reviewed in a demo session. Compressing it makes the whole path observable.',
    tradeoff: 'These timings are not production timings and should not be copied into a real campaign.',
  },
]

/* ── Testing & validation ───────────────────────────────────────────── */

export type TestCheck = {
  area: string
  method: string
  result: string
  state: 'verified' | 'observed' | 'unverified' | 'planned'
}

export const GLOWLAB_VERIFIED_ON = '13 November 2026'

export const GLOWLAB_TESTS: TestCheck[] = [
  {
    area: 'Storefront pages',
    method: 'Opened the live demo and followed the navigation: Home, Products, About, FAQ, Contact, Cart and checkout.',
    result: 'All pages loaded. The catalogue showed 12 products across six categories.',
    state: 'verified',
  },
  {
    area: 'Cart and demo checkout',
    method: 'Added a product, opened the cart, continued to checkout and read the form.',
    result:
      'Cart totals and the order summary updated. Checkout requires a confirmation that payment is simulated before an order can be placed.',
    state: 'verified',
  },
  {
    area: 'Lumi chat panel',
    method: 'Opened the panel twice from the storefront and sent a routine and a product question.',
    result:
      'The panel opened with its greeting, starter prompts and disclaimer. Both messages returned “Lumi is busy. Please wait a moment before retrying.”, so the assistant did not answer during these checks.',
    state: 'observed',
  },
  {
    area: 'Embedding the demo',
    method: 'Read the storefront’s response headers.',
    result:
      'The storefront sends a Content-Security-Policy (frame-ancestors) that restricts framing to its own origin, so it is shown here as a screenshot with a direct link rather than an iframe.',
    state: 'verified',
  },
  {
    area: 'Checkout → Make.com webhook',
    method: 'Placed an order through the demo checkout and followed it into the scenario.',
    result:
      'The checkout event reached the scenario and the order ran through the automation steps.',
    state: 'verified',
  },
  {
    area: 'Consent gate and order records',
    method: 'Ran orders through the scenario and read the resulting records in Supabase and Airtable.',
    result:
      'The consent check ran before follow-up, and order records appeared in Supabase with a matching tracking row in Airtable.',
    state: 'verified',
  },
  {
    area: 'Klaviyo reminder sequence',
    method: 'Klaviyo has not been integrated with the scenario yet.',
    result:
      'Not built, so there is nothing to test. The abandoned-cart reminder and recovery link remain planned work.',
    state: 'planned',
  },
]

/* ── Current progress ───────────────────────────────────────────────── */

export type ProgressItem = {
  title: string
  state: 'done' | 'active' | 'review'
  note: string
}

export const GLOWLAB_PROGRESS: { title: string; caption: string; items: ProgressItem[] }[] = [
  {
    title: 'Implemented',
    caption: 'Built and visible',
    items: [
      { title: 'React storefront', state: 'done', note: 'Catalogue, product views, cart and demo checkout are live on Vercel.' },
      { title: 'Demo checkout flow', state: 'done', note: 'Order summary, simulated payment notice and confirmation step.' },
      { title: 'Policy and FAQ content', state: 'done', note: 'Shipping, payment, returns and privacy answers, plus demo-payment wording at checkout.' },
      { title: 'Lumi chat interface', state: 'done', note: 'Panel, starter prompts and disclaimers are in place.' },
      { title: 'Checkout → Make.com webhook', state: 'done', note: 'The storefront hands the checkout event to the scenario, which runs the order through.' },
      { title: 'Consent gate before follow-up', state: 'done', note: 'The scenario checks consent before any follow-up step runs.' },
      { title: 'Supabase order records', state: 'done', note: 'Order and customer records are written to the backend.' },
    ],
  },
  {
    title: 'Built, still being tested',
    caption: 'Exists, edge cases remain',
    items: [
      { title: 'Airtable run tracking', state: 'active', note: 'Operational tracking is set up; failure states still need a clean path.' },
    ],
  },
  {
    title: 'In progress',
    caption: 'Actively being built',
    items: [
      { title: 'Lumi answer reliability', state: 'active', note: 'Returned a busy state during checks; reliability and retry handling still need work before answers can be relied on.' },
      { title: 'Order confirmation email send', state: 'active', note: 'Designed, not connected — nothing is sent to a customer yet.' },
      { title: 'Send-time exit checks', state: 'active', note: 'Purchase and opt-out should stop a scheduled reminder; this re-check is unfinished.' },
    ],
  },
  {
    title: 'Still to review',
    caption: 'Open questions, not promises',
    items: [
      { title: 'Data handling review', state: 'review', note: 'Two stores of customer data need a written retention and access policy.' },
      { title: 'Lumi answer quality', state: 'review', note: 'Responses need reviewing against catalogue facts and the medical disclaimer.' },
      { title: 'Klaviyo integration', state: 'review', note: 'Not started. The reminder sequence and recovery link are designed but not connected.' },
      { title: 'Failure handling', state: 'review', note: 'What happens when a service call fails mid-run is not yet defined.' },
      { title: 'Mobile pass on the storefront', state: 'review', note: 'Layout holds, but the checkout and chat need a deliberate small-screen review.' },
    ],
  },
]

/* ── Next steps ─────────────────────────────────────────────────────── */

export const GLOWLAB_NEXT_STEPS: { title: string; detail: string }[] = [
  {
    title: 'Make Lumi answer consistently',
    detail: 'Investigate the busy responses seen during checks, add retry and timeout handling, then re-test the starter prompts.',
  },
  {
    title: 'Write the scenario test log',
    detail: 'Run the checkout event through each branch — consent given, consent refused, opt-out and completed purchase — and record the outcome of each.',
  },
  {
    title: 'Finish send-time exit checks',
    detail: 'Re-check purchase and opt-out immediately before a scheduled reminder so a customer who buys in between is not messaged.',
  },
  {
    title: 'Review the data model',
    detail: 'Agree what Supabase and Airtable each own, and write down retention and access rules for the customer records they hold.',
  },
  {
    title: 'Define failure handling',
    detail: 'Decide what the operator should see when a run fails between two services, and add that state to Airtable.',
  },
  {
    title: 'Replace demo timings with a documented plan',
    detail: 'Keep shortened intervals for demonstration only, and document the production timings that would be used instead.',
  },
]

/* ── Previews ───────────────────────────────────────────────────────── */

export type PreviewShot = {
  id: 'desktop' | 'mobile'
  label: string
  src: string
  alt: string
  caption: string
}

export const GLOWLAB_PREVIEWS: PreviewShot[] = [
  {
    id: 'desktop',
    label: 'Desktop',
    src: '/screenshots/glowlab/glowlab-home-desktop.jpg',
    alt: 'GlowLab storefront home page with the headline “Healthy Skin Starts With The Right Routine”, product imagery and a Chat With Lumi button',
    caption: 'The live storefront home page, captured in a desktop browser.',
  },
  {
    id: 'mobile',
    label: 'Mobile',
    src: '/screenshots/glowlab/glowlab-home-mobile.jpg',
    alt: 'GlowLab storefront on a narrow mobile viewport, showing the stacked header, headline, buttons and hero image',
    caption: 'The same page on a narrow mobile viewport.',
  },
]

/** Supporting interface shots — three, not a gallery. */
export const GLOWLAB_INTERFACE_SHOTS: { src: string; title: string; alt: string; caption: string }[] = [
  {
    src: '/screenshots/glowlab/glowlab-products-desktop.jpg',
    title: 'Catalogue view',
    alt: 'GlowLab products page listing cleansers, serums, moisturisers and sunscreens with prices in naira',
    caption: 'Twelve products across six categories, each with a price and a detail view.',
  },
  {
    src: '/screenshots/glowlab/glowlab-checkout.jpg',
    title: 'Demonstration checkout',
    alt: 'GlowLab checkout form with contact fields, a simulated payment notice, an order summary and a confirmation checkbox',
    caption:
      'The checkout that produces the order event: contact details, a simulated-payment notice and an explicit confirmation step.',
  },
  {
    src: '/screenshots/glowlab/glowlab-lumi-assistant.jpg',
    title: 'Lumi assistant panel',
    alt: 'Lumi chat panel showing the greeting, starter prompts, a product question and a busy error state',
    caption:
      'The assistant panel during a check on 13 November 2026. The busy state is shown rather than a successful answer.',
  },
]

/* ── Scope note ─────────────────────────────────────────────────────── */

export const GLOWLAB_SCOPE_NOTE =
  'GlowLab is a fictional brand built as a personal project. The storefront takes no payment and dispatches nothing, the automation has not been connected to a real retailer, and no customer data, orders or revenue figures are being reported. The portfolio update that presents this case study is finished; the project itself is not.'
