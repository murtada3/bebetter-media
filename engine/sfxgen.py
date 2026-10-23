"""Generic SFX track from spec.json 'sfx': [[phrase_idx, offset, kind, gain, pan, extra]]
kinds: pop(freq) tick(freq) whoosh(dur,up) chime(freq) thud buzz
usage: python3 sfxgen.py rK"""
import sys, json
src = open('/home/claude/bbreel/sfx.py').read().split('E = []')[0]
k = sys.argv[1]; B = '/home/claude/bbreel/'
tm = json.load(open(B + k + '/timing.json', encoding='utf8')); spec = json.load(open(B + k + '/spec.json', encoding='utf8'))
DURV = tm['dur'] + float(spec.get('tail', 1.2))
exec(src.replace('DUR = 45.4', 'DUR = %f' % DURV))
S = lambda i: tm['phrases'][i][0]
E = []
for ev in spec.get('sfx', []):
    i, off, kind, g, pan = ev[:5]; x = ev[5] if len(ev) > 5 else None
    t0 = (S(i) if i >= 0 else 0) + off
    if kind == 'pop': s = pop(x or 523)
    elif kind == 'tick': s = tick(x or 2000)
    elif kind == 'whoosh': s = whoosh(x or .5, True)
    elif kind == 'whooshd': s = whoosh(x or .5, False)
    elif kind == 'chime': s = chime(x or 659, 1.3)
    elif kind == 'thud': s = thud(x or 70)
    elif kind == 'buzz': s = buzz(x or .25)
    E.append((max(0, t0), s, g, pan))
L = np.zeros(int(DUR * SR) + SR); R = np.zeros_like(L)
for t0, s, g, pan in E:
    i = int(t0 * SR); a = (pan + 1) * np.pi / 4; sg = s * g; n = min(len(sg), len(L) - i)
    L[i:i + n] += sg[:n] * np.cos(a); R[i:i + n] += sg[:n] * np.sin(a)
st = np.stack([L, R], 1)[:int(DUR * SR)]
st = sosfilt(butter(2, 60, 'high', fs=SR, output='sos'), st, axis=0)
st /= max(1e-6, np.abs(st).max()) * 1.05
wavfile.write(B + k + '/sfx.wav', SR, (st * 32767).astype(np.int16)); print('sfx events', len(E))
