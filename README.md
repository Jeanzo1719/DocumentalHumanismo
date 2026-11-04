# Un espacio para compartir · Documental web

Documental web interactivo en **Angular 22** (standalone, signals, control flow nuevo) con estilos SCSS.
Toda la información editable vive en `src/app/content/`; los componentes solo leen esos datos.

## Comandos

```bash
npm install
npm start          # servidor de desarrollo en http://localhost:4200
npm run build      # build de producción en dist/documental-humanismo
npm run deploy     # build + despliegue en Cloudflare
```

## Despliegue en Cloudflare

El ajuste vive en `wrangler.jsonc` (Workers con assets estáticos), igual que en el proyecto base:

```jsonc
"assets": {
  "directory": "./dist/documental-humanismo/browser",
  "not_found_handling": "single-page-application"
}
```

Primera vez: `npx wrangler login` (abre el navegador para autenticar). Despliegue: `npm run deploy`.

## Estructura

```
public/assets/
  images/          fotografías y pósters (portada.jpg, poster-intervencion.jpg…)
  videos/          documental completo (pendiente), intervención y reflexión final
  audio/           reservado para audio (pistas, ambiente)

src/app/
  content/         ← EDITAR AQUÍ: todo el contenido del documental
    documentary.ts   título, subtítulo, sinopsis, equipo, escenario, MP4 y marcadores de capítulo
    chapters.ts      textos de cada capítulo, secciones del escenario, fases, momentos y resultados
    media.ts         biblioteca de fotografías y videos (rutas, pies, créditos, texto alternativo)
    credits.ts       créditos finales
    pending.ts       marca "PENDIENTE DE CONTENIDO"
  core/            modelos TypeScript, estado de la sala (capítulo activo, ficha), formato de tiempo
  layout/          cabecera de la sala: capítulo actual, progreso, ficha y menú de capítulos
  room/            ficha de auditoría (overlay con datos y estados)
  shared/          componentes reutilizables: foto, reproductor de video, marco pendiente, ante/después
  chapters/        las 7 vistas de capítulo: cada una aporta escenario (stage) y dosier (dossier)
```

## Sala de proyección (melodía de uso)

La página es una **vista única** sin desplazamiento de página:

- **Escenario (centro):** el material audiovisual o la placa del capítulo. Cuando no hay registro,
  se presenta una placa tipográfica como los títulos de cine.
- **Índice (izquierda, escritorio):** los 7 capítulos siempre visibles; clic para cambiar de vista.
- **Dosier (derecha, escritorio):** información del capítulo para auditoría. Escondida en móvil
  como hoja inferior que se abre con **"Ficha del capítulo"**.
- **Ficha global (botón `Ficha` en la cabecera):** datos de la experiencia, estado por capítulo,
  pendientes declarados y nota ética del registro.
- **Teclado: `←` y `→`** cambian de capítulo; `Escape` cierra ficha o menú; al cambiar de capítulo
  el foco pasa al título del escenario. Los enlaces profundos funcionan con `#capitulo-04`.

Los capítulos con apartados (02 contexto, 04 etapas, 05 momentos) los seleccionan desde el dosier
y la placa del escenario se actualiza; nada requiere recorrer información en desplazamiento.

## Estado de contenido

Todo lo que no te fue proporcionado aparece como **`PENDIENTE DE CONTENIDO`** y muestra
un marco con la ruta esperada del archivo. No hay nombres, fechas, cifras, resultados ni
testimonios inventados. Cuando reemplaces un valor, el marcador desaparece.

Para localizar lo pendiente, busca el texto en `src/app/content/`:

```bash
grep -rn "PENDIENTE" src/app/content/
```

## Incorporar el documental (MP4)

1. Copia el archivo a `public/assets/videos/documental.mp4`.
2. En `src/app/content/documentary.ts`:
   ```ts
   video: { src: '/assets/videos/documental.mp4', poster: '/assets/images/poster.jpg', captions: null },
   ```
   Para una URL externa, usa directamente la URL completa en `src`.
3. Opcional: indica el inicio de cada capítulo en segundos dentro de `chapterMarkers`. La sala
   no muestra esta lista (la navegación por capítulos es el índice); los valores quedan
   declarados en el contenido para futuras interfaces.
4. Revisa la duración. El estado del escenario muestra la duración real al cargar el video y
   avisa si queda fuera del rango `durationRange` (10–12 min por defecto).

Mientras no haya archivo, la página muestra el estado vacío con la ruta esperada.
También puedes previsualizar un MP4 local desde el propio navegador con el botón
**"Previsualizar un MP4 local"**; ese archivo no se guarda en el servidor.

Reglas del reproductor: sin reproducción automática, controles nativos (play, volumen,
progreso, pantalla completa) y carga diferida (`preload="metadata"` en el documental y
`preload="none"` en el resto).

## Incorporar fotografías

