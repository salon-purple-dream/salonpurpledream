/* Cookiebanner Salon Purple Dream. Bewaart de keuze in de browser en zet Google Analytics en de Meta Pixel alleen aan na "Prima". */
(function(){
  function keuze(){try{return localStorage.getItem('pd_cookies');}catch(e){return null;}}
  function bewaar(k){try{localStorage.setItem('pd_cookies',k);}catch(e){}}
  function toon(){
    if(document.getElementById('pd-cookies'))return;
    var css=document.createElement('style');
    css.textContent='#pd-cookies{position:fixed;left:16px;right:16px;bottom:16px;max-width:520px;margin:0 auto;background:#fefbf4;color:#3d2547;border:1px solid #dacee6;border-radius:14px;box-shadow:0 10px 30px rgba(61,37,71,.18);padding:18px 20px;font-family:"Jost","Avenir Next",Arial,sans-serif;font-size:15px;line-height:1.5;z-index:9999}#pd-cookies p{margin:0 0 14px}#pd-cookies a{color:#7f649d}#pd-cookies .knoppen{display:flex;gap:10px;flex-wrap:wrap}#pd-cookies button{font:inherit;cursor:pointer;border-radius:999px;padding:9px 20px;border:1px solid #3d2547}#pd-cookies .ja{background:#3d2547;color:#fff}#pd-cookies .nee{background:transparent;color:#3d2547}';
    document.head.appendChild(css);
    var d=document.createElement('div');d.id='pd-cookies';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookies');
    d.innerHTML='<p>Mag ik bijhouden hoe mijn website wordt bezocht? Dan zie ik wat je fijn vindt om te lezen, en kan ik je op Instagram en Facebook laten zien wat bij je past. Ik gebruik hiervoor Google Analytics en de Meta Pixel. <a href="/privacy">Lees meer</a></p><div class="knoppen"><button class="ja" type="button">Prima</button><button class="nee" type="button">Liever niet</button></div>';
    document.body.appendChild(d);
    d.querySelector('.ja').onclick=function(){bewaar('ja');if(window.gtag)gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});if(window.fbq)fbq('consent','grant');d.remove();};
    d.querySelector('.nee').onclick=function(){bewaar('nee');if(window.gtag)gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});if(window.fbq)fbq('consent','revoke');d.remove();};
  }
  window.pdCookieInstellingen=function(){var b=document.getElementById('pd-cookies');if(b)b.remove();toon();};
  if(!keuze()){if(document.body)toon();else document.addEventListener('DOMContentLoaded',toon);}
})();
