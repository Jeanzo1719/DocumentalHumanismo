/** Marca visible para todo contenido que aún no existe. Reemplazar al incorporar el contenido real. */
export const PENDING = 'PENDIENTE DE CONTENIDO';

export const pendingText = (hint: string): string => `${PENDING}: ${hint}`;
