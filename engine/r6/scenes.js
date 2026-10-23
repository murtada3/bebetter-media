function scenes(t){T_=t;
  // S1: 5 km road -> just put on shoes (0-1)
  {const a=win(t,-1,E(1)+.4,.3,.4);if(a>0){
    const road=eo(seg(t,.1,1.2)),shrink=eio(seg(t,S(1),S(1)+.8));
    const L=lerp(840,120,shrink);ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=C.cellE;ctx.lineWidth=18;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(960,980);ctx.lineTo(960-L*road,980);ctx.stroke();ctx.restore();
    if(road>.95&&shrink<.5){ctx.save();ctx.globalAlpha=a*(1-shrink*2);ctx.fillStyle=C.amber;ctx.fillRect(118,880,8,100);ctx.beginPath();ctx.moveTo(126,880);ctx.lineTo(190,905);ctx.lineTo(126,930);ctx.fill();ctx.restore()}
    hero('٥ كم',540,640,170,.1,['٥'],C.amber,a*(1-shrink));
    shoe(540,700,1.3*back(seg(t,S(1)+.3,S(1)+.8)),a);
    T('الخطوة الأولى',540,880,48,C.mint,{w:800,a:a*eo(seg(t,S(1)+.7,S(1)+1.1))});
  }}
  // S2: silly? that's the secret (2-3)
  {const a=win(t,S(2)-.1,E(3)+.3,.25,.35);if(a>0){
    hero('يبدو سخيفاً...',540,700,92,S(2),[],C.amber,a*(1-.5*eo(seg(t,S(3),S(3)+.3))));
    hero('هذا هو السر',540,900,110,S(3),['السر'],C.amber,a);
    owl(540,1180,.6*back(seg(t,S(2),S(2)+.4)),t,{a,tilt:.12*Math.sin(t*4)});
  }}
  // S3: small start builds identity (4-5)
  {const a=win(t,S(4)-.1,E(5)+.4,.3,.4);if(a>0){
    const sd=back(seg(t,S(4),S(4)+.4));if(sd>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,600);ctx.scale(sd,sd);ctx.fillStyle=C.mint;ctx.beginPath();ctx.ellipse(0,0,30,40,0,0,7);ctx.fill();ctx.strokeStyle=C.mint;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(0,-40);ctx.quadraticCurveTo(10,-80,40,-90);ctx.stroke();ctx.restore()}
    idCard(540,900,1.0*back(seg(t,S(5),S(5)+.45)),a,'رياضي');
  }}
  // S4: identity hero (6-7)
  {const a=win(t,S(6)-.1,E(7)+.4,.3,.4);if(a>0){
    const st=eo(seg(t,S(7),S(7)+.3));
    hero('لا تتمرن فقط',540,640,86,S(6),[],C.muted,a*(1-.55*st));
    if(st>0){ctx.save();ctx.globalAlpha=a*st;ctx.strokeStyle=C.coral;ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(800,646);ctx.lineTo(800-520*eo(seg(t,S(7),S(7)+.4)),646);ctx.stroke();ctx.restore()}
    hero('أنت شخص',540,860,96,S(7)+.2,[],C.amber,a);hero('لا يفوّت التمرين',540,990,96,S(7)+.5,['يفوّت'],C.amber,a);
  }}
  // S5: two minutes (8-9)
  {const a=win(t,S(8)-.1,E(9)+.4,.3,.4);if(a>0){
    timerRing(540,820,220,eo(seg(t,S(9),S(9)+1.0))*(2/60)*30,a*eo(seg(t,S(8),S(8)+.4)),'');
    T('٢',540,790,190,C.cream,{w:900,a:a*eo(seg(t,S(9),S(9)+.3))});T('دقيقة',540,900,52,C.mint,{w:800,a:a*eo(seg(t,S(9),S(9)+.3))});
  }}
  // S6: grow it (10-11)
  {const a=win(t,S(10)-.1,E(11)+.4,.3,.4);if(a>0){
    const g=eio(seg(t,S(11),S(11)+1.0));const h=lerp(60,420,g);
    ctx.save();ctx.globalAlpha=a*eo(seg(t,S(10),S(10)+.4));ctx.fillStyle=C.mint;ctx.shadowColor=C.mint;ctx.shadowBlur=24*g;rrect(440,1080-h,200,h,24);ctx.fill();ctx.restore();
    T(g<.5?'٢ دقيقة':'٢٠ دقيقة',540,1150,52,C.cream,{w:900,a:a*eo(seg(t,S(10),S(10)+.4))});
    for(let i=0;i<7;i++)dayDot(540+3*120-i*120,520,40,'done',back(seg(t,S(10)+i*.06,S(10)+i*.06+.3)),a);
  }}
  // S7: big comes after steady (12-13)
  {const a=win(t,S(12)-.1,E(13)+.4,.3,.4);if(a>0){
    hero('الكبير يأتي',540,720,104,S(12),['الكبير'],C.amber,a);
    hero('بعد الثابت',540,880,120,S(13),['الثابت'],C.mint,a);
  }}
  // S8: CTA (14)
  {const a=win(t,S(14)-.1,99,.3,.1);if(a>0){
    shoe(540,640,.9*back(seg(t,S(14),S(14)+.4)),a);
    const c=back(seg(t,S(14)+.3,S(14)+.8));if(c>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,900);ctx.scale(c,c);ctx.fillStyle='rgba(28,36,54,.95)';rrect(-420,-100,840,200,40);ctx.fill();ctx.strokeStyle=C.amber+'88';ctx.lineWidth=3;ctx.stroke();ctx.restore();
      hero('خطوتك الصغيرة؟',540,900,80,S(14)+.4,['الصغيرة؟'],C.amber,a)}
    owl(860,1160,.6*back(seg(t,S(14)+.8,S(14)+1.2)),t,{a:a*eo(seg(t,S(14)+.8,S(14)+1.1)),point:true,look:-.6});
  }}
}
