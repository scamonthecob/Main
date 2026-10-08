# ScamOnTheCob cash prize tracker

A simple static website for GitHub Pages. It contains a claimant-attributed account of a disputed $10 raffle, a winners table with VOD timestamps, payment states, and an evidence policy. No installation or paid service is required to view the site.

## Open it

Double-click `index.html`, or open this folder in Cursor and use a static preview server. All assets are local. The generated `data/winners.js` lets the table work even in a `file://` preview.

## Put it on GitHub Pages

1. On the `scamonthecob` GitHub account, create a public repository named `scamonthecob.github.io`.
2. Upload the **contents of this folder** to the repository root. `index.html` must be at the top level, not inside another folder.
3. Open **Settings → Pages**. Choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and save.
4. Once GitHub finishes deployment, use **Visit site**. The intended address is `https://scamonthecob.github.io/`. This package has not created that repository or published that address.

GitHub reference: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

This also works in another repository: all internal asset URLs are relative. `.nojekyll` disables unnecessary Jekyll processing.

## Update winners

Edit `data/winners.json`, then run from this folder:

```bash
python scripts/build_data.py
```

Commit/upload **both** `winners.json` and generated `winners.js`. Edit `updatedAt` when a record changes. New records need unique IDs such as `COB-002`. Use `null` for an unknown win date or unknown VOD information; never guess. Sort order is latest known win date first, then undated records.

Allowed payment states: `unknown`, `winner_reports_unpaid`, `winner_reports_paid`, `payment_evidence_reviewed`. An announcement being `reviewed` says nothing about payment. Keep corrections in the record’s `history`.

The current case summary and narrative in `index.html` are editorial text: update them too if COB-001 is paid or new evidence changes the account. The initial HTML table is a no-JavaScript fallback; refresh it if you want no-JavaScript visitors to see new records. Normal visitors see generated data.

## Current evidence limits

- Only **one** outstanding prize is reported. No other winners were invented or marked unpaid.
- The win date is unconfirmed. The supplied VOD is `2889810819`, at `04:38:43` (16,723 seconds). Playback was unavailable during preparation; the announcement has not been independently verified.
- The Whisper quotes were supplied as pasted text. Original screenshots still need to be added.
- Earlier prizes were paid. The streamer’s final supplied message excludes the claimant from the community but does not explicitly state that this $10 payment is cancelled.
- The claimant reports Twitch has not answered as of 8 October 2026. No Twitch finding is known. A submitted report does not confirm active review.

## Add evidence

Store redacted public copies in `evidence/`, then add `{ "label": "Whisper screenshot 01", "url": "evidence/whisper-01.png" }` to a record's `evidenceLinks`. Keep untouched originals outside the public repository. Remove PayPal emails, real names, financial details and unrelated private messages from public copies. Clearly identify redactions. Do not fabricate or reconstruct screenshots. Public data files are downloadable, so private details do not belong there either.

Enable Issues after publishing and replace the corrections paragraph with a link to your repository if desired. The site has no submission form or backend.

## Continue in Cursor

Read `docs/CURSOR_HANDOFF.md` and `docs/BOT_PLAN.md`. The private Word handoff is delivered separately. **Do not upload that document or raw private transcripts to a public repository.**

No bot is implemented or running in this version. A future chat collector belongs in a separate process; GitHub Pages only serves static files. Candidate announcements must be reviewed, and chat cannot establish payment status.

Twitch reference: https://www.twitch.tv/p/terms-of-service
