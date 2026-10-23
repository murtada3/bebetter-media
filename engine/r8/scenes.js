function scenes(t){T_=t;
  // S1: new month page (0-2)
  {const a=win(t,-1,E(2)+.4,.3,.4);if(a>0){
    const p=back(seg(t,0,.5));if(p>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,780);ctx.scale(p,p);ctx.fillStyle=C.cream;rrect(-230,-230,460,460,40);ctx.fill();ctx.fillStyle=C.coral;rrect(-230,-230,460,130,40);ctx.fill();ctx.fillRect(-230,-140,460,40);
      font(900,56);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.cream;ctx.fillText('تشرين الثاني',0,-165);font(900,200);ctx.fillStyle='#1a1d29';ctx.fillText('١',0,60);ctx.restore()}
    hero('فرصة',540,1150,120,S(2),['فرصة'],C.amber,a);
  }}
  // S2: not ten habits -> one (3-5)
  {const a=win(t,S(3)-.1,E(5)+.4,.3,.4);if(a>0){
    const one=eo(seg(t,S(4),S(4)+.5));
    for(let i=0;i<10;i++){const r=Math.floor(i/2),c=i%2;const x=c?330:750,y=560+r*150;const h=HAB[i%4];
      const keep=i==0;const tx=keep?lerp(x,540,one):x,ty=keep?lerp(y,820,one):y+one*200;
      tile(h,tx,ty,.62*back(seg(t,S(3)+i*.07,S(3)+i*.07+.35))*(keep?lerp(1,1.6,one):1),a*(keep?1:1-one))}
    const x=eo(seg(t,S(3)+.9,S(3)+1.3))*(1-one);if(x>0)T('١٠ عادات؟',540,470,60,C.coral,{w:900,a:a*x});
    const b=back(seg(t,S(5),S(5)+.4));if(b>0){ctx.save();ctx.globalAlpha=a;ctx.translate(540,1040);ctx.scale(b,b);ctx.fillStyle=C.amber;rrect(-150,-48,300,96,48);ctx.fill();T('٣٠ يوماً',0,2,52,'#1a1d29',{w:900});ctx.restore()}
  }}
  // S3: 30-day grid fills (6-11)
  {const a=win(t,S(6)-.1,E(11)+.5,.3,.4);if(a>0){
    const cols=6,cw=112,gap=14,x0=540+(cols*cw+(cols-1)*gap)/2-cw/2,y0=520;
    const fill=Math.floor(lerp(0,30,eo(seg(t,S(6)+.3,E(8)))));const miss=14;
    for(let k=0;k<30;k++){const r=Math.floor(k/cols),c=k%cols,x=x0-c*(cw+gap),y=y0+r*(cw+gap);const p=back(seg(t,S(6)+k*.02,S(6)+k*.02+.3));
      ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(p||.001,p||.001);ctx.fillStyle=C.cell;rrect(-cw/2,-cw/2,cw,cw,20);ctx.fill();ctx.restore();
      if(k<fill){if(k==miss&&t>S(10))cross(x,y,56,seg(t,S(10),S(10)+.3),C.coral,9);else check(x,y,56,1,C.mint,9)}
      if(k==miss&&t>S(10)){ctx.save();ctx.globalAlpha=a*eo(seg(t,S(10),S(10)+.3));ctx.strokeStyle=C.coral;ctx.lineWidth=4;rrect(x-cw/2,y-cw/2,cw,cw,20);ctx.stroke();ctx.restore()}
      if(k==miss+1&&t>S(11)){ctx.save();ctx.globalAlpha=a*eo(seg(t,S(11),S(11)+.3));ctx.strokeStyle=C.mint;ctx.shadowColor=C.mint;ctx.shadowBlur=24;ctx.lineWidth=5;rrect(x-cw/2,y-cw/2,cw,cw,20);ctx.stroke();ctx.restore()}}
  }}
  // S4: one month, one habit (12-14)
  {const a=win(t,S(12)-.1,99,.3,.1);if(a>0){
    hero('شهر واحد',540,640,120,S(12),['واحد'],C.amber,a);
    hero('عادة واحدة',540,800,120,S(13),['واحدة'],C.mint,a);
    hero('هل أنت معي؟',540,1000,84,S(14),['معي؟'],C.amber,a);
    owl(540,1210,.6*back(seg(t,S(14)+.2,S(14)+.6)),t,{a:a*eo(seg(t,S(14)+.2,S(14)+.5))});
  }}
}
