# Xaphil Facility Services — website

Statische redesign van de website van Xaphil Facility Services (Groningen).
HTML/CSS/JS zonder build-stap — alle bestanden kunnen direct geserveerd worden.

## Structuur

- `index.html` — homepagina
- `diensten.html`, `branches.html`, `projecten.html`, `over-ons.html`, `spoed.html`, `contact.html` — hoofdpagina's
- Dienst-subpagina's: `glasbewassing.html`, `opleveringsschoonmaak.html`, `verzamelwoede.html`,
  `nachtclub-event.html`, `extreme-schoonmaak.html`, `publieke-ruimtes.html`,
  `gevelreiniging.html`, `schoonmaak-na-overlijden.html`
- Branche-subpagina's: `onderwijs.html`, `zorg.html`, `kantoren.html`
- `styles.css` — gedeelde stijl (één bestand voor de hele site)
- `site.js` — injecteert header, navigatie en footer op elke pagina

## Aanpassen

- Kleuren, knoppen en lay-out: `styles.css` (kleuren staan bovenin onder `:root`).
- Menu, logo en footer: `site.js` (pas je één keer aan, verandert overal mee).
- Per pagina: het betreffende `.html`-bestand.

## Publiceren

Alle bestanden horen in dezelfde map op de webroot te staan (bijv. `public_html`).
Geen server-side code of database nodig.

## Let op

- Het contactformulier op `contact.html` is nog een demo en verstuurt nog geen echte e-mail.
- Het logo is momenteel een SVG-nabouw; vervang door het originele logobestand wanneer beschikbaar.