1. Copia la imagen a `public/assets/images/`. Formato recomendado: **WebP** (o AVIF), de 2000 px
   de ancho como máximo para fotos de portada y 1200 px para el resto.
2. En `src/app/content/media.ts`, localiza el `id` del recurso (por ejemplo `contexto-01`) y completa:
   ```ts
   pendingPhoto('contexto-01')
   ```
   sustituyendo la función por el objeto completo:
   ```ts
   {
     id: 'contexto-01',
     kind: 'image',
     src: '/assets/images/contexto-01.webp',
     alt: 'Vista general del barrio durante la primera visita del equipo',
     caption: 'Fecha y lugar',
     credit: 'Fotografía: nombre del autor autorizado',
   }
   ```
3. El `alt` debe describir la imagen (accesibilidad). Si el archivo no carga, la página vuelve
   automáticamente al marco de pendiente.

Los `id` que usan los capítulos están en `chapters.ts`:

Recursos actuales (contenido de `BitacoraMultimedia`):

| Capítulo | Recurso |
| --- | --- |
| 01 Portada | `portada` → `public/assets/images/portada.jpg` (retrato) |
| 04 La experiencia | `intervencion` → `public/assets/videos/intervencion.mp4` (30 s) |
| 06 Reflexión final | `aprendizaje` → `public/assets/videos/aprendizaje.mp4` (2 min 50 s, vertical) |

Los capítulos 02, 03 y 05 muestran galerías, evidencias, comparadores y productos solo cuando
hay recursos asignados (`photoIds`, `evidenceIds`, `comparisons`, `products`). Si la lista está
vacía, la sección no aparece.

## Incorporar videos de actividades

Los videos de la experiencia se declaran como `pendingVideo('id')` en `media.ts`. Para activarlos:

```ts
{
  id: 'experiencia-video-01',
  kind: 'video',
  src: '/assets/videos/experiencia-video-01.mp4',
  poster: '/assets/images/experiencia-01.webp',
  captions: null,               // o '/assets/videos/experiencia-video-01.vtt' para subtítulos
  alt: 'Título accesible del video',
  caption: 'Qué se ve en el video',
  credit: 'Autoría',
}
```

Para añadir un video a una etapa, edita su `mediaIds` en `chapters.ts`.

## Comparación antes/después

En `chapters.ts`, cada `comparison` apunta a dos fotos por `id` (`beforeId`, `afterId`). Usa
fotos del mismo encuadre para que el deslizador sea útil. Mientras `comparisons: []` no haya
pares de fotos, la sección no aparece. Los resultados se escriben en `observed` (lo que se
observó durante el encuentro) y `reflection` (reconocimiento personal del responsable);
el relato cronológico del encuentro está en `moments`.

## Créditos

Edita `src/app/content/credits.ts`: lista de equipo, colaboradores, escenario, institución y
fecha de entrega (`delivery`; `null` la oculta). Deja `acknowledgements: []` para ocultar la
sección de reconocimientos. `closing` admite la frase de cierre del equipo (ahora pendiente).

## Navegación

- Cabecera fija con el capítulo actual (`03 / 08 · La problemática`), progreso del recorrido y menú de capítulos.
- Menú: `Escape` lo cierra y devuelve el foco al botón.
- Cada capítulo termina con **Siguiente capítulo**; el último lleva a la portada.
- Las anclas (`#capitulo-03`, `#documental`) funcionan en URL, así que puedes enlazar un capítulo directamente.
- `prefers-reduced-motion` desactiva desplazamiento suave, revelados y animaciones.

## Tipografía y colores

- Titulares: Fraunces (variable). Texto: Inter (variable). Ambas se sirven localmente desde `@fontsource`.
- Paleta en `src/styles.scss` (variables `--ivory`, `--night`, `--clay`…). Los capítulos alternan
  fondos claros, arena y oscuros.

## Verificación realizada

- `npm run build` compila sin errores ni advertencias.
- Sala sin desplazamiento de página: `document.scrollHeight == clientHeight` en escritorio y móvil.
- Navegación: índice lateral, flechas `←`/`→`, menú de capítulos (Escape devuelve el foco),
  pasos anterior/siguiente, progreso por capítulos y enlaces profundos `#capitulo-XX`.
- Recorrido completo de los 7 capítulos con foco sobre el título del escenario.
- Ficha de auditoría: dialog accesible, foco en Cerrar, lista de pendientes, Escape la cierra.
- Hoja móvil del dosier: abierta por «Ficha del capítulo», visible y cerrable; sin solapes.
- Reproductores: sin autoplay, controles nativos, pósters reales, previsualización local de MP4
  para el documental, duración real y aviso de rango.
- Estados vacíos: documental pendiente, sin contenido inventado ni secciones de relleno.
- Sin desbordamientos horizontales (1440 px y 390 px), sin errores de consola.
