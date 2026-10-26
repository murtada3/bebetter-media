function scenes(t){T_=t;
  const D=window.DUR, SEND=E(11)+.3, LOOP=D-.7;
  // HOOK: visible from frame 0, and again at the end (loop)
  {const a=t<S(2)-.05?1:(t>=LOOP?eo(seg(t,LOOP,LOOP+.2)):0);if(a>0){
    const lp=t>=LOOP;
    T('تستمر في لعبة',540,430,96,C.cream,{w:940,a});
    gamepad(540,640,1.0+.03*Math.sin(t*3),a);
    const b=1;
    T('ولا تستمر في عادة؟',540,880,96,C.amber,{w:940,a:a*b,glow:'rgba(242,184,75,.5)',gb:30});
    tile(HAB[1],540,1100,.9,a*b);
    owlM(860,1300,.55,t,{mood:'tired',a:a*b});
  }}
  // game shows progress (2-5)
  {const a=win(t,S(2)-.05,E(5)+.3,.2,.3);if(a>0){
    gamepad(540,560,.8,a);
    const sc=Math.round(lerp(0,1250,eo(seg(t,S(3),E(5)))));T(AR(sc),540,800,120,C.amber,{w:900,a:a*eo(seg(t,S(3),S(3)+.3)),glow:'rgba(242,184,75,.5)'});
    T('نقاط',540,890,44,C.muted,{w:700,a:a*eo(seg(t,S(3),S(3)+.3))});
    const lv=back(seg(t,S(4),S(4)+.4));if(lv>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,990);ctx.scale(lv,lv);ctx.fillStyle=C.lav;rrect(-110,-50,220,100,30);ctx.fill();T('مستوى ٥',0,2,44,C.cream,{w:900});ctx.restore()}
    xpbar(540,1160,760,eo(seg(t,S(5),S(5)+1.0)),a*eo(seg(t,S(5),S(5)+.3)));
  }}
  // habit progress is invisible (6-7)
  {const a=win(t,S(6)-.05,E(7)+.25,.2,.3);if(a>0){
    tile(HAB[1],540,620,1.0*back(seg(t,S(6),S(6)+.4)),a);
    ctx.save();ctx.globalAlpha=a*eo(seg(t,S(7),S(7)+.3));ctx.strokeStyle=C.muted;ctx.lineWidth=5;ctx.setLineDash([16,14]);rrect(160,880,760,40,20);ctx.stroke();ctx.restore();
    T('؟',540,820,90,C.muted,{w:900,a:a*eo(seg(t,S(7),S(7)+.4))});
    owlM(540,1180,.75,t,{mood:'tired',a});
  }}
  // make it visible: wall chart (8-10)
  {const a=win(t,S(8)-.05,E(10)+.3,.2,.3);if(a>0){
    hero('اجعل تقدمك مرئياً',540,440,92,S(8),['مرئياً'],C.mint,a);
    const g=eo(seg(t,S(9),S(9)+.4));if(g>0){const cw=104,gp=14,x0=540+3*(cw+gp),y0=680;
      ctx.save();ctx.globalAlpha=a*g;ctx.fillStyle='#232c42';rrect(70,y0-90,940,4*(cw+gp)+130,30);ctx.fill();ctx.restore();
      for(let k=0;k<28;k++){const r=Math.floor(k/7),c=k%7,x=x0-c*(cw+gp),y=y0+r*(cw+gp);ctx.save();ctx.globalAlpha=a*g;ctx.fillStyle=C.cell;rrect(x-cw/2,y-cw/2,cw,cw,18);ctx.fill();ctx.restore();
        const ct=S(10)+k*.12;if(k<7)check(x,y,52,seg(t,ct,ct+.2),C.mint,9)}}
  }}
  // streak you don't want to break (11)
  {const a=win(t,S(11)-.05,SEND,.2,.25);if(a>0){const G=130,xs=540+3*G;
    const gl=eo(seg(t,S(11)+.4,S(11)+1.2));
    for(let i=0;i<7;i++)dayDot(xs-i*G,880,52,'done',back(seg(t,S(11)+i*.07,S(11)+i*.07+.35)),a,gl);
    chainLinks(xs,xs-6*G,880,7,t,-1,a*gl,gl);
    flame(540,620,1.1*back(seg(t,S(11)+.4,S(11)+.85)),a,t);T('٧ أيام',540,760,56,C.amber,{w:900,a:a*gl});
    owlM(540,1180,.7*back(seg(t,S(11)+.8,S(11)+1.1)),t,{mood:'happy',a});
  }}
  // CTA end card (silent)
  {const a=win(t,SEND,LOOP,.2,.15);if(a>0){
    const f=eo(seg(t,SEND,SEND+.9));plane(lerp(200,880,f),lerp(640,360,f),1.1,a,-.3);
    hero('أرسلها لصديق',540,780,100,SEND,['لصديق'],C.amber,a);
    T('يكمل الألعاب... ويترك عاداته',540,940,58,C.cream,{w:880,a:a*eo(seg(t,SEND+.4,SEND+.7))});
    owlM(540,1230,.6,t,{mood:'happy',a,point:true});
  }}
}
