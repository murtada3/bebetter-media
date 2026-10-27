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

## Style decision (2026-10-27): LINE-ART is the approved style
User rejected: cartoon owl reels, nature+quote clips, the v2 cartoon scene style.
Approved "for now": minimal line-art (engine/lineart/la.html):
- One continuous white line that morphs scene to scene (resampled polylines), no hard cuts; ends by morphing back to the first shape (loop).
- Muted blue bg (#1e3a4c->#152a38), paper grain, vignette; ONE accent color amber #f2c063 only on the key element.
- Amiri font, two lines at top (96px cream + 112px amber), synced to Rawi voice phrase timing.
- Rawi voice (eleven_v4) + calm piano bed engine/music_calm.mp3 at about -26 LUFS under voice, final -14.
- Silent end card: "أرسلها لـ..." naming a kind of friend.
- ElevenLabs: generate via creative_add_flow_node + creative_run_flow_nodes (direct generate tools return 429).
