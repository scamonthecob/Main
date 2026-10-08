# Cursor handoff

## Corrected project scope

Build a public archive of **all identifiable previous and future winners** from CamOnTheCob’s Twitch streams. This is the primary purpose. Recover winners from past VODs, keep new winners on record and include paid and payment-unknown records alongside disputed ones.

The homepage `index.html` must lead with that archive and explain why it is necessary: reported free cash offers, pressure to accept subs or return prizes, later eligibility discussions, and brief winner announcements without consistent visible tracking. General claims remain attributed to the maintainer’s observations. Individual complaint narratives belong in `cases.html`, linked at the end of the homepage.

This updated scope supersedes the homepage design in the earlier private Word handoff. That document remains useful for the supplied message history and reporting context.

## Files and runtime

Plain HTML, CSS and JavaScript; no browser installation or build is needed to view. Main files are `index.html`, `cases.html`, `assets/style.css`, `assets/app.js`, canonical `data/winners.json`, generated `data/winners.js`, and optional local `scripts/build_data.py`.

The Windows project path supplied by the owner is `E:\Stuff\GitHub\Scamonthecob\ScamOnTheCob_Website`. The update package excludes `data/` and existing evidence so it will not reset records added locally. The owner’s GitHub account is `scamonthecob`.

## Winner records

Each real announcement is a separate record with a stable ID, public winner name, date, prize, VOD link and timestamp. Unknown dates remain null. Skin or noncash prizes can have null amount and currency plus a description. Announcements and payment are independently tracked. A missing claim is not proof of nonpayment.

Add old winners even when they have no complaint. Keep paid winners visible. New bot detections remain private candidates until reviewed. Never invent winners, prize values or timestamps.

## Existing reported case

COB-001 is ImJaoBao’s reported unpaid $10 raffle. VOD https://www.twitch.tv/videos/2889810819 at 04:38:43, offset 16723 seconds. Actual win date and source message timezones are unconfirmed. Earlier prizes were paid. Claimant update on 2026-10-08: still unpaid and no Twitch response.

The supplied final message excludes the viewer from the community but does not explicitly cancel this prize. Detailed messages belong on the cases page and in the private handoff. They must not dominate the homepage.

## Next work

1. Apply the update and check both pages without overwriting local winner data.
2. Recover and review historical winner announcements, including the exact date and rules for COB-001.
3. Add redacted public evidence and precise VOD timestamps to the appropriate records.
4. Add specific reported cases separately, and update both record histories and case narratives when resolved.
5. Implement permitted read-only collection as described in BOT_PLAN.md, starting with real announcement samples and authorization checks.
6. Publish both pages and shared assets through GitHub Pages. Add an actual repository correction contact once known.

## Public copy and privacy

Describe the challenged practices directly, attribute observations, and attach sources. Do not present unverified counts, map odds, motives or fraud as established findings. Record supported responses and corrections. Keep payment emails, medical disclosures, private logs and credentials out of public files. Do not direct visitors to harass or repeatedly contact the streamer or other viewers.
