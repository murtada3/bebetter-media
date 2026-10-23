import json, sys
k=sys.argv[1]; B='/home/claude/bbreel/'
tm=json.load(open(B+k+'/timing.json',encoding='utf8')); spec=json.load(open(B+k+'/spec.json',encoding='utf8'))
dur=round(tm['dur']+float(spec.get('tail',1.2)),2)
ph=tm['phrases']; hero=set(spec.get('hero',[])); hl=spec.get('hl',{}); hc=spec.get('hc',{})
P=[]
for i,(a,b,txt) in enumerate(ph):
    if i in hero: continue
    P.append([a,b,txt,hl.get(str(i),[]),hc.get(str(i))])
js='window.__DUR=%s;'%dur
head=open(B+'lib_head.html',encoding='utf8').read().replace('<script>','<script>\n'+js,1)
pre='const PH=%s;\nconst S=i=>PH[i][0],E=i=>PH[i][1];\nconst P=%s.map(p=>{if(p[4]==null)p.pop();else p[4]=C[p[4]];return p});\n'%(json.dumps(ph,ensure_ascii=False),json.dumps(P,ensure_ascii=False))
html=head+'\n'+pre+open(B+'lib_cap.js',encoding='utf8').read()+'\n'+open(B+'lib_comp.js',encoding='utf8').read()+'\n'+open(B+k+'/scenes.js',encoding='utf8').read()+'\n'+open(B+'lib_tail.html',encoding='utf8').read()
open(B+k+'.html','w',encoding='utf8').write(html); print('built',k,'dur',dur)
