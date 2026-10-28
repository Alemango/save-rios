# Ríos de Agua Viva — Pre-save

Landing page de pre-save del sencillo **«Ríos de Agua Viva»** de Filadelfia Música.

🔗 **Sitio:** https://alemango.github.io/save-rios/

## Estructura

```
index.html        Página principal + meta tags Open Graph
css/styles.css    Estilos (paleta en variables CSS dentro de :root)
js/main.js        Conteo regresivo, modal del teaser, año del footer
assets/           Portada, fondo, favicon, imagen para compartir y preview .mp3
```

## Personalización rápida

| Qué | Dónde |
|---|---|
| Fecha de lanzamiento | `RELEASE_DATE` en `js/main.js` (dd/mm/aaaa) |
| Enlaces de pre-save | `href` de los botones `.btn-primary` en `index.html` |
| Video teaser | `data-video-id` del botón `#open-teaser` |
| WhatsApp | `https://wa.me/NUMERO` en `index.html` |
| Preview de audio | `assets/preview-15s.mp3` |
| Colores | Variables `--color-*` en `css/styles.css` |

## Publicación

Publicado con **GitHub Pages** desde la rama `main` (carpeta raíz). Cada `git push` actualiza el sitio en 1–2 minutos.
