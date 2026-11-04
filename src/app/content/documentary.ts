import { DocumentaryInfo } from '../core/models';

/**
 * Información general del documental.
 *
 * - `video.src`: ruta local (p. ej. `/assets/videos/documental.mp4`) o URL externa.
 *   Con `null` la página muestra el estado vacío con el placeholder.
 *   Los videos actuales (`intervencion.mp4`, `aprendizaje.mp4`) son fragmentos, no el documental completo.
 * - `chapterMarkers.seconds`: segundo de inicio de cada capítulo dentro del documental.
 *   Con `null` el marcador aparece deshabilitado hasta que se indique el tiempo.
 */
export const documentary: DocumentaryInfo = {
  title: 'Un espacio para compartir',
  subtitle: 'Documental de una experiencia de acompañamiento y escucha',
  synopsis:
    'La experiencia consistió en acompañar y escuchar a una persona que se encontraba en una situación de soledad, con el propósito de abrir un espacio de conversación, compañía y reconocimiento de su dignidad.',
  byline:
    'Realizada de forma individual por Juan Sebastián Ríos Rodríguez, responsable de toda la experiencia.',
  kicker: 'Documental web',
  team: 'Juan Sebastián Ríos Rodríguez',
  setting: 'Calle 68, sector Castilla, Medellín',
  institution: 'Universidad Católica Luis Amigo',
  year: '2026',
  date: 'Domingo 4 de octubre de 2026',
  modality: 'Acompañamiento y escucha individual',
  durationRange: { minMinutes: 10, maxMinutes: 12 },
  video: {
    src: null,
    poster: null,
    captions: null,
  },
  chapterMarkers: [
    { chapterId: 'capitulo-01', seconds: null },
    { chapterId: 'capitulo-02', seconds: null },
    { chapterId: 'capitulo-03', seconds: null },
    { chapterId: 'capitulo-04', seconds: null },
    { chapterId: 'capitulo-05', seconds: null },
    { chapterId: 'capitulo-06', seconds: null },
    { chapterId: 'capitulo-07', seconds: null },
  ],
};
