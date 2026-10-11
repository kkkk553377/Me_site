/* Khushi Kakar · Maison des Kréateurs — starfield, 3D logo reveal, parallax, pen-drawn scenery, robot arm, circuit traces */
(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,$=function(i){return document.getElementById(i)};

// branded loader: waits for the page, fonts and one full logo draw, then the star swells away
var ld=$('loader'),root=document.documentElement;
function hideLoader(){if(!ld)return;ld.classList.add('out');root.classList.remove('loading');setTimeout(function(){if(ld.parentNode)ld.parentNode.removeChild(ld)},1600)}
Promise.all([new Promise(function(r){if(document.readyState=='complete')r();else addEventListener('load',r)}),(document.fonts&&document.fonts.ready)?Promise.race([document.fonts.ready,new Promise(function(r){setTimeout(r,3500)})]):Promise.resolve(),new Promise(function(r){setTimeout(r,rm?300:2300)})]).then(hideLoader);
setTimeout(hideLoader,7000);
// email assembled at runtime to deter scrapers
var m=document.getElementById('mail');m.href='mail'+'to:khushikakar.k'+'@'+'gmail.com';m.textContent='Email';

// pop-out reveals, staggered among siblings
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;el.classList.add('in');io.unobserve(el);setTimeout(function(){el.style.transitionDelay=''},1900)}})},{threshold:.12});
document.querySelectorAll('.rv,h2').forEach(function(el){var i=[].filter.call(el.parentNode.children,function(c){return c.classList.contains('rv')}).indexOf(el);if(i>0)el.style.transitionDelay=Math.min(i,5)*90+'ms';io.observe(el)});
// 3D logo: stacked depth layers
var NS='http://www.w3.org/2000/svg',fl=$('fl');
for(var i=2;i>=0;i--){var s=document.createElementNS(NS,'svg'),u=document.createElementNS(NS,'use');s.setAttribute('viewBox','0 0 570 570');s.setAttribute('class','lay');u.setAttribute('href','#st');s.appendChild(u);s.style.transform='translate('+(i*1.7)+'%,'+(i*1.7)+'%)';s.style.color=['#ecc66f','#a4781f','#5e4512'][i];fl.appendChild(s)}
// starfield
var cv=$('sky'),c=cv.getContext('2d'),W,H,st=[],sh=null,dpr=Math.min(devicePixelRatio||1,2);
function size(){W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;st=[];for(var n=Math.round(innerWidth*innerHeight/6000);n--;)st.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.2+.3)*dpr,d:Math.random(),p:Math.random()*6.28,sp:Math.random()<.06,g:Math.random()<.3})}
function draw(t){c.clearRect(0,0,W,H);var sy=scrollY*dpr;
st.forEach(function(s){var y=((s.y-sy*(.04+s.d*.3))%H+H)%H,a=.3+.7*(.5+.5*Math.sin(t/(900-s.d*400)+s.p));c.globalAlpha=a;c.fillStyle=s.g?'#ecc66f':'#f8ecc4';
if(s.sp){var L=s.r*7;c.strokeStyle=c.fillStyle;c.lineWidth=dpr*.8;c.beginPath();c.moveTo(s.x-L,y);c.lineTo(s.x+L,y);c.moveTo(s.x,y-L*1.3);c.lineTo(s.x,y+L*1.3);c.stroke()}
else{c.beginPath();c.arc(s.x,y,s.r,0,6.28);c.fill()}});
if(!rm){if(!sh&&Math.random()<.003)sh={x:W*(.4+Math.random()*.6),y:H*Math.random()*.4,l:0};
if(sh){sh.l+=14*dpr;var g=c.createLinearGradient(sh.x,sh.y,sh.x+sh.l*.6,sh.y-sh.l*.3);c.globalAlpha=Math.max(0,1-sh.l/(500*dpr));c.strokeStyle='#f8ecc4';c.lineWidth=1.5*dpr;c.beginPath();c.moveTo(sh.x-sh.l*.8,sh.y+sh.l*.4);c.lineTo(sh.x-sh.l*.8+60*dpr,sh.y+sh.l*.4-30*dpr);c.stroke();sh.x-=2*dpr;if(sh.l>500*dpr)sh=null}}
c.globalAlpha=1}
size();(function loop(t){draw(t);if(!rm)requestAnimationFrame(loop)})(0);
// pen-drawn details
var RN=function(a,b){return a+Math.random()*(b-a)},rg='http://www.w3.org/2000/svg';
function mk(par,d,w,op,col){var e=document.createElementNS(rg,'path');e.setAttribute('d',d);e.setAttribute('stroke-width',w);e.setAttribute('opacity',op);if(col)e.setAttribute('stroke',col);$(par).appendChild(e)}
var V=[[[0,380],[120,300],[230,360],[360,250],[470,330],[600,420],[700,480],[800,545],[900,490],[1010,420],[1140,300],[1260,360],[1380,250],[1500,330],[1600,290]],[[0,520],[160,430],[300,500],[470,380],[620,490],[760,600],[860,560],[980,470],[1120,560],[1260,420],[1420,520],[1530,450],[1600,500]],[[0,720],[190,600],[330,680],[540,560],[700,690],[900,740],[1060,640],[1250,560],[1420,660],[1600,600]]];
function ry(v,x){for(var i=0;i<v.length-1;i++)if(x<=v[i+1][0]){return v[i][1]+(x-v[i][0])/(v[i+1][0]-v[i][0])*(v[i+1][1]-v[i][1])}return v[v.length-1][1]}
V.forEach(function(v,n){var id='gh'+(n+1),g=$(id),sp=6+n*1.6,cp=document.createElementNS(rg,'clipPath'),us=document.createElementNS(rg,'use');cp.id='cl'+n;us.setAttribute('href','#r'+(n+1));cp.appendChild(us);$('r'+(n+1)).parentNode.appendChild(cp);g.setAttribute('clip-path','url(#cl'+n+')');
$('r'+(n+1)).setAttribute('d','M'+v.map(function(p){return p[0]+' '+p[1]}).join('L')+'V900H0Z');
function pl(dy){return 'M'+v.map(function(p){return p[0]+' '+(p[1]+dy)}).join('L')}
mk(id,pl(3.5),.8,.45);
for(var k=1;k<=24;k++)mk(id,pl(k*sp),.6,Math.max(.1,.45-k*.014),'#7f95d6');
var h='';for(var x=0;x<1600;x+=5){var y=ry(v,x),sl=ry(v,x+8)-ry(v,x-8);if(sl>6){var L=RN(30,110);h+='M'+x+' '+(y+4).toFixed(0)+'l'+(-.2*L).toFixed(1)+' '+L.toFixed(1)}}
mk(id,h,.5,.32,'#7f95d6');
var s2='';for(var i=1;i<v.length-1;i++)if(v[i][1]<v[i-1][1]&&v[i][1]<v[i+1][1]){s2+='M'+v[i][0]+' '+v[i][1]+'l'+RN(-70,-20).toFixed(0)+' '+RN(140,230).toFixed(0)+'M'+v[i][0]+' '+v[i][1]+'l'+RN(20,70).toFixed(0)+' '+RN(120,200).toFixed(0)}
mk(id,s2,1,.7)});
var sp='',dt='';for(var i=0;i<46;i++){var x=RN(20,1580),y=RN(10,420),L=RN(3,9);sp+='M'+(x-L).toFixed(0)+' '+y.toFixed(0)+'h'+(2*L).toFixed(0)+'M'+x.toFixed(0)+' '+(y-L*1.4).toFixed(0)+'v'+(L*2.8).toFixed(0)}
for(i=0;i<90;i++)dt+='M'+RN(0,1600).toFixed(0)+' '+RN(0,480).toFixed(0)+'h.1';
mk('sk',sp,.9,.75);mk('sk',dt,2.4,.6);
function bz(a,b,c,d,s){var m=1-s;return[m*m*m*a[0]+3*m*m*s*b[0]+3*m*s*s*c[0]+s*s*s*d[0],m*m*m*a[1]+3*m*m*s*b[1]+3*m*s*s*c[1]+s*s*s*d[1]]}
var HD=[470,100],D=[HD,[450,30],[260,5],[70,111]],VN=[HD,[440,195],[260,205],[70,126]],wl='';
function lp(u,s){var a=bz(D[0],D[1],D[2],D[3],s),b=bz(VN[0],VN[1],VN[2],VN[3],s);return[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u]}
function ln(u,s0,s1,op,w){var d='';for(var j=0;j<=30;j++){var p=lp(u,s0+(s1-s0)*j/30);d+=(j?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)}return '<path d="'+d+'" opacity="'+op+'" stroke-width="'+w+'"/>'}
wl+=ln(0,0,1,1,1.8)+ln(1,0,1,1,1.8);
for(var k=1;k<32;k++)wl+=ln(k/32,0,1,.65,.55);
for(k=0;k<14;k++)wl+=ln(.52+k*.032,0,.42,.7,.55);
wl+='<path stroke-width="1.6" d="M70 112C50 100 30 80 8 62C30 90 38 110 48 118C36 130 22 150 8 172C32 160 55 135 70 124"/>';
for(k=0;k<13;k++){var q=k/12,fx,fy;if(q<.5){fx=8+80*q;fy=62+112*q}else{fx=48-80*(q-.5);fy=118+108*(q-.5)}wl+='<path opacity=".7" stroke-width=".55" d="M70 118Q'+((70+fx)/2).toFixed(0)+' '+((118+fy)/2+(fy<118?-7:7)).toFixed(0)+' '+fx.toFixed(0)+' '+fy.toFixed(0)+'"/>'}
wl+='<path stroke-width="1.6" d="M340 150C330 190 300 240 262 275C305 252 338 222 360 168"/>';
for(k=1;k<10;k++){var f=k/10,rx=340+20*f,ry2=150+18*f,ex=262+(f-.5)*40,ey=275-(f-.5)*10;wl+='<path opacity=".7" stroke-width=".55" d="M'+rx.toFixed(0)+' '+ry2.toFixed(0)+'Q'+((rx+ex)/2+(f<.5?-6:8)).toFixed(0)+' '+((ry2+ey)/2).toFixed(0)+' '+ex.toFixed(0)+' '+ey.toFixed(0)+'"/>'}
wl+='<path stroke-width="1.3" d="M172 42C186 20 204 22 220 36"/><path opacity=".6" stroke-width=".55" d="M178 38C190 26 202 28 214 36"/><path stroke-width="1.2" d="M468 104C430 122 395 124 352 114"/><circle cx="400" cy="103" r="2.6" fill="currentColor"/><circle cx="400" cy="103" r="6" opacity=".5"/><path stroke-width=".8" d="M386 80h26M399 67v26" opacity=".8"/>';
for(k=0;k<90;k++)wl+='<circle cx="'+RN(-10,500).toFixed(0)+'" cy="'+RN(-30,300).toFixed(0)+'" r="'+RN(.4,1.4).toFixed(1)+'" opacity=".6" fill="currentColor" stroke-width="0"/>';
$('wg').innerHTML=wl;
// galaxies for the last page
function gal(cx,cy,sc,cls){var m='',P=Math.PI;for(var a=0;a<7;a++){var d='',dots='',ph=a*.9,gr=5+a*.7;for(var th=0;th<=P*7;th+=.12){var r=(6+th*gr*(1+.08*Math.sin(th*2+ph)))*sc,x=cx+Math.cos(th+ph)*r,y=cy+Math.sin(th+ph)*r*.78;d+=(th?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);if(a<3&&Math.random()<.16)dots+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+RN(.7,2.4).toFixed(1)+'" fill="#ecc66f" opacity=".85"/>'}
m+='<path d="'+d+'" fill="none" stroke="'+(a<4?'#d9a233':'#8ea2cf')+'" stroke-width=".9" opacity="'+(a<4?.75:.3)+'"/>'+dots}
for(var q=1;q<6;q++)m+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+((150+q*42)*sc).toFixed(0)+'" ry="'+((110+q*30)*sc).toFixed(0)+'" transform="rotate('+(q*23)+' '+cx+' '+cy+')" fill="none" stroke="#8ea2cf" stroke-width=".8" opacity=".22"/>';
m+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(20*sc).toFixed(0)+'" fill="url(#gc)"/><circle cx="'+cx+'" cy="'+cy+'" r="2" fill="#fff6d0"/>';
var g=document.createElementNS(rg,'g');g.setAttribute('class','spin'+cls);g.innerHTML=m;$('gx').appendChild(g)}
gal(210,190,.95,'');gal(1010,470,1.1,' b');gal(640,640,.5,'');
var ss='';for(i=0;i<40;i++){var x2=RN(10,1190),y2=RN(10,690),L2=RN(3,8);ss+='M'+(x2-L2).toFixed(0)+' '+y2.toFixed(0)+'h'+(2*L2).toFixed(0)+'M'+x2.toFixed(0)+' '+(y2-L2*1.4).toFixed(0)+'v'+(L2*2.8).toFixed(0)}
var gp=document.createElementNS(rg,'path');gp.setAttribute('d',ss);gp.setAttribute('stroke','#ecc66f');gp.setAttribute('stroke-width','.9');gp.setAttribute('opacity','.7');gp.setAttribute('fill','none');$('gx').appendChild(gp);
// robotic arm sketching the emblem
(function(){
var arm=$('arm'),L1=215,L2=195,SX=300,SY=372,PEN=48,pi=Math.PI;
var K=[[[1069,90],[845,273],[697,545],[869,419],[1035,624],[951,363],[1226,382],[988,278],[1069,90]],[[957,232],[873,295],[842,358]],[[873,295],[973,316]],[[873,295],[908,384]]].map(function(q){return q.map(function(p){return[520+(p[0]-965)*.36,215+(p[1]-355)*.36]})});
var KL=K.map(function(q){var c=[0];for(var i=1;i<q.length;i++)c.push(c[i-1]+Math.hypot(q[i][0]-q[i-1][0],q[i][1]-q[i-1][1]));return c});
function part(si,u){var q=K[si],c=KL[si],r=[q[0]];for(var i=1;i<q.length;i++){if(u>=c[i])r.push(q[i]);else{var f=(u-c[i-1])/(c[i]-c[i-1]);r.push([q[i-1][0]+(q[i][0]-q[i-1][0])*f,q[i-1][1]+(q[i][1]-q[i-1][1])*f]);break}}return r}
function link(L){var m='<path d="M0 -17L'+L+' -11Q'+(L+9)+' 0 '+L+' 11L0 17Q-9 0 0 -17Z"/><path opacity=".5" stroke-dasharray="3 6" d="M16 0H'+(L-16)+'"/><path opacity=".6" d="M34 -26L'+(L-44)+' -19M34 -22L'+(L-44)+' -16"/><rect x="'+(L/2-18)+'" y="-31" width="36" height="9" rx="4"/>';for(var x=40;x<L-20;x+=20)m+='<path opacity=".4" d="M'+x+' -12V12"/>';return m+'<circle cx="26" cy="-8" r="1.8"/><circle cx="26" cy="8" r="1.8"/><circle cx="'+(L-14)+'" cy="-5" r="1.8"/><circle cx="'+(L-14)+'" cy="5" r="1.8"/>'}
function joint(){var m='<circle r="21"/><circle r="12"/><circle r="3" fill="#ecc66f"/>';for(var i=0;i<8;i++){var a=i*pi/4;m+='<path d="M'+(12*Math.cos(a)).toFixed(1)+' '+(12*Math.sin(a)).toFixed(1)+'L'+(21*Math.cos(a)).toFixed(1)+' '+(21*Math.sin(a)).toFixed(1)+'"/>'}return m}
$('l1').innerHTML=link(L1)+joint();$('l2').innerHTML=link(L2)+joint();
$('a3').innerHTML='<circle r="9"/><circle r="4"/><rect x="10" y="-4" width="28" height="8" rx="2"/><path d="M38 -4L48 0L38 4Z" fill="#ecc66f"/><path d="M6 -11Q22 -14 32 -8M6 11Q22 14 32 8"/><path opacity=".5" d="M16 -4V4M22 -4V4"/>';
function ik(tx,ty){var dx=tx-SX,dy=ty-PEN-SY,d=Math.hypot(dx,dy),mx=L1+L2-2,mn=Math.abs(L1-L2)+6;if(d>mx){dx*=mx/d;dy*=mx/d;d=mx}if(d<mn){if(d<.01){dx=mn;dy=0}else{dx*=mn/d;dy*=mn/d}d=mn}
var c=(d*d-L1*L1-L2*L2)/(2*L1*L2),a2=Math.acos(Math.max(-1,Math.min(1,c))),best;
[a2,-a2].forEach(function(q){var a1=Math.atan2(dy,dx)-Math.atan2(L2*Math.sin(q),L1+L2*Math.cos(q)),ey=L1*Math.sin(a1);if(!best||ey<best.ey)best={a1:a1,a2:q,ey:ey,wx:SX+dx,wy:SY+dy}});return best}
var deg=180/pi;
function pose(x,y){var r=ik(x,y);$('a1').setAttribute('transform','translate('+SX+' '+SY+') rotate('+(r.a1*deg).toFixed(2)+')');$('a2').setAttribute('transform','translate('+L1+' 0) rotate('+(r.a2*deg).toFixed(2)+')');$('a3').setAttribute('transform','translate('+L2+' 0) rotate('+(90-(r.a1+r.a2)*deg).toFixed(2)+')');return r}
var tl=$('trail'),t2=$('trail2'),ro=$('ro');
function draw(S){var d=S.map(function(q){return q.length>1?'M'+q.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('L'):''}).join('');tl.setAttribute('d',d);t2.setAttribute('d',d)}
if(rm){draw(K);var e=K[3][1];pose(e[0],e[1]);return}
var tr=[],fs=[],cx=SX,cy=150,si=0,u=0,mode='go',hold=0,fa=1,lm=-1e9,pt=[400,150],vis=false,last=0,fr=0,wf=false;
new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(arm);
arm.addEventListener('pointermove',function(e){var r=arm.getBoundingClientRect();pt=[(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*440];lm=performance.now()});
arm.addEventListener('pointerleave',function(){lm=performance.now()-1500});
function frame(now){requestAnimationFrame(frame);if(!vis){last=now;return}var dt=Math.min(.05,(now-last)/1000||0);last=now;var free=now-lm<2200,sh;
if(free){if(!wf){wf=true;fs=[[]]}var k=Math.min(1,dt*9);cx+=(pt[0]-cx)*k;cy+=(pt[1]-cy)*k;tl.style.opacity=t2.style.opacity=1;var r0=pose(cx,cy),tp=[r0.wx,r0.wy+PEN],q=fs[0],l=q[q.length-1];if(!l||Math.hypot(tp[0]-l[0],tp[1]-l[1])>3){q.push(tp);if(q.length>420)q.shift()}sh=fs}
else{if(wf){wf=false;tr=[];si=0;u=0;mode='go';fa=1}
var tg;
if(mode=='go'){tg=K[si][0];var k2=Math.min(1,dt*7);cx+=(tg[0]-cx)*k2;cy+=(tg[1]-cy)*k2;if(Math.hypot(cx-tg[0],cy-tg[1])<2.5){cx=tg[0];cy=tg[1];mode='draw';u=0}sh=tr}
else if(mode=='draw'){u+=dt*135;var L=KL[si][KL[si].length-1];if(u>=L){u=L;tr.push(K[si]);var e2=K[si][K[si].length-1];cx=e2[0];cy=e2[1];si++;mode=si>=K.length?'hold':'go';hold=0;sh=tr}else{var pp=part(si,u);cx=pp[pp.length-1][0];cy=pp[pp.length-1][1];sh=tr.concat([pp])}}
else if(mode=='hold'){hold+=dt;sh=tr;if(hold>2.2){mode='fade'}}
else{fa-=dt*1.2;tl.style.opacity=t2.style.opacity=Math.max(0,fa);sh=tr;if(fa<=0){tr=[];si=0;mode='go';fa=1;tl.style.opacity=t2.style.opacity=1;sh=tr}}}
var r=pose(cx,cy);draw(sh);if(!(fr++%6))ro.textContent='joint 1 '+(r.a1*deg).toFixed(1)+'°   joint 2 '+(r.a2*deg).toFixed(1)+'°   pen '+(r.wx).toFixed(0)+', '+(r.wy+PEN).toFixed(0)}
requestAnimationFrame(frame)})();
// circuit traces behind the skills
(function(){var cb=$('cb'),m='';
for(var n=0;n<18;n++){var lf=Math.random()<.5,dr=lf?1:-1,x=lf?0:1200,y=RN(40,760),d='M'+x+' '+y,sg=3+Math.floor(Math.random()*3);
for(var i=0;i<sg;i++){x+=dr*RN(70,200);d+='L'+x.toFixed(0)+' '+y.toFixed(0);if(i<sg-1){var j=RN(-80,80);x+=dr*Math.abs(j);y+=j;d+='L'+x.toFixed(0)+' '+y.toFixed(0)}}
m+='<path class="base" d="'+d+'"/><path class="pulse" pathLength="1" d="'+d+'" style="animation-duration:'+RN(4,9).toFixed(1)+'s;animation-delay:-'+RN(0,8).toFixed(1)+'s"/><circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="4" class="base"/><circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="1.5" fill="#ecc66f" stroke="none"/>'}
[[120,340],[1010,120],[900,660]].forEach(function(c){m+='<g class="base"><rect x="'+c[0]+'" y="'+c[1]+'" width="76" height="52" rx="3"/>';for(var k=0;k<6;k++){m+='<path d="M'+(c[0]+8+k*12)+' '+c[1]+'v-9M'+(c[0]+8+k*12)+' '+(c[1]+52)+'v9"/>'}m+='<circle cx="'+(c[0]+10)+'" cy="'+(c[1]+10)+'" r="2.5"/></g>'});
cb.innerHTML=m})();
// scroll scene
var brand=$('brand'),stage=$('stage'),scene=$('scene'),logo=$('logo'),lg=$('lg'),moon=$('moon'),ttl=$('ttl'),hint=$('hint'),bar=$('bar'),wh=[].slice.call(document.querySelectorAll('.whale')),mx=0,my=0,tick=false;
var P=[[1069,90],[845,273],[697,545],[869,419],[1035,624],[951,363],[1226,382],[988,278]];
function cl(v){return Math.min(1,Math.max(0,v))}
function frame(){tick=false;var r=stage.getBoundingClientRect(),t=cl(-r.top/Math.max(1,r.height-scene.offsetHeight)),S=logo.offsetWidth,k=cl(t/.6),sc=Math.exp(k*Math.log(32));
logo.style.transform='scale('+sc.toFixed(3)+')';logo.style.opacity=t<.2?1:cl(1-(t-.2)/.22);logo.style.visibility=t>.6?'hidden':'visible';

if(t<.6){var X=scene.offsetWidth/2,Y=scene.offsetHeight/2;scene.style.clipPath='polygon('+P.map(function(p){return (X+(p[0]-965)/570*S*sc).toFixed(1)+'px '+(Y+(p[1]-355)/570*S*sc).toFixed(1)+'px'}).join(',')+')'}else scene.style.clipPath='none';
var q=cl((t-.58)/.17);ttl.style.opacity=q;ttl.style.transform='translateY('+((1-q)*30).toFixed(1)+'px) scale('+(.94+q*.06).toFixed(3)+')';
moon.setAttribute('transform','translate(0 '+(cl((t-.62)/.38)*500).toFixed(1)+')');hint.style.opacity=t<.04?1:0;brand.classList.toggle('on',t>.97);
var h=document.documentElement.scrollHeight-innerHeight;bar.style.height=(h>0?scrollY/h*100:0)+'%';
if(!rm)wh.forEach(function(w){var b=w.parentElement.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;var g=(innerHeight-b.top)/(innerHeight+b.height);w.style.transform='translateX('+((g-.5)*parseFloat(w.dataset.w)*innerWidth*.9).toFixed(1)+'px)'})}
function req(){if(!tick){tick=true;requestAnimationFrame(frame)}}
addEventListener('scroll',req,{passive:true});addEventListener('resize',function(){size();req()});addEventListener('pageshow',function(){size();req()});if(window.visualViewport)visualViewport.addEventListener('resize',req);
;frame();
})();
