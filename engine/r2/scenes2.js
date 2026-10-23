// ---------- scenes (reel 2) ----------
function battery(x,y,s,level,a,t,label){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);
  const w=200,h=380;ctx.fillStyle=C.cell;rrect(-w/2,-h/2,w,h,34);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=8;ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.18)';rrect(-40,-h/2-34,80,30,10);ctx.fill();
  const col=level>.5?C.amber:level>.2?'#f08a3c':C.coral;const blink=level<.12?(.4+.6*Math.abs(Math.sin(t*7))):1;
  const ih=(h-36)*cl(level);ctx.globalAlpha=a*blink;ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=30;if(ih>2){rrect(-w/2+18,h/2-18-ih,w-36,ih,20);ctx.fill()}
  ctx.shadowBlur=0;ctx.globalAlpha=a;
  // bolt
  ctx.fillStyle=level>.3?'#1a1d29':C.cream;ctx.globalAlpha=a*.85;ctx.beginPath();ctx.moveTo(14,-70);ctx.lineTo(-34,10);ctx.lineTo(-2,10);ctx.lineTo(-14,70);ctx.lineTo(34,-10);ctx.lineTo(2,-10);ctx.closePath();ctx.fill();
  ctx.restore();if(label)T(label,x,y+(h/2)*s+60,48,C.cream,{w:800,a:a})}
function cup(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.cream;ctx.strokeStyle=C.cream;ctx.lineWidth=7;
  ctx.beginPath();ctx.moveTo(-34,-22);ctx.lineTo(34,-22);ctx.lineTo(26,30);ctx.quadraticCurveTo(0,40,-26,30);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.arc(40,2,15,-1.2,1.2);ctx.stroke();ctx.lineCap='round';ctx.lineWidth=5;[-12,8].forEach(dx=>{ctx.beginPath();ctx.moveTo(dx,-34);ctx.quadraticCurveTo(dx+8,-44,dx,-54);ctx.stroke()});ctx.restore()}
function plate(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=C.cream;ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,32,0,7);ctx.stroke();ctx.beginPath();ctx.arc(0,0,18,0,7);ctx.stroke();
  ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-50,-30);ctx.lineTo(-50,30);ctx.moveTo(50,-30);ctx.lineTo(50,30);ctx.stroke();ctx.restore()}
