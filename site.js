/* Xaphil Facility Services — shared header/footer/nav */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  // Officieel logo. Lokaal bestand '/images/logo.png' heeft voorrang; valt anders
  // terug op het logo dat al op de eigen server staat.
  var LOGO_LOCAL = '/images/logo.png';
  var LOGO_REMOTE = 'https://xaphilfacilityservices.websitebijnaklaar.nl/wp-content/uploads/2024/11/logo.png';
  var logoSVG =
    '<img class="logo-full" src="' + LOGO_LOCAL + '" alt="Xaphil Facility Services" ' +
    'onerror="this.onerror=null;this.src=\'' + LOGO_REMOTE + '\'">';

  var defSvg = '';

  var diensten = [
    ['/diensten/particuliere-schoonmaak/', 'Particuliere schoonmaak'],
    ['/diensten/maidservice/', 'Maidservice'],
    ['/diensten/glasbewassing/', 'Glasbewassing'],
    ['/diensten/opleveringsschoonmaak/', 'Opleveringsschoonmaak'],
    ['/diensten/hoarding-verzamelwoede-schoonmaak/', 'Schoonmaak na verzamelwoede'],
    ['/diensten/nachtclub-en-eventreiniging/', 'Nachtclub & eventreiniging'],
    ['/diensten/extreme-schoonmaak-na-incidenten/', 'Extreme schoonmaak na incidenten'],
    ['/diensten/publieke-ruimtes/', 'Schoonmaak publieke ruimtes'],
    ['/diensten/gevelreiniging/', 'Gevelreiniging'],
    ['/diensten/schoonmaak-na-overlijden-in-groningen/', 'Schoonmaak na overlijden']
  ];
  var branches = [
    ['/branches/onderwijs/', 'Schoonmaak onderwijs'],
    ['/branches/zorg/', 'Schoonmaak zorg'],
    ['/branches/kantoren/', 'Kantoorschoonmaak']
  ];

  function drop(items) {
    return '<div class="dropdown">' + items.map(function (i) {
      return '<a href="' + i[0] + '">' + i[1] + '</a>';
    }).join('') + '</div>';
  }

  var navHTML =
    '<div class="topbar"><div class="wrap">' +
    '<a class="tb-reviews" href="https://maps.google.com/?cid=4735427590661068135" target="_blank" rel="noopener" aria-label="Bekijk onze Google-reviews">' +
    '<svg class="gico" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>' +
    '<span class="tb-stars">★★★★★</span><b>5,0</b><span class="tb-sub">· 11 Google reviews</span></a>' +
    '<div class="right"><a href="tel:+31850606838">📞 085 06 06 838</a>' +
    '<a href="mailto:info@xaphilfacilityservices.com">✉️ info@xaphilfacilityservices.com</a></div>' +
    '</div></div>' +
    '<header class="nav"><div class="wrap">' +
    '<a href="/" class="logo">' + logoSVG + '</a>' +
    '<nav class="main">' +
    '<a href="/" data-p="home">Home</a>' +
    '<div class="has-drop" data-p="diensten"><a href="/diensten/">Diensten <span class="caret">▼</span></a>' + drop(diensten) + '</div>' +
    '<div class="has-drop" data-p="branches"><a href="/branches/">Branches <span class="caret">▼</span></a>' + drop(branches) + '</div>' +
    '<a href="/onze-projecten/" data-p="projecten">Projecten</a>' +
    '<a href="/over-ons/" data-p="over-ons">Over ons</a>' +
    '<a href="/spoed-schoonmaak-groningen/" data-p="spoed">Spoed</a>' +
    '<a href="/contact/" data-p="contact">Contact</a>' +
    '</nav>' +
    '<div class="nav-cta">' +
    '<a href="tel:+31850606838" class="btn btn-dark">Bel ons</a>' +
    '<a href="/contact/" class="btn btn-primary">Offerte aanvragen</a>' +
    '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div>' +
    '</div></header>';

  var footHTML =
    '<footer><div class="wrap"><div class="foot-grid">' +
    '<div class="foot-brand"><a href="/" class="logo">' + logoSVG + '</a>' +
    '<p>Uw partner in specialistische en professionele schoonmaak in Groningen en omgeving.</p></div>' +
    '<div><h4>Menu</h4>' +
    '<a href="/diensten/">Diensten</a><a href="/branches/">Branches</a>' +
    '<a href="/onze-projecten/">Projecten</a><a href="/over-ons/">Over ons</a><a href="/contact/">Contact</a></div>' +
    '<div><h4>Diensten</h4>' +
    '<a href="/diensten/glasbewassing/">Glasbewassing</a><a href="/diensten/opleveringsschoonmaak/">Opleveringsschoonmaak</a>' +
    '<a href="/diensten/extreme-schoonmaak-na-incidenten/">Extreme schoonmaak</a><a href="/diensten/gevelreiniging/">Gevelreiniging</a>' +
    '<a href="/spoed-schoonmaak-groningen/">Spoeddienst 24/7</a></div>' +
    '<div class="foot-contact"><h4>Contact</h4>' +
    '<a href="tel:+31850606838"><b>085 06 06 838</b></a>' +
    '<a href="mailto:info@xaphilfacilityservices.com">info@xaphilfacilityservices.com</a>' +
    '<a href="https://maps.google.com/?cid=4735427590661068135" target="_blank" rel="noopener">Verlengde Bremenweg 15<br>9723 JV Groningen</a></div>' +
    '</div><div class="foot-bottom">' +
    '<span>© 2026 Xaphil Facility Services · Alle rechten voorbehouden</span>' +
    '<span><a href="/privacyverklaring/">Privacyverklaring</a> · <a href="/algemene-voorwaarden/">Algemene voorwaarden</a></span></div></div></footer>';

  var floatHTML =
    '<div class="floaters">' +
    '<a class="fl-wa" href="https://wa.me/31626463606" title="WhatsApp" target="_blank" rel="noopener">💬</a>' +
    '<a class="fl-tel" href="tel:+31850606838" title="Bel ons">📞</a>' +
    '</div>';

  var headEl = document.getElementById('site-header');
  if (headEl) headEl.innerHTML = defSvg + navHTML;
  var footEl = document.getElementById('site-footer');
  if (footEl) footEl.innerHTML = footHTML + floatHTML;

  // active state
  var active = document.querySelector('[data-p="' + page + '"]');
  if (active) {
    if (active.classList.contains('has-drop')) active.classList.add('active');
    else active.classList.add('active');
  }

  // mobile toggle
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
    });
  }

  // verberg ontbrekende partnerlogo's netjes (geen kapot-icoon)
  document.querySelectorAll('.clients .logo-img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  // Cookie-toestemming + Google Tag Manager (laadt pas na akkoord — AVG)
  (function () {
    var GTM = 'GTM-NWJ7VW7T';
    function loadGTM() {
      if (window.__gtmLoaded) return; window.__gtmLoaded = true;
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', GTM);
    }
    var consent = null; try { consent = localStorage.getItem('xaphil_consent'); } catch (e) {}
    if (consent === 'accepted') { loadGTM(); return; }
    if (consent === 'declined') { return; }
    var bar = document.createElement('div');
    bar.id = 'cookiebar';
    bar.innerHTML = '<div class="cc-inner"><span>We gebruiken cookies om onze website te analyseren en te verbeteren. Meer info in onze <a href="/privacyverklaring/">privacyverklaring</a>.</span>' +
      '<div class="cc-btns"><button class="cc-no" type="button">Weigeren</button><button class="cc-yes" type="button">Accepteren</button></div></div>';
    document.body.appendChild(bar);
    function done(v) { try { localStorage.setItem('xaphil_consent', v); } catch (e) {} bar.remove(); }
    bar.querySelector('.cc-yes').addEventListener('click', function () { done('accepted'); loadGTM(); });
    bar.querySelector('.cc-no').addEventListener('click', function () { done('declined'); });
  })();
})();
