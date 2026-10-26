const CAPY=1400;
function caption(t){
  for(let i=0;i<P.length;i++){const [a,b,txt,hl,hc]=P[i];if(!txt)continue;
    let next=P.slice(i+1).find(p=>p[2]);let nph=(typeof PH!=="undefined")?PH.find(p=>p[0]>a+.05):null;let endV=Math.min(b+(window.CAPHOLD||.75),next?next[0]-.04:99,nph?nph[0]-.02:99);
    if(t<a-.05||t>endV)continue;
    const fo=1-eio(seg(t,endV-.18,endV));
    const ws=txt.split(' ');font(800,70);const sp=ctx.measureText(' ').width;
    const wid=ws.map(w=>ctx.measureText(w).width);
    // wrap
    const lines=[[]];let lw=0;ws.forEach((w,k)=>{if(lw+wid[k]>900&&lines[lines.length-1].length){lines.push([]);lw=0}lines[lines.length-1].push(k);lw+=wid[k]+sp});
    const tot=txt.replace(/ /g,'').length;let cum=0;const rt=ws.map(w=>{const r=a+(cum/tot)*(b-a)*.85;cum+=w.length;return r});
    lines.forEach((ln,li)=>{const L=ln.reduce((s,k)=>s+wid[k],0)+sp*(ln.length-1);let x=540+L/2;const y=CAPY+(li-(lines.length-1)/2)*92;
      ln.forEach(k=>{const p=eo(seg(t,rt[k]-.02,rt[k]+.2));const isH=hl.includes(ws[k]);
        ctx.save();ctx.globalAlpha=p*fo;font(800,70);ctx.direction='rtl';ctx.textAlign='right';ctx.textBaseline='middle';
        ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=18;ctx.fillStyle=isH?(hc||C.amber):C.cream;
        const sc=isH?lerp(1.12,1,eo(seg(t,rt[k],rt[k]+.3))):1;ctx.textAlign='center';ctx.translate(x-wid[k]/2,y+(1-p)*26);ctx.scale(sc,sc);ctx.fillText(ws[k],0,0);ctx.restore();
        x-=wid[k]+sp})});
  }}
