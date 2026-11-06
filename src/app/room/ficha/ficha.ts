import {
  Component,
  ElementRef,
  effect,
  afterNextRender,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { documentary } from '../../content/documentary';

interface FichaRow {
  label: string;
  value: string;
}

interface FichaChapter {
  number: string;
  title: string;
  state: string;
}

/**
 * Ficha de la experiencia: datos de auditoría y estado del contenido,
 * abierta sobre la sala sin interrumpir la proyección.
 */
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.html',
  styleUrl: './ficha.scss',
  host: {
    class: 'ficha-host',
  },
})
export class Ficha {
  protected readonly ui = inject(ChapterState);
  protected readonly documentary = documentary;

  protected readonly rows: FichaRow[] = [
    { label: 'Responsable', value: 'Juan Sebastián Ríos Rodríguez (experiencia individual)' },
    { label: 'Fecha del encuentro', value: documentary.date },
    { label: 'Escenario', value: documentary.setting },
    { label: 'Modalidad', value: documentary.modality },
    { label: 'Institución', value: documentary.institution },
    { label: 'Duración prevista del documental', value: `10–12 min (${documentary.year})` },
  ];

  protected readonly states: FichaChapter[] = [
    { number: '01', title: 'Portada', state: 'Proyección del documental completo' },
    { number: '02', title: 'Contexto y escenario', state: 'Contexto documentado' },
    { number: '03', title: 'La problemática', state: 'Declaración y respuesta de la experiencia' },
    {
      number: '04',
      title: 'La experiencia',
      state: 'Registro disponible (30 s, grabado a distancia)',
    },
    { number: '05', title: 'Resultados', state: 'Observaciones del encuentro' },
    {
      number: '06',
      title: 'Reflexión final',
      state: 'Registro disponible (2 min 50 s, vertical)',
    },
    { number: '07', title: 'Créditos', state: 'Equipo y agradecimientos' },
  ];

  private readonly close = viewChild<ElementRef<HTMLButtonElement>>('close');
  private readonly injector = inject(Injector);

  constructor() {
    effect(() => {
      if (this.ui.fichaOpen()) {
        afterNextRender(() => this.close()?.nativeElement.focus(), { injector: this.injector });
      }
    });
  }
}
