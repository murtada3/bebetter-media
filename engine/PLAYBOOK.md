# Be Better reel playbook (research 2026-10-26)

Ranking (Mosseri / Instagram): watch time incl. replays, sends per reach (top signal for non-followers),
likes per reach (followers), two-way conversation (comment replies, DMs), originality (aggregators lose recommendations).
About half of reels are watched muted -> on-screen text must carry the message.

Rules for every reel
1. 15-22s. Hook text + owl visible at frame 0, no intro. Hook names the viewer's pain/situation.
2. One idea, a concrete action, no lecture. Every 1-2s something changes on screen.
3. Silent end card: "أرسلها لصديق ..." naming a specific kind of friend, then cut back to the hook frame (loop).
4. Original: own owl character, own animation, own script. Keep AI labels on (voice is AI).
5. Caption: first line = hook, Arabic keywords for search, CTA to send, max 5 hashtags.
6. Cover = frame at 0.5s (the hook).
7. Voice: reuse existing Rawi recordings when the sentences exist; otherwise generate via
   ElevenLabs flow (creative_generate_in_flow estimate_only -> creative_run_flow_nodes, count 1).
   creative_generate_speech returns 429; the flow path works.
8. Judge by rates: avg watch %, sends/reach, follows/reach, not raw views.
9. Later: Trial Reels to test 2 hooks of the same idea (counts toward the 20/month Metricool plan).
10. User should reply to comments in the first hour.
