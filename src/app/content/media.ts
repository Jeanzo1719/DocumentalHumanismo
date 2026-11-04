import { MediaItem, PhotoItem, VideoItem } from '../core/models';
import { PENDING } from './pending';

/**
 * Biblioteca de fotografías y videos.
 *
 * Para incorporar un recurso:
 *  1. Copia el archivo a `public/assets/images/` o `public/assets/videos/`.
 *  2. Asigna su ruta en `src` (p. ej. `/assets/images/contexto-01.webp`).
 *  3. Completa `alt`, `caption` y `credit`.
 *
 * El `id` es la clave que usan los capítulos; no lo cambies sin actualizar `chapters.ts`.
 */
export const pendingPhoto = (id: string): PhotoItem => ({
  id,
  kind: 'image',
  src: null,
  alt: PENDING,
  caption: PENDING,
  credit: PENDING,
});

export const pendingVideo = (id: string): VideoItem => ({
  id,
  kind: 'video',
  src: null,
  poster: null,
  captions: null,
  alt: PENDING,
  caption: PENDING,
  credit: PENDING,
});

export const MEDIA: MediaItem[] = [
  {
    id: 'portada',
    kind: 'image',
    src: '/assets/images/portada.jpg',
    alt: 'Retrato de Juan Sebastián Ríos Rodríguez, con chaqueta roja y moño negro, sobre un fondo claro.',
    caption: 'Juan Sebastián Ríos Rodríguez, responsable de la experiencia',
    credit: '',
  },
  {
    id: 'intervencion',
    kind: 'video',
    src: '/assets/videos/intervencion.mp4',
    poster: '/assets/images/poster-intervencion.jpg',
    captions: null,
    alt: 'Registro en video del encuentro de acompañamiento y escucha, tomado a distancia sin grabar la conversación, en la calle 68, sector Castilla.',
    caption: 'Evidencia audiovisual del encuentro en la calle 68',
    credit: 'Grabación a distancia: Juan Sebastián Ríos Rodríguez',
  },
  {
    id: 'aprendizaje',
    kind: 'video',
    src: '/assets/videos/aprendizaje.mp4',
    poster: '/assets/images/poster-aprendizaje.jpg',
    captions: null,
    alt: 'Reflexión final del responsable, que responde en su propia voz las tres preguntas de cierre de la experiencia.',
    caption: 'Reflexión final de la experiencia',
    credit: 'Juan Sebastián Ríos Rodríguez',
  },
];

const byId = new Map(MEDIA.map((item) => [item.id, item]));

export function getMedia(id: string): MediaItem {
  return byId.get(id) ?? { ...pendingPhoto(id), alt: `Recurso no encontrado: ${id}` };
}

export function getPhoto(id: string): PhotoItem {
  const item = getMedia(id);
  return item.kind === 'image' ? item : pendingPhoto(id);
}

export function getVideo(id: string): VideoItem {
  const item = getMedia(id);
  return item.kind === 'video' ? item : pendingVideo(id);
}
