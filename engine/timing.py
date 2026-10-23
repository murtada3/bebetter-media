"""Map script phrases to speech segments in a voiceover.
usage: python3 timing.py voice.mp3 reel_key  -> prints JSON [[start,end,phrase],...]"""
import sys, json, re, subprocess
mp3, key = sys.argv[1], sys.argv[2]
text = json.load(open('/home/claude/bbreel/scripts.json', encoding='utf8'))[key]['text']
clean = re.sub(r'\[[^\]]*\]', ' ', text)
parts = [p.strip(' ،,') for p in re.split(r'\.\.\.|[.?!؟:]', clean)]
phr = [re.sub(r'\s+', ' ', p) for p in parts if p.strip(' ،,')]
out = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', mp3, '-af', 'silencedetect=n=-38dB:d=0.14', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3], capture_output=True, text=True).stdout)
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
sil = list(zip(ss, se + [dur] * (len(ss) - len(se))))
segs, cur = [], 0.0
for a, b in sil:
    if a - cur > 0.08: segs.append([cur, a])
    cur = b
if dur - cur > 0.08: segs.append([cur, dur])
# merge segments across the smallest gaps until counts match
while len(segs) > len(phr):
    gaps = [segs[i + 1][0] - segs[i][1] for i in range(len(segs) - 1)]
    # weight: prefer merging where the resulting phrase is short
    i = min(range(len(gaps)), key=lambda k: gaps[k])
    segs[i] = [segs[i][0], segs[i + 1][1]]; del segs[i + 1]
# split longest segments proportionally if too few
while len(segs) < len(phr):
    i = max(range(len(segs)), key=lambda k: segs[k][1] - segs[k][0])
    a, b = segs[i]; m = (a + b) / 2
    segs[i:i + 1] = [[a, m], [m, b]]
res = [[round(a, 2), round(b, 2), p] for (a, b), p in zip(segs, phr)]
print(json.dumps({'dur': round(dur, 2), 'phrases': res}, ensure_ascii=False, indent=0))