function feet(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.cream;[[-16,10,-.25],[16,-14,.25]].forEach(([dx,dy,r])=>{ctx.save();ctx.translate(dx,dy);ctx.rotate(r);ctx.beginPath();ctx.ellipse(0,0,13,24,0,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(0,32,10,10,0,0,7);ctx.fill();ctx.restore()});ctx.restore()}
function card(x,y,s,a,col,draw,label,glow=0){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=cl(a);ctx.translate(x,y);ctx.scale(s,s);
  ctx.shadowColor=glow>0?col:'rgba(0,0,0,.35)';ctx.shadowBlur=24+50*glow;ctx.shadowOffsetY=glow>0?0:10;ctx.fillStyle=col;rrect(-170,-90,340,180,34);ctx.fill();ctx.shadowColor='transparent';
  draw(0,-28,1);font(800,40);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.cream;ctx.fillText(label,0,52);ctx.restore()}
function arrowL(x0,x1,y,p,a,col=C.cream){if(p<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=col;ctx.fillStyle=col;ctx.lineWidth=8;ctx.lineCap='round';const xe=x0+(x1-x0)*p;
  ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(xe,y);ctx.stroke();if(p>.9){ctx.beginPath();ctx.moveTo(xe-4,y);ctx.lineTo(xe+22,y-18);ctx.lineTo(xe+22,y+18);ctx.closePath();ctx.fill()}ctx.restore()}
function bell(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.cream;ctx.beginPath();ctx.moveTo(-50,40);ctx.quadraticCurveTo(-44,30,-42,-10);ctx.quadraticCurveTo(-40,-56,0,-60);ctx.quadraticCurveTo(40,-56,42,-10);ctx.quadraticCurveTo(44,30,50,40);ctx.closePath();ctx.fill();ctx.beginPath();ctx.arc(0,54,14,0,7);ctx.fill();ctx.restore()}

function scenes(t){
  // S1: 14-day grid, stops after two weeks; "this is normal"
  {const a=win(t,-1,5.2,.3,.5);if(a>0){const cw=112,gap=14,x0=540+3*(cw+gap),y0=640;const dim=1-.6*eo(seg(t,3.1,3.6));
    T('أسبوعين',540,500,44,C.muted,{w:700,a:a*dim});
    for(let k=0;k<14;k++){const r=Math.floor(k/7),c=k%7;const x=x0-c*(cw+gap),y=y0+r*(cw+gap);const p=back(seg(t,k*.03,k*.03+.3));
      ctx.save();ctx.globalAlpha=a*dim;ctx.translate(x,y);ctx.scale(p||.001,p||.001);ctx.fillStyle=C.cell;rrect(-cw/2,-cw/2,cw,cw,22);ctx.fill();ctx.restore();
      const ct=.35+k*.16;if(k<11)check(x,y,56,seg(t,ct,ct+.2)*dim>0?seg(t,ct,ct+.2):0,`rgba(99,197,155,${dim})`,10);
      if(k>=11){const q=seg(t,2.2,2.5);if(q>0){ctx.save();ctx.globalAlpha=a*dim*q;ctx.strokeStyle=C.muted;ctx.lineWidth=5;ctx.setLineDash([10,10]);rrect(x-cw/2+6,y-cw/2+6,cw-12,cw-12,18);ctx.stroke();ctx.restore()}}}
    const p=back(seg(t,3.14,3.6));if(p>0){ctx.save();ctx.translate(540,1080);ctx.scale(p,p);ctx.globalAlpha=a*cl(p*2);font(900,120);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';
      const ws=['فهذا','طبيعي','جداً'],wid=ws.map(w=>ctx.measureText(w).width),sp=30,L=wid.reduce((s,v)=>s+v,0)+sp*2;let x=L/2;
      ws.forEach((w,i)=>{ctx.fillStyle=i==1?C.amber:C.cream;ctx.shadowColor=i==1?'rgba(242,184,75,.5)':'transparent';ctx.shadowBlur=36;ctx.fillText(w,x-wid[i]/2,0);x-=wid[i]+sp});ctx.restore()}
  }}
  // S2-S4: battery full -> drains; habit tile goes dark
  {const a=win(t,5.1,15.2,.4,.4);if(a>0){
    const lvl=1-eio(seg(t,8.6,11.0));const bx=lerp(540,700,eo(seg(t,11.6,12.2)));
    battery(bx,820,1.0,lvl,a,t,'الحماس');
    const ha=eo(seg(t,11.8,12.3));const off=eo(seg(t,14.2,14.7));
    if(ha>0){ctx.save();ctx.globalAlpha=a*ha;ctx.strokeStyle=off>0?`rgba(139,147,167,${.8})`:C.amber;ctx.lineWidth=6;ctx.setLineDash([14,12]);ctx.lineDashOffset=-t*40;ctx.beginPath();ctx.moveTo(bx-110,820);ctx.lineTo(430,820);ctx.stroke();ctx.restore();
      ctx.save();ctx.filter=off>0?`grayscale(${off}) brightness(${1-.55*off})`:'none';tile(HAB[1],300,820,.9*back(seg(t,11.8,12.3)),a*ha);ctx.restore()}
    // spark at "ينفد"
    if(t>10.7&&t<11.4){ctx.save();ctx.globalAlpha=a*(1-seg(t,10.7,11.4));ctx.strokeStyle=C.coral;ctx.lineWidth=6;for(let i=0;i<8;i++){const an=i/8*6.283,r1=250,r2=250+60*seg(t,10.7,11.4);ctx.beginPath();ctx.moveTo(bx+Math.cos(an)*r1,820+Math.sin(an)*r1);ctx.lineTo(bx+Math.cos(an)*r2,820+Math.sin(an)*r2);ctx.stroke()}ctx.restore()}
  }}
  // S5: the solution: link old habit -> new habit
  {const a=win(t,15.2,19.6,.3,.45);if(a>0){
    const p=back(seg(t,15.38,15.8));ctx.save();ctx.translate(540,560);ctx.scale(p||.001,p||.001);ctx.globalAlpha=a*cl(p*2);font(900,130);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='rgba(242,184,75,.5)';ctx.shadowBlur=40;ctx.fillStyle=C.amber;ctx.fillText('الحل',0,0);ctx.restore();
    const c1=back(seg(t,16.4,16.8)),c2=back(seg(t,17.4,17.8));
    card(760,930,c1*.9,a,C.slate,(x,y)=>{ctx.save();ctx.translate(x,y);T('↻',0,0,70,C.cream,{w:900});ctx.restore()},'شي تسويه يومياً');
    card(320,930,c2*.9,a,'#8a6a2e',(x,y)=>{ctx.save();ctx.translate(x,y);T('+',0,0,90,C.cream,{w:900});ctx.restore()},'العادة الجديدة',eo(seg(t,18.2,18.8))*.6);
    arrowL(600,480,930,eo(seg(t,17.0,17.5)),a,C.amber);
  }}
  // S6: two examples
  {const a=win(t,19.6,25.1,.35,.4);if(a>0){
    const rows=[[19.74,21.16,'قهوة الصباح','صفحة واحدة',(x,y)=>cup(x,y,1),(x,y)=>icon('book',x,y,.9,C.blue),C.blue,620],
                [22.54,23.55,'بعد العشاء','٥ دقائق مشي',(x,y)=>plate(x,y,.9),(x,y)=>feet(x,y,1),C.mint,1050]];
    rows.forEach(([ta,tb,la,lb,da,db,col,y])=>{
      card(760,y,.85*back(seg(t,ta,ta+.4)),a,C.slate,da,la);
      arrowL(590,490,y,eo(seg(t,tb-.35,tb)),a,C.amber);
      card(320,y,.85*back(seg(t,tb,tb+.4)),a,col,db,lb,eo(seg(t,tb+.1,tb+.6))*.4)});
  }}
  // S7: no reminders, no hype; old cue triggers new
  {const a=win(t,25.0,32.2,.35,.45);if(a>0){
    const b1=back(seg(t,25.3,25.7)),x1=eo(seg(t,26.4,26.9));
    ctx.save();ctx.globalAlpha=a*(1-eo(seg(t,29.0,29.4)));
    ctx.save();ctx.translate(760,600);ctx.scale(b1||.001,b1||.001);bell(0,0,1.3);ctx.restore();if(x1>0)cross(760,600,170,x1,C.coral,12);
    const b2=back(seg(t,27.7,28.1)),x2=eo(seg(t,28.2,28.6));if(b2>0)battery(320,600,.5*b2,.15,1,t);if(x2>0)cross(320,600,170,x2,C.coral,12);
    ctx.restore();
    const c=eo(seg(t,29.3,29.7));if(c>0){
      const pulse=seg(t,30.5,31.2);
      card(760,1000,.9,a*c,C.slate,(x,y)=>cup(x,y,1),'قهوة الصباح',pulse>0&&pulse<1?.5:0);
      arrowL(590,490,1000,1,a*c,C.amber);
      if(pulse>0&&pulse<1){ctx.save();ctx.globalAlpha=a;ctx.fillStyle=C.amber2;ctx.shadowColor=C.amber;ctx.shadowBlur=30;ctx.beginPath();ctx.arc(lerp(590,490,pulse),1000,16,0,7);ctx.fill();ctx.restore()}
      const lit=eo(seg(t,31.0,31.5));ctx.save();ctx.filter=`grayscale(${1-lit}) brightness(${.55+.45*lit})`;card(320,1000,.9,a*c,C.blue,(x,y)=>icon('book',x,y,.9,C.blue),'صفحة واحدة',lit*.6);ctx.restore()}
  }}
  // S8: CTA fill-in sentence
  {const a=win(t,32.2,99,.35,.1);if(a>0){
    const p=back(seg(t,32.5,32.95));ctx.save();ctx.globalAlpha=a*cl(p*2);ctx.translate(540,800);ctx.scale(p||.001,p||.001);
    ctx.fillStyle='rgba(28,36,54,.92)';rrect(-440,-190,880,380,44);ctx.fill();ctx.strokeStyle='rgba(242,184,75,.5)';ctx.lineWidth=3;ctx.stroke();
    const blink=(Math.floor(t*2.2)%2)?1:.25;
    T('بعد أن أفعل',150,-80,66,C.cream,{w:900});
    ctx.strokeStyle=C.amber;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-60,-46);ctx.lineTo(-360,-46);ctx.stroke();T('...',-210,-86,60,C.amber,{w:900,a:blink});
    T('سأفعل',220,70,66,C.amber,{w:900});
    ctx.beginPath();ctx.moveTo(80,104);ctx.lineTo(-360,104);ctx.stroke();T('...',-140,64,60,C.amber,{w:900,a:blink});
    ctx.restore();
    // comment bubble
    const b=back(seg(t,32.6,33.0));if(b>0){ctx.save();ctx.globalAlpha=a;ctx.translate(820,540);ctx.scale(b,b);ctx.fillStyle=C.amber;rrect(-70,-50,140,100,30);ctx.fill();ctx.beginPath();ctx.moveTo(-20,48);ctx.lineTo(-44,82);ctx.lineTo(10,48);ctx.fill();
      ctx.fillStyle='#1a1d29';[-34,0,34].forEach(dx=>{ctx.beginPath();ctx.arc(dx,0,10,0,7);ctx.fill()});ctx.restore()}
    owl(260,1180,.7*back(seg(t,33.2,33.6)),t,{a:a*eo(seg(t,33.2,33.5)),point:t>34,look:.6});
  }}
}
