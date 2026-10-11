/* Secret circuit game: wire the parts together and bring a robot to life.
   Three ways in: the hidden spark in the page, three quick taps on the corner emblem, or the Konami code. */
(function(){
var $=function(i){return document.getElementById(i)},rm=matchMedia('(prefers-reduced-motion: reduce)').matches,SV='http://www.w3.org/2000/svg';
var dlg=$('game'),gb=$('gb'),dn=$('gdone'),ms=$('gmsg'),ct=$('gcount'),fx,gw,prev=null,MSG0=ms.textContent;
var TSB={bat:[120,240,1,0,'+'],ard_pwr:[240,240,-1,0,'5V'],ard_sen:[315,160,0,-1,'D2'],ard_srv:[390,200,1,0,'D9'],ard_led:[390,280,1,0,'D13'],ard_pi:[315,320,0,1,'USB'],sen:[200,415,1,0,'echo'],srv:[200,75,1,0,'pwm'],led:[300,90,0,1,'anode'],pi_ard:[400,415,-1,0,'usb'],pi_cam:[520,415,1,0,'csi'],cam:[485,100,0,1,'csi']};
var E=[['bat','ard_pwr',['legs','torso']],['ard_sen','sen',['head']],['ard_srv','srv',['armL']],['ard_led','led',['star']],['ard_pi','pi_ard',['ant']],['pi_cam','cam',['cam']]];
var PC={legs:[685,365],torso:[685,270],armL:[610,290],head:[685,150],star:[685,246],ant:[685,85],cam:[741,137]};
var OKS=['Spark!','Connected!','Zap!','Clean wire!','Nice one!','Bzzt, perfect!'],NOTE=[523,587,659,784,880,1047];
var star='M1069 90 845 273 697 545 869 419 1035 624 951 363 1226 382 988 278Z',inner='M957 232 873 295 842 358M873 295 973 316M873 295 908 384';
var artBat='<rect x="30" y="195" width="90" height="90" rx="8"/><rect x="62" y="185" width="26" height="10" rx="2"/><path d="M52 225h26M65 212v26M88 240h20"/><text x="75" y="306" text-anchor="middle">battery</text>',
artArd='<rect x="240" y="160" width="150" height="160" rx="8"/><rect x="275" y="205" width="70" height="50" rx="3"/><path d="M285 205v-8M300 205v-8M315 205v-8M330 205v-8M285 255v8M300 255v8M315 255v8M330 255v8M290 285c8-14 22-14 30 0s22 14 30 0"/><text x="315" y="190" text-anchor="middle">arduino</text>',
artSen='<rect x="60" y="380" width="140" height="70" rx="6"/><circle cx="95" cy="415" r="20"/><circle cx="95" cy="415" r="11"/><circle cx="165" cy="415" r="20"/><circle cx="165" cy="415" r="11"/><text x="130" y="470" text-anchor="middle">ultrasonic sensor</text>',
artSrv='<rect x="70" y="52" width="100" height="46" rx="5"/><circle cx="148" cy="75" r="9"/><path d="M148 75V59M170 75H200"/><text x="120" y="125" text-anchor="middle">servo</text>',
artLed='<path d="M284 76V52a16 16 0 0 1 32 0V76ZM292 76v14M308 76v14"/><text x="340" y="56">led</text>',
artPi='<rect x="400" y="385" width="120" height="60" rx="5"/><rect x="440" y="400" width="40" height="30" rx="2"/><circle cx="412" cy="397" r="2"/><circle cx="508" cy="433" r="2"/><text x="460" y="466" text-anchor="middle">raspberry pi</text>',
artCam='<rect x="440" y="45" width="90" height="55" rx="6"/><circle cx="485" cy="72" r="16"/><circle cx="485" cy="72" r="8"/><text x="485" y="36" text-anchor="middle">camera</text>';
var rob='<rect x="580" y="25" width="210" height="430" rx="6" opacity=".25"/><g id="rb"><g class="rp" data-p="legs"><path d="M660 330V395H640M710 330V395H730"/></g>'
+'<g class="rp" data-p="torso"><rect x="640" y="215" width="90" height="115" rx="12"/><rect x="665" y="288" width="40" height="28" rx="3"/><path d="M705 296h8v12h-8M675 295v14M685 295v14M730 235L765 275L770 322M770 322l-7 11M770 322l7 11"/></g>'
+'<g class="rp" data-p="armL"><path class="armL" d="M640 235L605 272L598 322M598 322l-7 11M598 322l7 11"/></g>'
+'<g class="rp" data-p="head"><rect x="645" y="115" width="80" height="68" rx="14"/><g class="eyes"><circle cx="667" cy="150" r="12"/><circle cx="703" cy="150" r="12"/><circle cx="667" cy="150" r="5"/><circle cx="703" cy="150" r="5"/></g><path d="M672 183v32M698 183v32"/></g>'
+'<g class="rp" data-p="star"><g class="stp" transform="translate(685 246) scale(.05) translate(-965 -355)"><path stroke-width="30" d="'+star+'"/><path stroke-width="30" d="'+inner+'"/></g></g>'
+'<g class="rp" data-p="ant"><path d="M685 115V88"/><circle cx="685" cy="82" r="6"/><path class="rad" d="M670 72Q685 58 700 72M662 66Q685 44 708 66"/></g>'
+'<g class="rp" data-p="cam"><rect x="728" y="128" width="26" height="18" rx="3"/><circle cx="741" cy="137" r="5"/><path d="M728 137H725"/></g></g>'
+'<text x="685" y="445" text-anchor="middle" id="rn">offline</text>';
var TS={},OFF={};
function shuf(a){return a.sort(function(){return Math.random()-.5})}
function layout(){var ys=shuf([80,240,405]),xs=shuf([300,485]);OFF={srv:[0,ys[0]-75],bat:[0,ys[1]-240],sen:[0,ys[2]-415],led:[xs[0]-300,0],cam:[xs[1]-485,0]};TS={};Object.keys(TSB).forEach(function(k){var q=TSB[k].slice(),o=OFF[k];if(o){q[0]+=o[0];q[1]+=o[1]}TS[k]=q})}
function G(a,k){var o=OFF[k];return '<g transform="translate('+o[0]+' '+o[1]+')">'+a+'</g>'}
function build(){layout();var tm='';Object.keys(TS).forEach(function(k){var q=TS[k],ax=q[2]<0?'end':q[2]>0?'start':'middle';tm+='<g class="t" data-i="'+k+'"><circle class="t-c" cx="'+q[0]+'" cy="'+q[1]+'" r="7"/><circle class="t-h" cx="'+q[0]+'" cy="'+q[1]+'" r="20"/><text class="tl" text-anchor="'+ax+'" x="'+(q[0]+q[2]*14)+'" y="'+(q[1]+q[3]*16+(q[3]?(q[3]>0?3:-1):3))+'">'+q[4]+'</text></g>'});
gb.innerHTML=G(artBat,'bat')+artArd+G(artSen,'sen')+G(artSrv,'srv')+G(artLed,'led')+artPi+G(artCam,'cam')+'<g id="gwg"></g>'+rob+tm+'<g id="gfx" pointer-events="none"></g>';gw=$('gwg');fx=$('gfx')}
// state
var cn,done,n,sc,combo,pen,t0,ft,iv,playing,finished,assisted,tmp,from,tms=[],ac=null,mute=false,best=null;
try{best=parseFloat(localStorage.getItem('circuit-best'))||null}catch(e){}
function el(){return (performance.now()-t0)/1000+pen}
function hud(){$('gtime').textContent=(playing?el():ft||0).toFixed(1);$('gscore').textContent=sc;$('gcombo').textContent='x'+Math.min(5,Math.max(1,combo));$('gbest').textContent=best?best.toFixed(1)+'s':'\u2013';ct.textContent=n+' / 6 wired'}
// sound + sparks
function snd(f,d,ty,v,dl){if(!ac||mute)return;try{var t=ac.currentTime+(dl||0),o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d+.03)}catch(e){}}
function burst(x,y,k,big){if(rm)return;for(var i=0;i<k;i++){var c=document.createElementNS(SV,'circle'),a=Math.random()*6.283,d=(big?70:24)+Math.random()*(big?130:40);c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',(1+Math.random()*2.2).toFixed(1));c.setAttribute('fill',Math.random()<.5?'#ecc66f':'#f8ecc4');c.setAttribute('stroke','none');fx.appendChild(c);
(function(c){var an=c.animate([{transform:'translate(0px,0px)',opacity:1},{transform:'translate('+(Math.cos(a)*d).toFixed(0)+'px,'+(Math.sin(a)*d).toFixed(0)+'px)',opacity:0}],{duration:600+Math.random()*600,easing:'cubic-bezier(.2,.8,.3,1)'});an.onfinish=function(){c.remove()}})(c)}}
// wiring
function P(e){var r=gb.getBoundingClientRect();return[(e.clientX-r.left)/r.width*800,(e.clientY-r.top)/r.height*480]}
function wp(a,b){return 'M'+a[0]+' '+a[1]+'C'+(a[0]+a[2]*80)+' '+(a[1]+a[3]*80)+' '+(b[0]+(b[2]||0)*80)+' '+(b[1]+(b[3]||0)*80)+' '+b[0]+' '+b[1]}
function tEl(k){return gb.querySelector('.t[data-i="'+k+'"]')}
function start(){if(!playing&&!finished){playing=true;t0=performance.now();iv=setInterval(hud,100)}}
function addWire(i,auto){var e=E[i];if(done[i])return;done[i]=1;cn[e[0]]=cn[e[1]]=1;tEl(e[0]).classList.add('ok');tEl(e[1]).classList.add('ok');
var d=wp(TS[e[0]],TS[e[1]]);['gw draw','gw gwp'].forEach(function(c){var p=document.createElementNS(SV,'path');p.setAttribute('class',c);p.setAttribute('d',d);p.setAttribute('pathLength','1');gw.appendChild(p)});
e[2].forEach(function(id){gb.querySelector('.rp[data-p="'+id+'"]').classList.add('on');burst(PC[id][0],PC[id][1],12,false)});n++;
var a=TS[e[0]],b=TS[e[1]];burst((a[0]+b[0])/2,(a[1]+b[1])/2,16,false);burst(a[0],a[1],8,false);burst(b[0],b[1],8,false);
if(!auto){combo++;var m=Math.min(5,combo);sc+=100*m;snd(NOTE[Math.min(combo-1,5)],.25,'triangle',.09);ms.textContent=OKS[Math.floor(Math.random()*OKS.length)]+(m>1?'  \u00b7  x'+m+' combo':'')}
if(n==6)win();hud()}
function bad(a,b,p){combo=0;pen+=3;sc=Math.max(0,sc-50);snd(110,.3,'sawtooth',.07);[a,b].forEach(function(k){var g=tEl(k);g.classList.add('bad');setTimeout(function(){g.classList.remove('bad')},450)});
ms.textContent='Short circuit! +3s penalty';var g0=dlg.firstElementChild;g0.classList.add('zap');setTimeout(function(){g0.classList.remove('zap')},380);burst(p[0],p[1],12,false);hud()}
function tryWire(a,b,p){for(var i=0;i<E.length;i++){var e=E[i];if((e[0]==a&&e[1]==b)||(e[1]==a&&e[0]==b)){addWire(i,false);return}}bad(a,b,p)}
function win(){ft=playing?el():0;playing=false;finished=true;clearInterval(iv);
if(!assisted)sc+=Math.max(0,Math.round((45-ft)*10));
$('rb').classList.add('alive');$('rn').textContent='online';
var rank=ft<20?'Lightning wiring':ft<35?'Steady hands':'Careful engineer',nb=!assisted&&(!best||ft<best);
if(nb){best=ft;try{localStorage.setItem('circuit-best',String(ft))}catch(e){}}
$('gres').textContent=assisted?'Robot online! Auto-wired, so no score this time.':'Robot online! '+ft.toFixed(1)+'s \u00b7 '+sc+' points \u00b7 '+rank+(nb?' \u00b7 new best!':'');
dn.hidden=false;ms.textContent='Every part is connected.';
[0,1,2,3].forEach(function(k){tms.push(setTimeout(function(){burst(685,210,40,true)},k*280))});[523,659,784,1047,1319].forEach(function(f,k){snd(f,.35,'triangle',.09,k*.09)})}
gb.addEventListener('pointerdown',function(e){var g=e.target.closest&&e.target.closest('.t');if(!g||cn[g.dataset.i]||finished)return;e.preventDefault();start();from=g.dataset.i;gb.setPointerCapture(e.pointerId);tmp=document.createElementNS(SV,'path');tmp.setAttribute('class','gw tmp');gw.appendChild(tmp);tmp.setAttribute('d',wp(TS[from],P(e)))});
gb.addEventListener('pointermove',function(e){if(tmp)tmp.setAttribute('d',wp(TS[from],P(e)))});
function end(e,ok){if(!from)return;var p=P(e),best2=null,bd=28;for(var k in TS){if(k==from||cn[k])continue;var d=Math.hypot(TS[k][0]-p[0],TS[k][1]-p[1]);if(d<bd){bd=d;best2=k}}tmp.remove();tmp=null;var f=from;from=null;if(ok&&best2)tryWire(f,best2,p)}
gb.addEventListener('pointerup',function(e){end(e,true)});gb.addEventListener('pointercancel',function(e){end(e,false)});
function reset(){clearInterval(iv);tms.forEach(clearTimeout);tms=[];cn={};done={};n=0;sc=0;combo=0;pen=0;ft=0;playing=false;finished=false;assisted=false;tmp=null;from=null;dn.hidden=true;ms.textContent=MSG0;build();hud()}
$('gsolve').addEventListener('click',function(){if(finished)return;assisted=true;E.forEach(function(e,i){tms.push(setTimeout(function(){addWire(i,true)},i*450))})});
$('gagain').addEventListener('click',reset);$('gclose').addEventListener('click',function(){dlg.close()});
$('gmute').addEventListener('click',function(){mute=!mute;this.textContent=mute?'Sound off':'Sound on'});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
dlg.addEventListener('close',function(){document.documentElement.classList.remove('lock');clearInterval(iv);tms.forEach(clearTimeout);if(prev&&prev.focus)prev.focus()});
function open(){if(dlg.open)return;prev=document.activeElement;try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state=='suspended')ac.resume()}catch(e){ac=null}reset();document.documentElement.classList.add('lock');dlg.showModal()}
$('spark').addEventListener('click',open);
var bc=0,bt=0;$('brand').addEventListener('click',function(e){var now=Date.now();bc=now-bt<1500?bc+1:1;bt=now;if(bc>=3){e.preventDefault();bc=0;open()}});
var KC=[38,38,40,40,37,39,37,39,66,65],ki=0;addEventListener('keydown',function(e){ki=e.keyCode==KC[ki]?ki+1:(e.keyCode==KC[0]?1:0);if(ki==KC.length){ki=0;open()}});
if(window.console)console.log('\u2726 psst: try the Konami code.');
})();
