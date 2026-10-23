function scenes(t){T_=t;
  const R=62,G=150,x0=540+3*G,Y=760;
  // S1: week with one miss -> fine; then two misses -> chain breaks (phr 0-4)
  {const a=win(t,-1,E(4)+.5,.3,.45);if(a>0){
    const two=t>=S(4);
    for(let i=0;i<7;i++){const x=x0-i*G;const p=back(seg(t,i*.05,i*.05+.35));
      let st=i<3?'done':i==3?'miss':i<6?'done':'done';
      if(two){st=i<3?'done':(i==3||i==4)?'miss':'empty'}
      const show=i<3?seg(t,.2+i*.15,.4+i*.15)>0:i==3?t>=.75:t>=S(1)-.1;
      if(show)dayDot(x,Y,R,st,p,a);else dayDot(x,Y,R,'empty',p,a)}
    chainLinks(x0,x0-6*G,Y+R+40,7,t,two?3:-1,a*eo(seg(t,S(1),S(1)+.4)));
    if(two){const q=eo(seg(t,S(4)+.2,S(4)+.6));ctx.save();ctx.globalAlpha=a*q;ctx.strokeStyle=C.coral;ctx.lineWidth=6;ctx.setLineDash([12,10]);rrect(x0-4*G-R-14,Y-R-14,G+2*R+28,2*R+28,R+14);ctx.stroke();ctx.restore()}
    hero('لا مشكلة',540,1060,96,S(1),['مشكلة'],C.mint,a*(1-eo(seg(t,S(3),S(3)+.3))));
    owl(540,1160,.6*back(seg(t,S(2),S(2)+.4)),t,{a:a*(1-eo(seg(t,S(3),S(3)+.3)))*eo(seg(t,S(2),S(2)+.3)),tilt:.15*Math.sin(t*3)});
  }}
  // S2: 1 day = accident, 2 days = habit of stopping (5-9)
  {const a=win(t,S(5)-.2,E(9)+.4,.35,.4);if(a>0){
    statCard(760,820,.9*back(seg(t,S(5),S(5)+.4)),a,'١','يوم = صدفة',C.mint);
    statCard(320,820,.9*back(seg(t,S(7),S(7)+.4)),a,'٢','يومان = عادة',C.coral);
    const st=eo(seg(t,S(9),S(9)+.4));if(st>0)T('عادة التوقف',320,1040,50,C.coral,{w:900,a:a*st,glow:'rgba(232,102,79,.5)'});
  }}
  // S3: the rule (10-11) hero
  {const a=win(t,S(10)-.1,E(11)+.5,.3,.4);if(a>0){
    T('القاعدة',540,600,56,C.muted,{w:800,a:a*eo(seg(t,S(10),S(10)+.4))});
    hero('لا تفوّت يومين',540,800,130,S(11),['يومين'],C.amber,a);
    T('متتاليين',540,960,72,C.cream,{w:800,a:a*eo(seg(t,S(11)+.6,S(11)+1))});
  }}
  // S4: missed today -> tiny version tomorrow (12-14)
  {const a=win(t,S(12)-.2,E(14)+.4,.3,.4);if(a>0){
    T('اليوم',760,640,44,C.muted,{w:700,a});T('غداً',320,640,44,C.muted,{w:700,a});
    dayDot(760,800,90,'miss',back(seg(t,S(12),S(12)+.4)),a);
    arrowL(630,450,800,eo(seg(t,S(13),S(13)+.4)),a,C.amber);
    dayDot(320,800,90,'small',back(seg(t,S(13)+.3,S(13)+.7)),a);
    const m=back(seg(t,S(14),S(14)+.4));if(m>0){ctx.save();ctx.globalAlpha=a;ctx.translate(320,980);ctx.scale(m,m);ctx.fillStyle=C.mint;rrect(-120,-40,240,80,40);ctx.fill();T('١ دقيقة',0,0,46,'#0d111b',{w:900});ctx.restore()}
  }}
  // S5: chain continues (15-16)
  {const a=win(t,S(15)-.2,E(16)+.4,.3,.4);if(a>0){const n=7,G2=140,xs=540+3*G2;
    const gl=eo(seg(t,S(16),S(16)+.8));
    for(let i=0;i<n;i++){const st=i==3?'small':'done';dayDot(xs-i*G2,820,56,st,back(seg(t,S(15)+i*.08,S(15)+i*.08+.35)),a,gl*(.6+.4*Math.sin(t*4+i)))}
    chainLinks(xs,xs-6*G2,820,7,t,-1,a*eo(seg(t,S(16),S(16)+.5)),gl);
  }}
  // S6: save the rule (17-18)
  {const a=win(t,S(17)-.2,99,.3,.1);if(a>0){
    bookmark(540,640,1.1*back(seg(t,S(17),S(17)+.45)),a);
    const c=back(seg(t,S(17)+.3,S(17)+.8));if(c>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,920);ctx.scale(c,c);ctx.fillStyle='rgba(28,36,54,.95)';rrect(-420,-110,840,220,40);ctx.fill();ctx.strokeStyle=C.amber+'88';ctx.lineWidth=3;ctx.stroke();ctx.restore();
      hero('لا تفوّت يومين متتاليين',540,920,72,S(17)+.4,['يومين'],C.amber,a)}
    owl(860,1180,.6*back(seg(t,S(18),S(18)+.4)),t,{a:a*eo(seg(t,S(18),S(18)+.3)),point:t>S(18)+.5,look:-.6});
  }}
}
