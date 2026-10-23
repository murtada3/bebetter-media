function scenes(t){T_=t;
  // S1: game vs habit (0-1)
  {const a=win(t,-1,S(2)+.3,.3,.4);if(a>0){
    gamepad(540,620,1.1*back(seg(t,0,.45)),a);
    tile(HAB[1],540,980,1.0*back(seg(t,S(1),S(1)+.4)),a);
    T('؟',840,980,110,C.muted,{w:900,a:a*eo(seg(t,S(1)+.3,S(1)+.6))});
  }}
  // S2: game HUD (2-6)
  {const a=win(t,S(2)-.1,E(6)+.4,.3,.4);if(a>0){
    gamepad(540,560,.8,a);
    const sc=Math.round(lerp(0,1250,eo(seg(t,S(3),E(6)))));T(AR(sc),540,800,120,C.amber,{w:900,a:a*eo(seg(t,S(3),S(3)+.3)),glow:'rgba(242,184,75,.5)'});
    T('نقاط',540,890,44,C.muted,{w:700,a:a*eo(seg(t,S(4),S(4)+.3))});
    const lv=back(seg(t,S(5),S(5)+.4));if(lv>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,990);ctx.scale(lv,lv);ctx.fillStyle=C.lav;rrect(-110,-50,220,100,30);ctx.fill();T('مستوى ٥',0,2,44,C.cream,{w:900});ctx.restore()}
    xpbar(540,1160,760,eo(seg(t,S(6),S(6)+1.0)),a*eo(seg(t,S(6),S(6)+.3)));
  }}
  // S3: habit progress invisible (7-10)
  {const a=win(t,S(7)-.1,E(10)+.4,.3,.4);if(a>0){
    tile(HAB[1],540,620,1.0*back(seg(t,S(7),S(7)+.4)),a);
    ctx.save();ctx.globalAlpha=a*eo(seg(t,S(8),S(8)+.3));ctx.strokeStyle=C.muted;ctx.lineWidth=5;ctx.setLineDash([16,14]);rrect(160,880,760,40,20);ctx.stroke();ctx.restore();
    T('؟',540,820,90,C.muted,{w:900,a:a*eo(seg(t,S(8),S(8)+.4))});
    const fade=eo(seg(t,S(9),S(9)+.8));if(fade>0){T('يتوقف',540,1060,90,C.coral,{w:900,a:a*fade})}
  }}
  // S4: the solution + wall chart (11-16)
  {const a=win(t,S(11)-.1,E(16)+.4,.3,.4);if(a>0){
    const up=eo(seg(t,S(12),S(12)+.4));
    hero('الحل',540,lerp(800,440,up),130,S(11),['الحل'],C.amber,a);
    const g=eo(seg(t,S(13),S(13)+.4));if(g>0){const cw=104,gp=14,x0=540+3*(cw+gp),y0=640;
      ctx.save();ctx.globalAlpha=a*g;ctx.fillStyle='#232c42';rrect(70,y0-90,940,4*(cw+gp)+130,30);ctx.fill();ctx.restore();
      for(let k=0;k<28;k++){const r=Math.floor(k/7),c=k%7,x=x0-c*(cw+gp),y=y0+r*(cw+gp);ctx.save();ctx.globalAlpha=a*g;ctx.fillStyle=C.cell;rrect(x-cw/2,y-cw/2,cw,cw,18);ctx.fill();ctx.restore();
        const ct=S(14)+k*.12;if(k<7)check(x,y,52,seg(t,ct,ct+.2),C.mint,9)}
      // +1 points
      if(t>S(15)){const sc=Math.min(7,Math.floor((t-S(15))/0.22)+1);T('+'+AR(sc),540,1180,90,C.amber,{w:900,a:a*eo(seg(t,S(15),S(15)+.3)),glow:'rgba(242,184,75,.5)'});
        T('نقطة',540,1270,44,C.muted,{w:700,a:a*eo(seg(t,S(16),S(16)+.3))})}
    }
  }}
  // S5: streak (17-18)
  {const a=win(t,S(17)-.1,E(18)+.4,.3,.4);if(a>0){const G=130,xs=540+3*G;
    const gl=eo(seg(t,S(18),S(18)+.6));
    for(let i=0;i<7;i++)dayDot(xs-i*G,880,52,'done',back(seg(t,S(17)+i*.07,S(17)+i*.07+.35)),a,gl);
    chainLinks(xs,xs-6*G,880,7,t,-1,a*gl,gl);
    flame(540,620,1.1*back(seg(t,S(18),S(18)+.45)),a,t);T('٧ أيام',540,760,56,C.amber,{w:900,a:a*gl});
  }}
  // S6: start with one mark (19-20)
  {const a=win(t,S(19)-.1,99,.3,.1);if(a>0){
    const c=back(seg(t,S(19),S(19)+.4));if(c>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,800);ctx.scale(c,c);ctx.fillStyle=C.cell;rrect(-130,-130,260,260,40);ctx.fill();ctx.restore()}
    check(540,800,150,seg(t,S(20),S(20)+.35),C.mint,20);
    T('اليوم',540,580,56,C.muted,{w:800,a:a*eo(seg(t,S(19),S(19)+.3))});
    owl(860,1150,.6*back(seg(t,S(20)+.3,S(20)+.7)),t,{a:a*eo(seg(t,S(20)+.3,S(20)+.6)),point:true,look:-.6});
  }}
}
