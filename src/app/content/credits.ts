import { CreditsInfo } from '../core/models';
import { pendingText } from './pending';

/** Créditos finales. Fuente: proyecto multimedia de la experiencia. */
export const credits: CreditsInfo = {
  team: [{ name: 'Juan Sebastián Ríos Rodríguez', role: 'Responsable de toda la experiencia' }],
  collaborators: [],
  setting: 'Calle 68, sector Castilla, Medellín',
  institution: 'Universidad Católica Luis Amigo · Asignatura Contexto Amigoniano',
  delivery: 'Domingo 4 de octubre de 2026',
  // Dejar vacío para ocultar la sección de reconocimientos.
  acknowledgements: [],
  closing: pendingText('frase de cierre del equipo.'),
};
