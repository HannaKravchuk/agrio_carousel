# Testopdracht: "Net Binnen" Carrousel - AgriTech Thema

**Live demo:** [https://hannakravchuk.github.io/agrio_carousel/] | **Bekijk de code:** [https://github.com/HannaKravchuk/agrio_carousel.git)

## 🎯 Doelrealisatie
**Visueel verzorgde, technisch robuuste carrousel** volgens specificaties, met:
- ✅ **Responsive gedrag** (Bootstrap 5 breakpoints: `xs`-`xxl`)
- ✅ **Dual-navigatie**: Pijlen (desktop) + swipe (mobiel)
- ✅ **Dynamische items** (2-10 items, lazy loading afbeeldingen)
- ✅ **Toegankelijkheid** (keyboard-nav, ARIA-labels, focus states)
- ✅ **Performance** (geoptimaliseerde afbeeldingen, debounced resize)

## 🛠 Technisch Overzicht
### Kernstack
| Categorie       | Implementatie                                                                 |
|-----------------|------------------------------------------------------------------------------|
| **Structuur**   | Semantische HTML5 (`<section>`, `<article>`-achtige items)                  |
| **Styling**     | SCSS + Bootstrap 5 (custom breakpoints via `_variables.scss`)               |
| **Interactie**  | Pure JavaScript (ES6 Modules)                                               |
| **Bundling**    | npm + Vite (voor optimale asset handling)                                   |

### Carrousel Highights
```scss
// _carousel.scss - Responsive breakpoints
@include media-breakpoint-up(md) {
  .carousel__item { width: calc(100% / 1.5); } // 2 items zichtbaar
}
@include media-breakpoint-up(lg) {
  .carousel__item { width: calc(100% / 2.5); } // 3 items zichtbaar
}
```
## Projectstructuur

/src
├── /scss
│   ├── _basis.scss       # Globale styles (body, containers)
│   ├── _carousel.scss    # Alle carrousel-specifieke styling
│   └── _variables.scss   # Kleuren, spacing, breakpoints
├── carousel.js           # Interactielogica (swipe, pijlen, keyboard)
└── main.js               # Initialisatie

## 🚀 Gebruiksaanwijzing

```bash
git clone https://github.com/jouw-gebruikersnaam/repo.git
cd repo
npm install
npm run dev \ npm run build
```

## Visuele Afwerking

Typografie: Responsive font-sizes (rem units)
Spacing: Consistente margins/paddings ($spacer variabelen)
Hover/focus: Duidelijke states (zie &:hover in SCSS)
Contrast: WCAG-compliant (tekst op gekleurde labels)
