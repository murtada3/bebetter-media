// ---------- shared components ----------
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


// hero line: words pop together, highlight words colored
function hero(words,x,y,size,t0,hl=[],hcol=C.amber,a=1){const p=back(seg(T_,t0,t0+.45));if(p<=0||a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(p,p);ctx.globalAlpha=a*cl(p*2);
  font(900,size);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';const ws=words.split(' '),sp=size*.28,wid=ws.map(w=>ctx.measureText(w).width),L=wid.reduce((s,v)=>s+v,0)+sp*(ws.length-1);let xx=L/2;
  ws.forEach((w,i)=>{const h=hl.includes(w);ctx.fillStyle=h?hcol:C.cream;ctx.shadowColor=h?hcol+'88':'rgba(0,0,0,.5)';ctx.shadowBlur=h?40:16;ctx.fillText(w,xx-wid[i]/2,0);xx-=wid[i]+sp});ctx.restore()}
let T_=0;
// day dot: state 'done' | 'miss' | 'empty' | 'small'
function dayDot(x,y,r,state,p,a,glow=0){if(p<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(p,p);
  const col=state=='done'||state=='small'?C.mint:state=='miss'?C.coral:C.cellE;
  ctx.fillStyle=state=='empty'?C.cell:col+'33';if(glow){ctx.shadowColor=C.mint;ctx.shadowBlur=26*glow}ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.fill();ctx.shadowBlur=0;
  ctx.strokeStyle=state=='empty'?'rgba(255,255,255,.12)':col;ctx.lineWidth=5;ctx.stroke();ctx.restore();
  if(state=='done')check(x,y,r*1.05,1,C.mint,9);if(state=='small'){check(x,y,r*.7,1,C.mint,7)}if(state=='miss')cross(x,y,r*.9,1,C.coral,9)}
function chainLinks(x0,x1,y,n,t,breakAt=-1,a=1,glow=0){for(let i=0;i<n-1;i++){if(i==breakAt)continue;const xa=x0+(x1-x0)*(i/(n-1)),xb=x0+(x1-x0)*((i+1)/(n-1));
  ctx.save();ctx.globalAlpha=a*.8;ctx.strokeStyle=C.mint;ctx.lineWidth=7;if(glow){ctx.shadowColor=C.mint;ctx.shadowBlur=20*glow}ctx.beginPath();ctx.moveTo(xa,y);ctx.lineTo(xb,y);ctx.stroke();ctx.restore()}}
function statCard(x,y,s,a,big,sub,col){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=cl(a);ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(28,36,54,.95)';rrect(-190,-150,380,300,40);ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke();
  font(900,110);ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=col;ctx.shadowColor=col+'66';ctx.shadowBlur=30;ctx.fillText(big,0,-30);ctx.shadowBlur=0;font(800,46);ctx.fillStyle=C.cream;ctx.fillText(sub,0,80);ctx.restore()}
function bookmark(x,y,s,a){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.amber;ctx.shadowColor=C.amber;ctx.shadowBlur=30;ctx.beginPath();ctx.moveTo(-50,-70);ctx.lineTo(50,-70);ctx.lineTo(50,70);ctx.lineTo(0,35);ctx.lineTo(-50,70);ctx.closePath();ctx.fill();ctx.restore()}

function bubble(x,y,s,a,text,col=C.slate,tc=C.cream,size=50){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=cl(a);ctx.translate(x,y);ctx.scale(s,s);font(800,size);const w=ctx.measureText(text).width+80;
  ctx.fillStyle=col;ctx.shadowColor='rgba(0,0,0,.35)';ctx.shadowBlur=20;rrect(-w/2,-55,w,110,40);ctx.fill();ctx.beginPath();ctx.moveTo(w/2-70,50);ctx.lineTo(w/2-40,90);ctx.lineTo(w/2-30,50);ctx.fill();ctx.shadowBlur=0;
  ctx.direction='rtl';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=tc;ctx.fillText(text,0,2);ctx.restore()}
function steps(xr,yb,n,maxN,a,col=C.coral,lbl=true){for(let i=0;i<maxN;i++){const on=i<n;ctx.save();ctx.globalAlpha=a*(on?1:.0);ctx.fillStyle=col;const w=110,h=40+i*44;rrect(xr-i*(w+16)-w,yb-h,w,h,14);ctx.fill();
  if(lbl){font(900,40);ctx.fillStyle='#0d111b';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(AR(i+1),xr-i*(w+16)-w/2,yb-24)}ctx.restore()}}
function pillow(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#d9dbe6';ctx.beginPath();ctx.moveTo(-150,-60);ctx.quadraticCurveTo(0,-90,150,-60);ctx.quadraticCurveTo(175,0,150,60);ctx.quadraticCurveTo(0,90,-150,60);ctx.quadraticCurveTo(-175,0,-150,-60);ctx.fill();
  ctx.strokeStyle='rgba(13,17,27,.15)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-110,-20);ctx.quadraticCurveTo(0,0,110,-20);ctx.stroke();ctx.restore()}
function tshirt(x,y,s,col){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-40,-70);ctx.quadraticCurveTo(0,-45,40,-70);ctx.lineTo(100,-40);ctx.lineTo(80,0);ctx.lineTo(55,-12);ctx.lineTo(55,80);ctx.lineTo(-55,80);ctx.lineTo(-55,-12);ctx.lineTo(-80,0);ctx.lineTo(-100,-40);ctx.closePath();ctx.fill();ctx.restore()}

function gamepad(x,y,s,a){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.lav;ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=20;
  ctx.beginPath();ctx.moveTo(-150,-60);ctx.lineTo(150,-60);ctx.quadraticCurveTo(210,-60,200,40);ctx.quadraticCurveTo(190,110,130,80);ctx.lineTo(80,40);ctx.lineTo(-80,40);ctx.lineTo(-130,80);ctx.quadraticCurveTo(-190,110,-200,40);ctx.quadraticCurveTo(-210,-60,-150,-60);ctx.fill();ctx.shadowBlur=0;
  ctx.fillStyle=C.cream;ctx.fillRect(-140,-18,70,22);ctx.fillRect(-116,-42,22,70);[[100,-30],[130,-5],[70,-5],[100,20]].forEach(([bx,by])=>{ctx.beginPath();ctx.arc(bx,by,13,0,7);ctx.fill()});ctx.restore()}
function xpbar(x,y,w,p,a,col=C.amber,label){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.fillStyle=C.cell;rrect(x-w/2,y-20,w,40,20);ctx.fill();if(p>0){ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=20;rrect(x+w/2-w*cl(p),y-20,w*cl(p),40,20);ctx.fill()}ctx.restore();if(label)T(label,x,y-60,40,C.muted,{w:700,a})}
function flame(x,y,s,a,t){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s*(1+.04*Math.sin(t*9)));let g=ctx.createLinearGradient(0,-90,0,60);g.addColorStop(0,'#ffd98a');g.addColorStop(1,'#e8664f');ctx.fillStyle=g;ctx.shadowColor='#f08a3c';ctx.shadowBlur=40;
  ctx.beginPath();ctx.moveTo(0,-95);ctx.bezierCurveTo(55,-40,70,10,50,40);ctx.quadraticCurveTo(0,90,-50,40);ctx.bezierCurveTo(-70,10,-30,-30,-10,-50);ctx.quadraticCurveTo(-5,-20,10,-15);ctx.quadraticCurveTo(15,-60,0,-95);ctx.fill();ctx.restore()}

function shoe(x,y,s,a){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.coral;ctx.beginPath();ctx.moveTo(-150,30);ctx.lineTo(-150,-40);ctx.quadraticCurveTo(-140,-80,-90,-80);ctx.lineTo(-40,-80);ctx.quadraticCurveTo(-10,-30,60,-20);ctx.quadraticCurveTo(150,-10,150,30);ctx.closePath();ctx.fill();
  ctx.fillStyle=C.cream;rrect(-155,25,310,30,14);ctx.fill();ctx.strokeStyle=C.cream;ctx.lineWidth=6;[-60,-35,-10].forEach(dx=>{ctx.beginPath();ctx.moveTo(dx,-60);ctx.lineTo(dx+30,-40);ctx.stroke()});ctx.restore()}
function timerRing(x,y,r,p,a,label,col=C.mint){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=22;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();ctx.strokeStyle=col;ctx.shadowColor=col;ctx.shadowBlur=20;ctx.lineCap='round';ctx.beginPath();ctx.arc(x,y,r,-Math.PI/2,-Math.PI/2+6.283*Math.max(.001,cl(p)));ctx.stroke();ctx.restore();if(label)T(label,x,y,90,C.cream,{w:900,a})}
function idCard(x,y,s,a,name){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#232c42';rrect(-240,-150,480,300,30);ctx.fill();ctx.strokeStyle=C.amber;ctx.lineWidth=4;ctx.stroke();
  ctx.fillStyle=C.amber;ctx.beginPath();ctx.arc(130,-30,50,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(130,70,80,45,0,Math.PI,0);ctx.fill();ctx.restore();
  T(name,x-60*s,y-20*s,52*s,C.cream,{w:900,a});T('هويتك',x-60*s,y+50*s,40*s,C.muted,{w:700,a})}

function clockIc(x,y,s,a,h=9){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=C.cream;ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,0,50,0,7);ctx.stroke();ctx.lineCap='round';
  const an=-Math.PI/2+h/12*6.283;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*28,Math.sin(an)*28);ctx.moveTo(0,0);ctx.lineTo(0,-38);ctx.stroke();ctx.restore()}
