# Future winner collector

This is a specification, not a working bot. Its job is to record **candidate announcements**, then publish reviewed winner records. It cannot determine whether a cash transfer happened.

## Access and hosting

Use Twitch’s documented chat interface and a dedicated read-only collector process. Twitch documents EventSub `channel.chat.message`, OAuth, WebSocket and webhook transports. Check the precise authorization requirements for the chosen transport before implementation; do not assume the broadcaster will authorize this project. Do not bypass access restrictions or reconnect with alternate identities after exclusion.

For the current documented subscription type, receiving with a user access token requires `user:read:chat`; using an app access token adds bot-related authorization conditions. Cursor should verify the current subscription documentation, perform a permitted connection test, and report any authorization blocker instead of implementing an evasion route.

The static site has no secrets. Keep Twitch/GitHub credentials in the collector’s environment or private secret store. GitHub Pages does not run a persistent collector. Choose a separate machine or service after the owner decides how to host it.

Sources checked 8 October 2026:

- https://dev.twitch.tv/docs/chat/
- https://dev.twitch.tv/docs/chat/authenticating/
- https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/#channelchatmessage

## Collection pipeline

1. Receive allowed messages from the target chat; store UTC receipt time, Twitch event/message ID, sender ID and text in a private log.
2. Match **actual observed** winner announcements from the broadcaster or the specific trusted raffle/game bot. Do not invent a regular expression until real samples exist. A viewer saying “I won” or “congratulations” is not sufficient.
3. Save a candidate with `pending_review`, the exact source message and inferred fields. Deduplicate by event/message ID and by giveaway instance, not username alone. Retries must not create duplicate winners.
4. Associate the message with the correct stream session. An offset computed from message time minus stream start is approximate; delays, restarts and VOD segmentation can shift it. Review playback and set the final timestamp. A chat-only collector will miss announcements made only in speech or on a game overlay.
5. Reviewer confirms the winner, prize, win date and VOD context. Reject false positives or missing evidence. New payment status defaults to `unknown`.
6. Merge approved records into `data/winners.json`, append history, run `scripts/build_data.py`, and publish the public files. Use a reviewable change rather than publishing raw candidate text.

Keep raw chat logs and the review queue private. Export only reviewed fields needed for this site. Do not retain unrelated conversations indefinitely.

## Candidate shape

```json
{
  "candidateId": "twitch-message-id",
  "state": "pending_review",
  "receivedAtUtc": "ISO-8601 timestamp",
  "streamId": null,
  "sourceMessageId": "twitch-message-id",
  "sourceSenderId": "trusted-sender-id",
  "sourceText": "original announcement text",
  "winner": null,
  "prizeAmount": null,
  "currency": null,
  "vodId": null,
  "approximateOffsetSeconds": null
}
```

## Publication and verification

If future updates come from GitHub Actions, do not rely on commits using the default `GITHUB_TOKEN` to trigger a Pages branch build: GitHub documents that limitation. Use an explicit Pages deployment workflow or an appropriate reviewed push mechanism when automation is added. The first manual deployment can use the simpler branch route in README.

Test against real samples: genuine winner, skin-only prize, joke, quoted past winner, viewer self-claim, repeated delivery, two wins by the same viewer, missing VOD, stream restart and late payment correction. An access token belongs only in the private collector process and never in a browser bundle or commit.

GitHub source: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
