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
    '<span class="left">🧽 Specialistische schoonmaak in Groningen &amp; omgeving</span>' +
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
    '<span>Concept redesign</span></div></div></footer>';

  var floatHTML =
    '<div class="floaters">' +
    '<a class="fl-wa" href="https://wa.me/31850606838" title="WhatsApp" target="_blank" rel="noopener">💬</a>' +
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
})();