function pinIc(x,y,s,a){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.cream;ctx.beginPath();ctx.arc(0,-20,36,Math.PI,0);ctx.quadraticCurveTo(36,10,0,56);ctx.quadraticCurveTo(-36,10,-36,-20);ctx.fill();ctx.fillStyle=C.slate;ctx.beginPath();ctx.arc(0,-20,14,0,7);ctx.fill();ctx.restore()}
function sofa(x,y,s,a){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=C.cream;rrect(-60,-30,120,40,12);ctx.fill();rrect(-75,0,150,30,10);ctx.fill();rrect(-80,-20,22,55,10);ctx.fill();rrect(58,-20,22,55,10);ctx.fill();ctx.restore()}
function slotCard(x,y,s,a,label,val,col,draw){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(28,36,54,.95)';rrect(-420,-75,840,150,34);ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=4;ctx.stroke();
  font(800,40);ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';ctx.fillStyle=C.muted;ctx.fillText(label,380,0);font(900,54);ctx.fillStyle=col;ctx.fillText(val,230,2);ctx.restore();if(draw)draw(x-330*s,y,s)}

// owl with moods: 'tired' | 'happy' | 'normal'
function owlM(x,y,s,t,o={}){owl(x,y,s,t,o);if(!o.mood||o.mood=='normal'||s<=0)return;const a=o.a===undefined?1:o.a;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.tilt||0);
  if(o.mood=='tired'){[-38,38].forEach(dx=>{ctx.fillStyle='#c98a3a';ctx.beginPath();ctx.arc(dx,-38,34,Math.PI,0);ctx.fill();ctx.fillRect(dx-34,-40,68,6);ctx.strokeStyle='#8a5320';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(dx-30,-34);ctx.lineTo(dx+30,-34);ctx.stroke()});
    const zz=(t*0.8)%1;ctx.globalAlpha=a*(1-zz);font(900,40);ctx.fillStyle=C.cream;ctx.fillText('z',90+zz*30,-110-zz*60);}
  if(o.mood=='happy'){[-38,38].forEach(dx=>{ctx.fillStyle='#fff8ea';ctx.beginPath();ctx.arc(dx,-38,33,0,7);ctx.fill();ctx.strokeStyle='#1a1d29';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.arc(dx,-28,16,Math.PI*1.15,Math.PI*1.85);ctx.stroke()});
    ctx.fillStyle='rgba(232,102,79,.45)';[-70,70].forEach(dx=>{ctx.beginPath();ctx.ellipse(dx,0,16,9,0,0,7);ctx.fill()})}
  ctx.restore()}
function plane(x,y,s,a,rot=0){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.fillStyle=C.amber;ctx.shadowColor=C.amber;ctx.shadowBlur=24;ctx.beginPath();ctx.moveTo(-60,10);ctx.lineTo(70,-50);ctx.lineTo(20,60);ctx.lineTo(5,20);ctx.closePath();ctx.fill();ctx.fillStyle='#b9772c';ctx.beginPath();ctx.moveTo(5,20);ctx.lineTo(70,-50);ctx.lineTo(0,40);ctx.closePath();ctx.fill();ctx.restore()}
