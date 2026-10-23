function scenes(t){T_=t;
  // S1: habit vs excuse (0-5)
  {const a=win(t,-1,E(5)+.4,.3,.4);if(a>0){
    const lose=eo(seg(t,S(1),S(1)+.5));
    ctx.save();ctx.filter=`grayscale(${lose*.8}) brightness(${1-.35*lose})`;tile(HAB[1],760,560,1.0*back(seg(t,.1,.5))*(1-.15*lose),a);ctx.restore();
    T('VS',540,560,54,C.muted,{w:900,a:a*eo(seg(t,.6,1)),al:'center'});
    const ex=back(seg(t,S(1)+.1,S(1)+.5));if(ex>0){ctx.save();ctx.globalAlpha=a;ctx.translate(320,560);ctx.scale(ex*(1+.15*lose),ex*(1+.15*lose));ctx.fillStyle=C.slate;rrect(-150,-62,300,124,30);ctx.fill();ctx.strokeStyle=C.coral;ctx.lineWidth=4;ctx.stroke();T('العذر',0,2,50,C.coral,{w:900});ctx.restore()}
    bubble(640,800,back(seg(t,S(2),S(2)+.4)),a,'متعب اليوم...');
    bubble(420,960,back(seg(t,S(3),S(3)+.4)),a,'ليس لدي وقت...');
    const st=eo(seg(t,S(5),S(5)+.6));if(st>0){ctx.save();ctx.globalAlpha=a*st;steps(900,1270,5,5,1,C.coral);ctx.restore();T('خطوات كثيرة',540,1310,40,C.coral,{w:800,a:a*st})}
  }}
  // S2: the solution (6-7)
  {const a=win(t,S(6)-.2,E(7)+.4,.3,.4);if(a>0){
    hero('الحل',540,560,130,S(6),['الحل'],C.amber,a);
    const p=eo(seg(t,S(7),S(7)+.4));if(p>0){ctx.save();ctx.globalAlpha=a*p;ctx.translate(540,880);
      tile(HAB[1],210,0,.9,1);T('<',0,0,90,C.mint,{w:900});ctx.save();ctx.translate(-210,0);ctx.fillStyle=C.slate;rrect(-150,-62,300,124,30);ctx.fill();T('العذر',0,2,50,C.muted,{w:900});ctx.restore();ctx.restore();
      T('أسهل',540,1040,64,C.mint,{w:900,a:a*p,glow:'rgba(99,197,155,.5)'})}
  }}
  // S3: book on pillow (8-9)
  {const a=win(t,S(8)-.2,E(9)+.3,.3,.35);if(a>0){
    const pl=back(seg(t,S(9),S(9)+.4));ctx.save();ctx.globalAlpha=a;if(pl>0)pillow(540,940,1.4*pl);
    const by=lerp(520,880,eo(seg(t,S(9)+.2,S(9)+.8)));ctx.save();ctx.translate(540,by);const bs=back(seg(t,S(8),S(8)+.4));ctx.scale(bs,bs);ctx.fillStyle=C.blue;rrect(-130,-50,260,100,18);ctx.fill();icon('book',0,0,1.2,C.blue);ctx.restore();ctx.restore();
  }}
  // S4: sleep in gym clothes (10-11)
  {const a=win(t,S(10)-.2,E(11)+.4,.3,.35);if(a>0){
    ctx.save();ctx.globalAlpha=a;const ts=back(seg(t,S(10),S(10)+.4));if(ts>0)tshirt(540,860,1.8*ts,C.coral);
    const m=back(seg(t,S(11),S(11)+.4));if(m>0){ctx.save();ctx.translate(780,600);ctx.scale(m,m);ctx.fillStyle=C.cream;ctx.beginPath();ctx.arc(0,0,60,0,7);ctx.fill();ctx.fillStyle=C.bg;ctx.beginPath();ctx.arc(26,-18,54,0,7);ctx.fill();ctx.restore();
      T('z',870,520,50,C.cream,{w:900,a:Math.sin(t*3)*.5+.5});T('z',910,470,38,C.cream,{w:900,a:Math.sin(t*3+1)*.5+.5})}
    ctx.restore();
  }}
  // S5: fewer steps -> fewer excuses (12-13)
  {const a=win(t,S(12)-.2,E(13)+.5,.3,.4);if(a>0){
    const n=Math.round(lerp(5,1,eio(seg(t,S(12)+.2,E(12)))));
    steps(900,1000,n,5,a,n<=1?C.mint:C.coral);
    T('الخطوات: '+AR(n),540,560,56,C.cream,{w:900,a});
    const ex=1-eo(seg(t,S(13),S(13)+.6));
    bubble(380,700,.7,a*ex,'متعب...');bubble(700,720,.7,a*ex,'لاحقاً...');
    if(t>S(13)+.3){check(540,720,90,seg(t,S(13)+.3,S(13)+.7),C.mint,14)}
  }}
  // S6: CTA (14-15)
  {const a=win(t,S(14)-.2,99,.3,.1);if(a>0){
    const c=back(seg(t,S(14),S(14)+.45));if(c>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,760);ctx.scale(c,c);ctx.fillStyle='rgba(28,36,54,.95)';rrect(-420,-150,840,300,44);ctx.fill();ctx.strokeStyle=C.amber+'88';ctx.lineWidth=3;ctx.stroke();ctx.restore();
      hero('أي عادة تريد',540,710,76,S(14)+.3,[],C.amber,a);hero('تسهيلها؟',540,820,90,S(14)+.6,['تسهيلها؟'],C.amber,a)}
    const b=back(seg(t,S(15),S(15)+.4));if(b>0){ctx.save();ctx.globalAlpha=a;ctx.translate(820,540);ctx.scale(b,b);ctx.fillStyle=C.amber;rrect(-70,-50,140,100,30);ctx.fill();ctx.beginPath();ctx.moveTo(-20,48);ctx.lineTo(-44,82);ctx.lineTo(10,48);ctx.fill();ctx.fillStyle='#1a1d29';[-34,0,34].forEach(dx=>{ctx.beginPath();ctx.arc(dx,0,10,0,7);ctx.fill()});ctx.restore()}
    owl(260,1120,.65*back(seg(t,S(15),S(15)+.4)),t,{a:a*eo(seg(t,S(15),S(15)+.3)),point:t>S(15)+.5,look:.6});
  }}
}
