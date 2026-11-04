import { Component, input, signal } from '@angular/core';
import { PhotoItem } from '../../core/models';
import { Photo } from '../photo/photo';

/** Comparador de dos fotografías con control deslizante (teclado y puntero). */
@Component({
  selector: 'app-before-after',
  imports: [Photo],
  templateUrl: './before-after.html',
  styleUrl: './before-after.scss',
  host: { class: 'before-after' },
})
export class BeforeAfter {
  readonly before = input.required<PhotoItem>();
  readonly after = input.required<PhotoItem>();
  readonly beforeLabel = input('Antes');
  readonly afterLabel = input('Después');
  readonly ariaLabel = input('Comparar antes y después');

  protected readonly position = signal(50);

  protected onInput(event: Event): void {
    this.position.set(Number((event.target as HTMLInputElement).value));
  }
}
