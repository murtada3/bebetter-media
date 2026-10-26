function scenes(t){T_=t;
  const D=window.DUR, SEND=E(10)+.35, LOOP=D-.75;
  // HOOK (frame 0) + same frame at the end for loop
  {const a=t<S(1)-.05?1:(t>=LOOP?eo(seg(t,LOOP,LOOP+.2)):0);if(a>0){
    T('متعب اليوم؟',540,470,128,C.amber,{w:900,a,glow:'rgba(242,184,75,.55)',gb:40});
    owlM(540,930,1.35+.03*Math.sin(t*2),t,{mood:'tired',a,tilt:.06*Math.sin(t*1.5)});
  }}
  // excuse wins when habit is hard (1-2)
  {const a=win(t,S(1)-.05,S(3)-.05,.15,.2);if(a>0){
    hero('والعذر يفوز',540,470,104,S(1),['العذر'],C.coral,a);
    const st=eo(seg(t,S(2),S(2)+.4));if(st>0){ctx.save();ctx.globalAlpha=a*st;steps(980,1150,5,5,1,C.coral,false);ctx.restore();hero('عندما تكون العادة صعبة',540,640,70,S(2),['صعبة'],C.coral,a*st)}
    owlM(250,1060,.85,t,{mood:'tired',a});
  }}
  // the fix: easier than the excuse (3-4)
  {const a=win(t,S(3)-.05,S(5)-.05,.15,.2);if(a>0){
    hero('الحل',540,400,80,S(3),['الحل'],C.amber,a);
    const n=Math.round(lerp(5,1,eio(seg(t,S(4),S(4)+.9))));steps(980,1150,n,5,a,n<=1?C.mint:C.coral,false);
    if(t>S(4)-.05)hero('اجعل العادة أسهل من العذر',540,560,80,S(4),['أسهل'],C.mint,a);
    const hp=t>S(4)+.8;owlM(250,1060,.85*(1+.08*back(seg(t,S(4)+.8,S(4)+1.1))),t,{mood:hp?'happy':'tired',a});
  }}
  // book on pillow (5-6)
  {const a=win(t,S(5)-.05,S(7)-.05,.15,.2);if(a>0){
    hero('تريد أن تقرأ؟',540,470,90,S(5),[],C.cream,a);
    const pl=back(seg(t,S(6),S(6)+.3));ctx.save();ctx.globalAlpha=a;if(pl>0)pillow(540,1000,1.5*pl);
    const by=lerp(680,950,eo(seg(t,S(6)+.15,S(6)+.6)));ctx.save();ctx.translate(540,by);const bs=back(seg(t,S(5),S(5)+.3));ctx.scale(bs*1.2,bs*1.2);ctx.fillStyle=C.blue;rrect(-130,-50,260,100,18);ctx.fill();icon('book',0,0,1.2,C.blue);ctx.restore();ctx.restore();
    owlM(860,1250,.6*back(seg(t,S(6)+.4,S(6)+.7)),t,{mood:'happy',a});
  }}
  // gym clothes (7-8)
  {const a=win(t,S(7)-.05,S(9)-.05,.15,.2);if(a>0){
    hero('تريد الرياضة؟',540,470,90,S(7),[],C.cream,a);
    tshirt(540,900,1.9*back(seg(t,S(7),S(7)+.3)),C.coral);
    const m=back(seg(t,S(8),S(8)+.3));if(m>0){ctx.save();ctx.globalAlpha=a;ctx.translate(800,700);ctx.scale(m,m);ctx.fillStyle=C.cream;ctx.beginPath();ctx.arc(0,0,60,0,7);ctx.fill();ctx.fillStyle=C.bg;ctx.beginPath();ctx.arc(26,-18,54,0,7);ctx.fill();ctx.restore()}
    owlM(260,1180,.6*back(seg(t,S(8),S(8)+.3)),t,{mood:'happy',a});
  }}
  // fewer steps -> fewer excuses (9-10)
  {const a=win(t,S(9)-.05,SEND,.15,.2);if(a>0){
    hero('كلما قلّت الخطوات',540,470,92,S(9),['الخطوات'],C.mint,a);
    const n=Math.round(lerp(5,1,eio(seg(t,S(9)+.2,S(9)+1.2))));steps(980,1100,n,5,a,C.mint,false);
    if(t>S(10)-.05)hero('قلّت الأعذار',540,640,104,S(10),['الأعذار'],C.amber,a);
    owlM(250,1230,.7,t,{mood:'happy',a});
  }}
  // CTA: send to a friend (silent end card)
  {const a=win(t,SEND,LOOP,.2,.15);if(a>0){
    const f=eo(seg(t,SEND,SEND+.9));plane(lerp(200,880,f),lerp(640,360,f),1.1,a,-.3);
    hero('أرسلها لصديق',540,780,100,SEND,['لصديق'],C.amber,a);
    T('يقول كل يوم... متعب اليوم',540,940,58,C.cream,{w:860,a:a*eo(seg(t,SEND+.5,SEND+.8))});
    owlM(540,1230,.6,t,{mood:'happy',a,point:true});
  }}
}
