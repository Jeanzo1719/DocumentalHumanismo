import { booleanAttribute, Component, computed, input, signal } from '@angular/core';
import { PhotoItem } from '../../core/models';
import { PendingFrame } from '../pending-frame/pending-frame';

/**
 * Fotografía con carga diferida, leyenda y crédito.
 * Si no hay ruta o el archivo no carga, muestra el marco de pendiente.
 */
@Component({
  selector: 'app-photo',
  imports: [PendingFrame],
  templateUrl: './photo.html',
  styleUrl: './photo.scss',
  host: {
    class: 'photo',
    '[class.photo--fill]': 'fill()',
    '[class.photo--dark]': 'dark()',
    '[class.photo--film]': 'film()',
  },
})
export class Photo {
  readonly media = input.required<PhotoItem>();
  /** Ocupa todo el contenedor (útil para imágenes de fondo o de portada). */
  readonly fill = input(false, { transform: booleanAttribute });
  readonly dark = input(false, { transform: booleanAttribute });
  readonly showCaption = input(true);
  /** Carga anticipada + prioridad alta: usar solo en la imagen principal de la portada. */
  readonly eager = input(false, { transform: booleanAttribute });
  /** Tratamiento tonal sobrio (menor saturación, más contraste) para entornos oscuros. */
  readonly film = input(false, { transform: booleanAttribute });

  protected readonly failed = signal(false);
  protected readonly isPending = computed(() => !this.media().src || this.failed());
}
