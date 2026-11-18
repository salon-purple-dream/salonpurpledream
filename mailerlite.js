/* Koppeling met MailerLite.
   Elk nieuwsbriefformulier (class nbform) zet de aanmelding in de groep "Nieuwsbrief website".
   Een formulier met data-ml="formulier ID" gaat naar dat MailerLite formulier, bijvoorbeeld de Winter Glow interesselijst.
   Web3Forms blijft gewoon werken, dus je krijgt ook nog steeds een mailtje bij elke aanmelding. */
(function(){
  var BASIS = "https://assets.mailerlite.com/jsonp/2787316/forms/";
  var NIEUWSBRIEF = "204324704253641894";
  function waarde(f, naam){ var el = f.querySelector('[name="' + naam + '"]'); return el ? (el.value || "").trim() : ""; }
  function stuur(f){
    try{
      if (waarde(f, "bot-veld")) return;
      var hp = f.querySelector('[name="botcheck"]'); if (hp && hp.checked) return;
      var email = waarde(f, "email"); if (!email) return;
      var naam = waarde(f, "naam");
      var id = f.getAttribute("data-ml") || NIEUWSBRIEF;
      var d = new FormData();
      d.append("fields[email]", email);
      if (naam) d.append("fields[name]", naam);
      d.append("ml-submit", "1");
      d.append("anticsrf", "true");
      var url = BASIS + id + "/subscribe";
      if (!(navigator.sendBeacon && navigator.sendBeacon(url, d))){
        fetch(url, {method:"POST", body:d, mode:"no-cors", keepalive:true});
      }
    }catch(e){}
  }
  document.addEventListener("submit", function(e){
    var f = e.target;
    if (f && f.matches && (f.matches("form.nbform") || f.hasAttribute("data-ml"))) stuur(f);
  }, true);
})();
