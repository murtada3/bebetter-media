function scenes(t){T_=t;
  // S1: vague note fails (0-4)
  {const a=win(t,-1,E(4)+.4,.3,.4);if(a>0){
    const up=eo(seg(t,S(2),S(2)+.4));const n=back(seg(t,0,.45));
    if(n>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,lerp(720,560,up));ctx.rotate(-.04);ctx.scale(n*(1-.3*up),n*(1-.3*up));ctx.fillStyle='#f2d37a';ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=24;ctx.fillRect(-260,-150,520,300);ctx.shadowBlur=0;
      font(900,72);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#3a2a10';ctx.fillText('سأقرأ أكثر',0,0);
      const x=eo(seg(t,S(1)+.1,S(1)+.6));if(x>0)cross(0,0,240,x,C.coral,14);ctx.restore()}
    hero('لماذا؟',540,860,110,S(2),['لماذا؟'],C.amber,a*(1-eo(seg(t,S(3),S(3)+.3))));
    const c=back(seg(t,S(3),S(3)+.4));if(c>0){clockIc(740,940,1.3*c,a);T('؟',740,1060,70,C.coral,{w:900,a})}
    const p=back(seg(t,S(4),S(4)+.4));if(p>0){pinIc(340,940,1.3*p,a);T('؟',340,1060,70,C.coral,{w:900,a})}
  }}
  // S2: the formula (5-8)
  {const a=win(t,S(5)-.1,E(8)+.5,.3,.4);if(a>0){
    T('الصيغة',540,520,56,C.amber,{w:900,a:a*eo(seg(t,S(5),S(5)+.4))});
    slotCard(540,680,.9*back(seg(t,S(6),S(6)+.4)),a,'ماذا','١٠ صفحات',C.blue,(x,y,s)=>icon('book',x,y,.8*s,C.blue));
    slotCard(540,860,.9*back(seg(t,S(7),S(7)+.4)),a,'متى','٩ مساءً',C.lav,(x,y,s)=>clockIc(x,y,.8*s,a,9));
    slotCard(540,1040,.9*back(seg(t,S(8),S(8)+.4)),a,'أين','الكنبة',C.mint,(x,y,s)=>sofa(x,y,.8*s,a));
  }}
  // S3: no daily decision (9-12)
  {const a=win(t,S(9)-.1,E(12)+.5,.3,.4);if(a>0){const G=130,xs=540+3*G;
    const sh=1-eo(seg(t,S(11),S(11)+.3))*.5;
    for(let i=0;i<7;i++){const ct=S(10)+i*.16;dayDot(xs-i*G,620,48,t>ct?'done':'empty',back(seg(t,S(9)+i*.05,S(9)+i*.05+.3)),a*sh)}
    T('٩:٠٠',540,760,60,C.lav,{w:900,a:a*sh*eo(seg(t,S(9),S(9)+.4))});
    hero('القرار',540,920,110,S(11),['القرار'],C.amber,a);
    hero('أُخذ مسبقاً',540,1060,96,S(12),['مسبقاً'],C.mint,a);
  }}
  // S4: template (13-16)
  {const a=win(t,S(13)-.1,E(16)+.5,.3,.4);if(a>0){
    const hl=i=>eo(seg(t,S(i),S(i)+.3));
    slotCard(540,680,.9*back(seg(t,S(13),S(13)+.4)),a,'سأفعل','___',hl(14)>0?C.amber:C.cellE);
    slotCard(540,860,.9*back(seg(t,S(13)+.1,S(13)+.5)),a,'متى','___',hl(15)>0?C.amber:C.cellE);
    slotCard(540,1040,.9*back(seg(t,S(13)+.2,S(13)+.6)),a,'أين','___',hl(16)>0?C.amber:C.cellE);
  }}
  // S5: save (17)
  {const a=win(t,S(17)-.1,99,.3,.1);if(a>0){
    bookmark(540,760,1.3*back(seg(t,S(17),S(17)+.45)),a);
    owl(540,1120,.6*back(seg(t,S(17)+.3,S(17)+.7)),t,{a:a*eo(seg(t,S(17)+.3,S(17)+.6))});
  }}
}
