/* Koppeling met MailerLite.
   Elk nieuwsbriefformulier (class nbform) zet de aanmelding in de groep "Nieuwsbrief website".
   Een formulier met data-ml="formulier ID" gaat naar dat MailerLite formulier, bijvoorbeeld de Winter Glow interesselijst.
   Werkwijze: bij het versturen wacht de pagina heel even tot MailerLite de aanmelding heeft ontvangen (maximaal 2 seconden),
   en verstuurt daarna het formulier gewoon naar Web3Forms, zodat je ook nog steeds een mailtje krijgt. */
(function(){
  var BASIS = "https://assets.mailerlite.com/jsonp/2787316/forms/";
  var NIEUWSBRIEF = "204324704253641894";
  var teller = 0;
  function waarde(f, naam){ var el = f.querySelector('[name="' + naam + '"]'); return el ? (el.value || "").trim() : ""; }
  function verstuurDoor(f){ HTMLFormElement.prototype.submit.call(f); }
  document.addEventListener("submit", function(e){
    var f = e.target;
    if (!f || !f.matches || !(f.matches("form.nbform") || f.hasAttribute("data-ml"))) return;
    if (f.getAttribute("data-ml-klaar") === "1") return;
    if (waarde(f, "bot-veld")) return;
    var hp = f.querySelector('[name="botcheck"]'); if (hp && hp.checked) return;
    var email = waarde(f, "email"); if (!email) return;
    var naam = waarde(f, "naam");
    var id = f.getAttribute("data-ml") || NIEUWSBRIEF;
    var url = BASIS + id + "/subscribe";
    e.preventDefault();
    f.setAttribute("data-ml-klaar", "1");
    var knop = f.querySelector('button[type="submit"],button:not([type])'); if (knop){ knop.disabled = true; knop.style.opacity = ".6"; }
    var klaar = false;
    function verder(){ if (klaar) return; klaar = true; verstuurDoor(f); }
    try{
      /* 1. Via een JSONP script: werkt in elke browser en laat weten wanneer MailerLite het heeft ontvangen */
      var cb = "pdML" + Date.now() + (teller++);
      window[cb] = function(){ try{ delete window[cb]; }catch(x){} setTimeout(verder, 150); };
      var q = "fields%5Bemail%5D=" + encodeURIComponent(email) + (naam ? "&fields%5Bname%5D=" + encodeURIComponent(naam) : "") + "&ml-submit=1&anticsrf=true&ajax=1&callback=" + cb;
      var s = document.createElement("script"); s.src = url + "?" + q; s.async = true;
      s.onerror = function(){ setTimeout(verder, 300); };
      document.head.appendChild(s);
      /* 2. En als reserve ook via een gewone POST */
      var d = new FormData();
      d.append("fields[email]", email); if (naam) d.append("fields[name]", naam);
      d.append("ml-submit", "1"); d.append("anticsrf", "true");
      fetch(url, {method:"POST", body:d, mode:"no-cors", keepalive:true}).catch(function(){});
    }catch(x){}
    setTimeout(verder, 2000);
  }, true);
})();
