#!/usr/bin/env python3
"""Be Better clip maker. usage: python3 make_clip.py spec.json
spec: {src, out, crop:[w,h,x,y], segments:[[start,end],...], header, cta, credit, note:[line1,line2], note_at,
       subs:[[out_start,out_end,"white text","amber text or empty"],...]}
Times in subs are OUTPUT times (after concatenating segments)."""
import json,sys,subprocess,asyncio,os
from playwright.async_api import async_playwright
HERE=os.path.dirname(os.path.abspath(__file__))
sp=json.load(open(sys.argv[1],encoding='utf8'))
W=os.path.join(os.path.dirname(os.path.abspath(sys.argv[1])),'_ov');os.makedirs(W,exist_ok=True)
segs=sp['segments'];D=round(sum(b-a for a,b in segs),3)
# 1) cut + concat, punch-in 6% on every segment after the first to hide jump cuts
cw,ch,cx,cy=sp['crop'];fc='';cat=''
for i,(a,b) in enumerate(segs):
    z=1.0 if i==0 else 1.06
    fc+=(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,crop={cw}:{ch}:{cx}:{cy},scale={int(1080*z)}:{int(1230*z)},crop=1080:1230,fps=30,setsar=1[v{i}];"
         f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d=0.04,afade=t=out:st={b-a-0.06:.3f}:d=0.06[a{i}];")
    cat+=f"[v{i}][a{i}]"
fc+=f"{cat}concat=n={len(segs)}:v=1:a=1[v][a]"
cut=os.path.join(W,'cut.mp4')
subprocess.run(['ffmpeg','-y','-v','error','-i',sp['src'],'-filter_complex',fc,'-map','[v]','-map','[a]','-c:v','libx264','-crf','16','-c:a','aac','-b:a','192k',cut],check=True)
# 2) overlay PNGs
async def mk():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+os.path.join(HERE,'overlay.html'))
        for f in ["800 40px Cairo","600 40px Cairo"]: await pg.evaluate(f"document.fonts.load('{f}','ا')")
        async def shot(kind,arg,name):
            await pg.evaluate(f"draw({json.dumps(kind)},{json.dumps(arg,ensure_ascii=False)})")
            await pg.locator('canvas').screenshot(path=os.path.join(W,name),omit_background=True)
        await shot('header',sp['header'],'h1.png');await shot('header',sp['cta'],'h2.png')
        await shot('credit',sp['credit'],'cr.png');await shot('note',sp['note'],'note.png')
        for i,(a,b2,t1,t2) in enumerate(sp['subs']): await shot('sub',[t1,t2 or None],f's{i}.png')
        await b.close()
asyncio.run(mk())
cta_at=round(D-2.2,2);lay=[('h1.png',0,cta_at),('h2.png',cta_at,D),('cr.png',0,D),('note.png',sp.get('note_at',D-8),D)]
lay+=[(f's{i}.png',a,b2) for i,(a,b2,_,__) in enumerate(sp['subs'])]
inp=['-i',cut]
for n,a,b2 in lay: inp+=['-loop','1','-t',str(D),'-i',os.path.join(W,n)]
fc=f"color=c=0x0f1620:s=1080x1920:d={D}:r=30[bg];[bg][0:v]overlay=0:250[b0]";prev='b0'
for i,(n,a,b2) in enumerate(lay,1): fc+=f";[{prev}][{i}:v]overlay=0:0:enable='between(t,{a},{b2})'[b{i}]";prev=f'b{i}'
fc+=";[0:a]loudnorm=I=-14:TP=-1.5[a]"
subprocess.run(['ffmpeg','-y','-v','error']+inp+['-filter_complex',fc,'-map',f'[{prev}]','-map','[a]','-t',str(D),'-c:v','libx264','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart',sp['out']],check=True)
print('done',sp['out'],D)
