# ScamOnTheCob winners archive

A static GitHub Pages site for recording **all identifiable past and future winners** from CamOnTheCob’s Twitch races and raffles. The homepage shows the archive and explains the reported giveaway practices that make this record necessary. `cases.html` holds detailed individual complaints and supporting evidence.

The archive includes paid, reportedly unpaid and payment-unknown winners. A winner does not need a complaint to be recorded. Historical winners can be added when their announcements are recovered from VODs.

## Apply this update to the existing folder

Extract **the contents** of `ScamOnTheCob_Website_Update.zip` into:

`E:\Stuff\GitHub\Scamonthecob\ScamOnTheCob_Website`

Allow replacement of the supplied page, asset, script and documentation files. The update ZIP has no enclosing folder and **does not include `data/winners.json` or `data/winners.js`**, so it preserves any winners already added on your computer. Keep your existing `data/` and `evidence/` folders. This update is for the website package delivered earlier.

## Open and publish

Open `index.html` in a browser or preview the folder in Cursor. The generated `data/winners.js` allows direct `file://` preview. `cases.html` is linked at the end of the homepage.

Upload the site contents to the root of `scamonthecob.github.io`, including both HTML pages, `assets/`, `data/`, and `.nojekyll`. Configure GitHub Pages to deploy from `main` and `/ (root)`. The live site uses HTML, CSS and JavaScript. Python is an optional local data-building tool; GitHub Pages does not run it.

GitHub reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Add previous and future winners

Edit `data/winners.json`, then run locally from the website folder:

```bash
python scripts/build_data.py
```

Upload both `winners.json` and the generated `winners.js`. Cursor can also regenerate `winners.js` from the JSON. Use stable IDs such as `COB-002`, a public Twitch username, the prize, a date when verified, and the VOD timestamp. Keep the source and relevant context. One viewer can have several records for distinct wins.

Known dates appear newest first; undated records follow. Use `null` for genuinely unknown dates or VOD details. Never infer a date from a relative Whisper label.

### Cash and noncash prizes

Cash keeps the existing format: `"prize": {"amount": 10, "currency": "USD", "kind": "Raffle"}`.

For a skin or another prize without a known cash value, use `"prize": {"amount": null, "currency": null, "kind": "Marbles skin", "description": "Name of the announced skin"}`. Do not invent a dollar valuation.

### Payment status

Use `unknown`, `winner_reports_unpaid`, `winner_reports_paid`, `payment_evidence_reviewed` or `winner_reports_accepted_subs`. A reviewed announcement says who won, not whether money was sent. Preserve corrections in the record’s dated `history`. Never mark every old or unclaimed prize unpaid.

The homepage reads all records in the data file. Its initial HTML row and counts are a no-JavaScript snapshot; refresh that snapshot if you need it to reflect new records for visitors without JavaScript.

## Add reported cases

Add sourced complaints to `cases.html` with the corresponding winner record ID. Keep actual messages, payment reports, source dates, the channel owner’s response and corrections together. If COB-001 is paid, update its JSON payment history **and** its separate case text. Keep the resolved winner in the archive.

The one supplied case is still a claimant report. COB-001 is dated 2 Oct 2026 on VOD `2889810819` at `04:38:45`. Original Whisper screenshots are still needed.

## Evidence and future collection

Add redacted public evidence to `evidence/`; keep untouched originals privately. Do not upload payment emails, financial details, unrelated messages or the private Word handoff. Public data files are downloadable too.

The future Twitch collector remains a separate process described in `docs/BOT_PLAN.md`. It finds candidate announcements for review and cannot establish payment. No automatic collection is running in this version.

Read `docs/CURSOR_HANDOFF.md` for the corrected project scope. The earlier Word handoff preserves the dispute history, but this README and the updated Cursor brief supersede its homepage design instructions.
