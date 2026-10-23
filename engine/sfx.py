import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
SR = 48000; DUR = 45.4
rng = np.random.default_rng(3)
def tt(d): return np.arange(int(d*SR))/SR
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)
def tick(f=2200):
    t = tt(.035); return .5*np.sin(2*np.pi*f*t)*np.exp(-t*140) + .3*bp(rng.standard_normal(len(t)), 2000, 6000)*np.exp(-t*200)
def pop(f=523):
    t = tt(.18); ph = 2*np.pi*np.cumsum(f*(1+.6*np.exp(-t*40)))/SR
    return .8*np.sin(ph)*np.exp(-t*22)*(1-np.exp(-t*900))
def whoosh(d=.5, up=True):
    t = tt(d); n = rng.standard_normal(len(t)); k = t/d
    lo = 300 + (k if up else 1-k)*2500; out = np.zeros_like(n)
    for i in range(0, len(n), 512):
        c = lo[i]; out[i:i+512] = bp(n[i:i+512] if i == 0 else n[max(0,i-256):i+512], c, c*2.2)[-len(n[i:i+512]):]
    return .5*out*np.sin(np.pi*k)**1.6
def chime(f=659, d=1.6):
    t = tt(d); y = sum(a*np.sin(2*np.pi*f*m*t)*np.exp(-t*dk) for m, a, dk in [(1,1,2.2),(2.01,.45,3.5),(2.76,.25,5),(5.4,.12,8)])
    return .45*y*(1-np.exp(-t*600))
def thud(f=70):
    t = tt(.45); ph = 2*np.pi*np.cumsum(f*(1+1.5*np.exp(-t*25)))/SR
    return .9*np.sin(ph)*np.exp(-t*9) + .3*lp(rng.standard_normal(len(t)), 400)*np.exp(-t*20)
def buzz(d=.25):
    t = tt(d); return .25*lp(np.sign(np.sin(2*np.pi*140*t)), 900)*np.sin(np.pi*t/d)**.5

E = []  # (time, sound, gain, pan)
E += [(.35, whoosh(.55, True), .5, .6)]
for i, f in enumerate([392, 440, 494, 587]): E.append((1.0+i*.35, pop(f), .8, .6-.3*i))
E += [(3.35, thud(), .5, -.4), (3.38, buzz(), .7, -.4), (4.4, whoosh(.5, False), .45, 0), (6.15, pop(880), .3, 0)]
for i, (ti, f) in enumerate(zip([8.89, 9.55, 10.31, 11.49], [392, 494, 587, 698])): E.append((ti, pop(f), .8, (-1)**i*.15))
E += [(14.9, whoosh(.7, False), .45, 0), (16.62, thud(60), .55, 0), (16.65, whoosh(1.0, False), .6, 0),
      (19.75, whoosh(.4, True), .5, .3), (21.38, chime(659), .9, 0),
      (23.3, whoosh(.5, False), .45, -.3), (23.45, pop(523), .7, .3), (25.3, whoosh(1.3, False), .5, 0),
      (29.07, whoosh(.6, False), .35, 0), (30.15, pop(784), .7, 0), (31.45, whoosh(.65, True), .45, 0), (32.3, buzz(), .6, 0)]
# countdown 60->5 ticks every 3 values, same easing as scene
def eio(x): x = np.clip(x,0,1); return np.where(x<.5, 4*x**3, 1-(-2*x+2)**3/2)
prev = 60
for f in range(int(32.95*300), int(33.8*300)):
    t = f/300; v = round(60+(5-60)*float(eio((t-32.95)/.8)))
    if prev - v >= 3: E.append((t, tick(1800+ (60-v)*15), .5, 0)); prev = v
E += [(33.78, chime(784), .85, 0)]
for k in range(0, 30, 2): E.append((34.95+k*.03, tick(1500), .3, .6-(k%6)*.24))
E += [(36.6, pop(523), .9, .6)]
for k in range(1, 12): E.append((36.95+(k-1)*.11, pop(523+k*30), .45, .6-(k%6)*.24))
E += [(38.3, whoosh(.6, True), .35, 0), (38.42, pop(880), .3, .5)]
for k in range(12, 16): E.append((40.8+(k-12)*.28, pop(660+(k-12)*40), .45, 0))
E += [(42.3, whoosh(.55, True), .45, 0), (42.72, whoosh(.5, True), .3, .6), (43.82, pop(587), .7, .6), (44.05, chime(523, 1.3), .8, 0)]

L = np.zeros(int(DUR*SR)+SR); R = np.zeros_like(L)
for t0, s, g, pan in E:
    i = int(t0*SR); a = (pan+1)*np.pi/4; seg = s*g
    L[i:i+len(seg)] += seg*np.cos(a); R[i:i+len(seg)] += seg*np.sin(a)
st = np.stack([L, R], 1)[:int(DUR*SR)]
st = sosfilt(butter(2, 60, 'high', fs=SR, output='sos'), st, axis=0)
st /= np.abs(st).max()*1.05
wavfile.write('sfx.wav', SR, (st*32767).astype(np.int16))
print('events', len(E))
