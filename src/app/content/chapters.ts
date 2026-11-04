import {
  ChapterInfo,
  ContextChapter,
  ExperienceChapter,
  ProblemChapter,
  ReflectionChapter,
  ResultsChapter,
} from '../core/models';

/** Orden y títulos de los capítulos. Alimenta el índice, la cabecera, la ficha y las vistas. */
export const CHAPTERS: ChapterInfo[] = [
  { id: 'capitulo-01', number: '01', title: 'Portada', kicker: 'Introducción' },
  { id: 'capitulo-02', number: '02', title: 'Contexto y escenario', kicker: 'Dónde y cómo' },
  { id: 'capitulo-03', number: '03', title: 'La problemática', kicker: 'El punto de partida' },
  { id: 'capitulo-04', number: '04', title: 'La experiencia', kicker: 'El recorrido' },
  { id: 'capitulo-05', number: '05', title: 'Resultados', kicker: 'Lo que quedó' },
  { id: 'capitulo-06', number: '06', title: 'Reflexión final', kicker: 'La propia voz' },
  { id: 'capitulo-07', number: '07', title: 'Créditos', kicker: 'Equipo y agradecimientos' },
];

/** Capítulo que sigue al indicado, o `null` si es el último. */
export const nextChapterAfter = (id: string): ChapterInfo | null => {
  const index = CHAPTERS.findIndex((chapter) => chapter.id === id);
  return index >= 0 && index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;
};

export const contextChapter: ContextChapter = {
  lead: 'La experiencia fue planeada previamente y se eligió la calle 68 del sector Castilla, en Medellín, como escenario para realizar el acompañamiento.',
  sections: [
    {
      title: 'El lugar',
      text: 'La calle 68 del sector Castilla se eligió previamente como escenario de la experiencia, por ser un espacio de carácter comercial y de tránsito frecuente de personas. En este lugar es común encontrar personas que recorren la zona ofreciendo dulces y otros productos como una forma de obtener ingresos para su sustento diario.',
    },
    {
      title: 'La organización',
      text: 'La actividad fue planeada previamente y se definió la calle 68 del sector Castilla como escenario, junto con el propósito de acompañar y escuchar. No estaba determinado quién sería la persona acompañada ni el momento exacto del encuentro: una vez en el lugar, se esperó a que se presentara la oportunidad de acercamiento. La interacción no se condicionó a la realización de la actividad académica.',
    },
    {
      title: 'Materiales',
      text: 'El único material utilizado fue un teléfono celular, empleado para registrar parte de la experiencia mediante video. La grabación se realizó desde una distancia prudente y sin registrar directamente la conversación, como una decisión consciente para preservar la privacidad, dignidad y tranquilidad de la persona acompañada. La intención era documentar la experiencia sin convertir a la persona ni a su situación personal en material de exposición para una actividad académica.',
    },
  ],
  facts: [
    { label: 'Ubicación', value: 'Calle 68, sector Castilla, Medellín' },
    { label: 'Modalidad', value: 'Acompañamiento y escucha individual' },
    { label: 'Fecha del encuentro', value: 'Domingo 4 de octubre de 2026' },
    { label: 'Material de registro', value: 'Un teléfono celular, grabado a distancia' },
  ],
  photoIds: [],
};

export const problemChapter: ProblemChapter = {
  statement:
    'Para algunas personas que ofrecen dulces en la calle, las condiciones económicas pueden dificultar incluso el acceso cotidiano a una alimentación adecuada.',
  observed: [
    'En la calle 68 del sector Castilla es común encontrar personas que recorren la zona ofreciendo dulces y otros productos como una forma de obtener ingresos para su sustento diario.',
    'Ese trasiego cotidiano fue lo único que la experiencia pudo observar de antemano: nada se sabía aún de la persona con la que se contaría, ni de su situación particular.',
  ],
  response: [
    'La experiencia partió del reconocimiento de esa situación. Acompañar y escuchar a una persona que se encontraba en una situación de soledad buscaba abrir un espacio de conversación, compañía y reconocimiento de su dignidad.',
    'La invitación a comer formaba parte del propósito definido de la experiencia; lo que no estaba previsto era con qué persona se produciría el encuentro.',
  ],
  evidenceIds: [],
  dataPoints: [],
};

