function scenes(t){T_=t;
  const D=window.DUR;
  // HOOK: visible from frame 0 (and again at the end for loop)
  const endLoop=t>=S(10)-.15;
  {const a=t<S(1)?1:(endLoop?1:0);if(a>0){
    T('متعب اليوم؟',540,470,128,C.amber,{w:900,glow:'rgba(242,184,75,.55)',gb:40});
    owlM(540,930,1.35+.03*Math.sin(t*2),t,{mood:'tired',tilt:.06*Math.sin(t*1.5)});
  }}
  // not lazy -> hard habit (1-2)
  {const a=win(t,S(1)-.05,S(3)+.2,.15,.2);if(a>0){
    const x=eo(seg(t,S(1)+.5,S(1)+.9));
    T('ليس كسلاً',540,470,100,C.cream,{w:900,a:a});if(x>0){ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=C.coral;ctx.lineWidth=12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(760,476);ctx.lineTo(760-440*x,476);ctx.stroke();ctx.restore()}
    const st=eo(seg(t,S(2),S(2)+.4));if(st>0){ctx.save();ctx.globalAlpha=a*st;steps(980,1150,5,5,1,C.coral,false);ctx.restore();T('عادة صعبة',540,640,84,C.coral,{w:900,a:a*st})}
    owlM(250,1060,.85,t,{mood:'tired',a});
  }}
  // easier than excuse (3)
  {const a=win(t,S(3)-.05,S(4)+.2,.15,.2);if(a>0){
    const n=Math.round(lerp(5,1,eio(seg(t,S(3),S(3)+.7))));steps(980,1150,n,5,a,n<=1?C.mint:C.coral,false);
    hero('أسهل من العذر',540,520,100,S(3),['أسهل'],C.mint,a);
    owlM(250,1060,.85*(1+.08*back(seg(t,S(3)+.6,S(3)+.9))-.08*(t>S(3)+.6?1:0)),t,{mood:t>S(3)+.6?'happy':'tired',a});
  }}
  // book on pillow (4-5)
  {const a=win(t,S(4)-.05,S(6)+.15,.15,.2);if(a>0){
    T('تريد أن تقرأ؟',540,470,90,C.cream,{w:900,a:a*eo(seg(t,S(4),S(4)+.25))});
    const pl=back(seg(t,S(5),S(5)+.3));ctx.save();ctx.globalAlpha=a;if(pl>0)pillow(540,1000,1.5*pl);
    const by=lerp(680,950,eo(seg(t,S(5)+.15,S(5)+.6)));ctx.save();ctx.translate(540,by);const bs=back(seg(t,S(4),S(4)+.3));ctx.scale(bs*1.2,bs*1.2);ctx.fillStyle=C.blue;rrect(-130,-50,260,100,18);ctx.fill();icon('book',0,0,1.2,C.blue);ctx.restore();ctx.restore();
    owlM(860,1250,.6*back(seg(t,S(5)+.4,S(5)+.7)),t,{mood:'happy',a});
  }}
  // gym clothes (6-7)
  {const a=win(t,S(6)-.05,S(8)+.15,.15,.2);if(a>0){
    T('تريد الرياضة؟',540,470,90,C.cream,{w:900,a:a*eo(seg(t,S(6),S(6)+.25))});
    tshirt(540,900,1.9*back(seg(t,S(6),S(6)+.3)),C.coral);
    const m=back(seg(t,S(7),S(7)+.3));if(m>0){ctx.save();ctx.globalAlpha=a;ctx.translate(800,700);ctx.scale(m,m);ctx.fillStyle=C.cream;ctx.beginPath();ctx.arc(0,0,60,0,7);ctx.fill();ctx.fillStyle=C.bg;ctx.beginPath();ctx.arc(26,-18,54,0,7);ctx.fill();ctx.restore()}
    owlM(260,1180,.6*back(seg(t,S(7),S(7)+.3)),t,{mood:'happy',a});
  }}
  // send to a friend (8-9)
  {const a=win(t,S(8)-.05,S(10)-.1,.15,.15);if(a>0){
    const f=eo(seg(t,S(8),S(8)+.8));plane(lerp(200,880,f),lerp(640,360,f),1.1,a,-.3);
    hero('أرسلها لصديق',540,780,100,S(8),['لصديق'],C.amber,a);
    T('يقول كل يوم...',540,940,64,C.cream,{w:800,a:a*eo(seg(t,S(9),S(9)+.25))});
    owlM(540,1230,.6,t,{mood:'happy',a,point:true});
  }}
}
