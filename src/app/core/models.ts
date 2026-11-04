export interface Fact {
  label: string;
  value: string;
}

interface MediaBase {
  id: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface PhotoItem extends MediaBase {
  kind: 'image';
  /** Ruta del archivo, p. ej. `/assets/images/contexto-01.webp`. `null` = pendiente. */
  src: string | null;
}

export interface VideoItem extends MediaBase {
  kind: 'video';
  /** Ruta local (`/assets/videos/...mp4`) o URL externa. `null` = pendiente. */
  src: string | null;
  poster: string | null;
  /** Archivo WebVTT de subtítulos (`/assets/videos/...vtt`). Opcional. */
  captions: string | null;
}

export type MediaItem = PhotoItem | VideoItem;

export interface ChapterInfo {
  id: string;
  number: string;
  title: string;
  kicker: string;
}

export interface ChapterMarker {
  chapterId: string;
  /** Segundo del documental donde empieza el capítulo. `null` = pendiente. */
  seconds: number | null;
}

/** Bloque editorial con título y texto (sección de contexto, momento de resultados…). */
export interface Section {
  title: string;
  text: string;
}

export interface DocumentaryInfo {
  title: string;
  subtitle: string;
  /** Resumen fiel de la experiencia (texto breve bajo el subtítulo). */
  synopsis: string;
  /** Línea que aclara la modalidad y quién la realizó. */
  byline: string;
  kicker: string;
  team: string;
  setting: string;
  institution: string;
  year: string;
  date: string;
  modality: string;
  durationRange: { minMinutes: number; maxMinutes: number };
  video: {
    src: string | null;
    poster: string | null;
    captions: string | null;
  };
  chapterMarkers: ChapterMarker[];
}

export interface ContextChapter {
  lead: string;
  sections: Section[];
  facts: Fact[];
  photoIds: string[];
}

export interface DataPoint {
  value: string;
  label: string;
  source: string;
}

export interface ProblemChapter {
  statement: string;
  /** Lo que se observó en el escenario, sin afirmar más de lo vivido. */
  observed: string[];
  /** Cómo la experiencia respondió a esa situación. */
  response: string[];
  evidenceIds: string[];
  dataPoints: DataPoint[];
}

export interface Phase {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  materials: string[];
  mediaIds: string[];
  /** Nota contextual sobre el registro audiovisual de esta etapa. `null` = sin nota. */
  mediaNote: string | null;
}

export interface ExperienceChapter {
  lead: string;
  phases: Phase[];
}

export interface Comparison {
  id: string;
  title: string;
  description: string;
  beforeId: string;
  afterId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  mediaId: string | null;
}

export interface ResultsChapter {
  lead: string;
  /** Relato cronológico del encuentro: acompañamiento y cierre. */
  moments: Section[];
  /** Resultados observados durante la experiencia. */
  observed: string[];
  /** Reconocimiento personal (reflexión del responsable). */
  reflection: string[];
  comparisons: Comparison[];
  products: Product[];
}

export interface ReflectionChapter {
  question: string;
  lead: string;
  questions: string[];
  videoId: string;
}

export interface Testimonial {
  id: string;
  role: 'participante' | 'integrante';
  name: string;
  identification: string;
  context: string;
  video: VideoItem;
}

export interface Person {
  name: string;
  role: string;
}

export interface CreditsInfo {
  team: Person[];
  collaborators: Person[];
  setting: string;
  institution: string;
  /** Fecha de entrega de la experiencia. `null` = pendiente. */
  delivery: string | null;
  acknowledgements: string[];
  closing: string;
}