export const experienceChapter: ExperienceChapter = {
  lead: 'El acompañamiento se dio desde la presencia y la escucha. La invitación a comer formaba parte del propósito definido de la experiencia; lo que no estaba previsto era con qué persona se produciría el encuentro.',
  phases: [
    {
      id: 'fase-01',
      dateLabel: 'Previo al encuentro',
      title: 'Preparación',
      description:
        'La actividad se planeó con antelación: se definió la calle 68 del sector Castilla como escenario y el propósito de acompañar y escuchar. No estaba determinado quién sería la persona acompañada ni el momento exacto del encuentro.',
      materials: ['Teléfono celular'],
      mediaIds: [],
      mediaNote: null,
    },
    {
      id: 'fase-02',
      dateLabel: 'Domingo 4 de octubre de 2026',
      title: 'El encuentro',
      description:
        'Se esperó la oportunidad de acercamiento con una persona que ofrecía dulces para obtener ingresos. Cuando se presentó, se hizo la invitación a comer y se generó un espacio de conversación y acompañamiento, sencillo y respetuoso.',
      materials: [],
      mediaIds: ['intervencion'],
      mediaNote:
        'El registro se hizo desde una distancia prudente y sin capturar la conversación, como decisión consciente para preservar la privacidad y la tranquilidad de la persona acompañada.',
    },
    {
      id: 'fase-03',
      dateLabel: 'Cierre de la visita',
      title: 'Despedida',
      description: 'Al finalizar el encuentro, el cierre se dio de manera natural y respetuosa.',
      materials: [],
      mediaIds: [],
      mediaNote: null,
    },
  ],
};

export const resultsChapter: ResultsChapter = {
  lead: 'Lo que dejó el encuentro se observó en el momento, más que en un producto entregado. Estas son las observaciones reales de la experiencia.',
  moments: [
    {
      title: 'El encuentro',
      text: 'Se esperó la oportunidad de acercamiento con una persona que ofrecía dulces para obtener ingresos. Cuando se presentó, se hizo la invitación a comer y comenzó un espacio de conversación y acompañamiento.',
    },
    {
      title: 'El acompañamiento',
      text: 'Se compartió una comida y, con ella, una conversación pausada. La atención se centró en la persona: escucharla y acompañarla en un momento cotidiano, sin reducir el encuentro a su situación económica ni a su actividad de venta.',
    },
    {
      title: 'El cierre',
      text: 'Al finalizar la visita, la despedida se dio de manera natural y respetuosa, sin forzar una conclusión ni un resultado concreto.',
    },
  ],
  observed: [
    'Se generó un espacio de conversación y acompañamiento mientras se compartía una comida.',
    'La experiencia permitió prestar atención a la persona, escucharla y compartir un momento cotidiano.',
  ],
  reflection: [
    'Se reconoció el valor de dedicar tiempo a otra persona.',
    'Una acción sencilla, como compartir una comida y brindar un espacio de escucha, puede convertirse en una forma concreta de acompañamiento y de reconocimiento de la dignidad humana.',
  ],
  comparisons: [],
  products: [],
};

export const reflectionChapter: ReflectionChapter = {
  question:
    '¿Cómo vivimos el Humanismo Amigoniano durante nuestra experiencia de intervención comunitaria?',
  lead: 'En este video respondo, en mi propia voz, las tres preguntas de cierre de la experiencia: lo que hice, lo que aprendí sobre el Humanismo Amigoniano y lo que cambiaría si repitiera la experiencia.',
  questions: [
    '¿Qué hice?',
    '¿Qué aprendí sobre el Humanismo Amigoniano?',
    '¿Qué cambiaría si repitiera la experiencia?',
  ],
  videoId: 'aprendizaje',
};
