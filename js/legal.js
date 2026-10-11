/* Privacy Policy and Copyright Notice dialogs. Linkable: index.html#privacy and index.html#copyright */
(function(){
var $=function(i){return document.getElementById(i)},dlg=$('legal'),parts={privacy:$('lg-privacy'),copyright:$('lg-copyright')},prev=null,root=document.documentElement;
document.querySelectorAll('.lmail').forEach(function(a){var u='khushikakar.k',d='gmail.com';a.href='mail'+'to:'+u+'@'+d;a.textContent=u+'@'+d});
function open(k){if(!parts[k])return;prev=document.activeElement;Object.keys(parts).forEach(function(p){parts[p].hidden=p!=k});root.classList.add('lock');if(!dlg.open)dlg.showModal();dlg.scrollTop=0;try{history.replaceState(null,'','#'+k)}catch(e){}}
document.querySelectorAll('[data-legal]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();open(a.dataset.legal)})});
$('lclose').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
dlg.addEventListener('close',function(){root.classList.remove('lock');try{if(parts[location.hash.slice(1)])history.replaceState(null,'',location.pathname+location.search)}catch(e){}if(prev&&prev.focus)prev.focus()});
addEventListener('hashchange',function(){var k=location.hash.slice(1);if(parts[k])open(k)});
if(parts[location.hash.slice(1)])open(location.hash.slice(1));
})();
