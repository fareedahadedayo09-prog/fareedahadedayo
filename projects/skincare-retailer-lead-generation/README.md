# Skincare Retailer Lead Generation Pipeline

An independent n8n portfolio project that discovers candidate skincare retailers, enriches them with evidence from their websites, evaluates them against explicit criteria and stores structured records in Airtable.

This is a portfolio demonstration, not a production service or an endorsement by any employer or client.

## Problem

Finding independent multi-brand skincare retailers across several markets involves repeated searches, manual website reviews and copying information into a prospect list. Search snippets alone are not enough to prove that a business fits the target profile.

## Workflow

1. **Discovery:** configurable Serper searches target the United Kingdom, United States, Canada and Australia.
2. **Normalisation:** JavaScript cleans website URLs and derives canonical domains.
3. **Deduplication:** same-run results for the same domain are merged while retaining discovery evidence.
4. **Persistence:** Airtable records are checked by canonical domain, then created or updated.
5. **Website enrichment:** the workflow fetches the homepage and up to four relevant same-site About, Contact or Brands pages where accessible.
6. **Structured extraction:** Gemini extracts business model, product categories, third-party brands, e-commerce evidence and public contact details from the fetched text only.
7. **Evidence validation:** JavaScript checks the response schema, source URLs and literal evidence for found contact details and brands. Invalid output can be retried once.
8. **Qualification:** deterministic rules classify prospects as **Qualified**, **Rejected** or **Needs Review**. The LLM does not make the final decision.
9. **Write-back and reporting:** Airtable stores the result and evidence; processing errors are logged and a run summary is calculated.

## Qualification logic

A prospect can be marked **Qualified** only when the website evidence supports all of the following:

- Multi-brand retailer business model.
- At least two third-party brands.
- E-commerce evidence.
- Skincare or beauty product categories.
- Country is the United Kingdom, United States, Canada or Australia.

Large chains and marketplaces on a starter exclusion list, manufacturers selling their own brand, service providers, out-of-market businesses and non-skincare businesses are rejected when the source evidence supports the exclusion. Missing evidence is sent to **Needs Review**, not guessed.

## Stack

- n8n
- Serper API
- Google Gemini
- JavaScript
- Airtable

## Import and configure

The workflow export in this folder is a **sanitised template**, not a plug-and-play deployment.

1. Import `workflow.json` into n8n.
2. Add your own Serper and Google Gemini credentials.
3. Re-select your own Airtable base and tables in the Airtable nodes. Resource IDs and credential references have been removed from this public copy.
4. Confirm the Airtable fields and single-select options match the workflow mappings.
5. Edit the query list and target criteria in the relevant Code nodes.
6. Keep the schedule trigger disabled until manual tests pass.
7. Test discovery, same-batch deduplication, repeat-run updates, enrichment failures, evidence validation and all three qualification outcomes.

## Current status and limitations

This is a working prototype submitted as a technical assessment. The workflow export contains the stages described above, but a successful qualified-lead result and final execution metrics have not been verified for public reporting. No lead-volume, accuracy, time-saving, sales or conversion claims are made.

Other limitations:

- Search queries and qualification criteria are skincare-specific.
- Website extraction is limited to the homepage and up to four candidate pages.
- Bot-protection pages are skipped rather than bypassed.
- Email validation checks syntax only; it does not verify deliverability.
- Airtable performance on large datasets has not been benchmarked.
- The schedule trigger remains disabled.
- No outreach is sent and no production CRM is connected.

## Privacy and safety

The public workflow export has had credential references, instance metadata, webhook identifiers, personal contact details and Airtable resource IDs removed or replaced. Configure your own credentials and resource IDs locally. Never commit API keys, access tokens, private lead exports or personal contact data.

## Files

- `workflow.json` — sanitised n8n workflow template.
- Screenshots and a redacted sample output can be added after a final privacy and evidence review.
