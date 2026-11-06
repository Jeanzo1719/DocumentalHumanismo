import { Component, input } from '@angular/core';

/** Marco visual para recursos que aún no existen: solo el icono, sin mensajes. */
@Component({
  selector: 'app-pending-frame',
  templateUrl: './pending-frame.html',
  styleUrl: './pending-frame.scss',
  host: {
    class: 'pending-frame',
    '[class.pending-frame--video]': "kind() === 'video'",
    role: 'img',
    'aria-label': 'Espacio reservado para material audiovisual',
  },
})
export class PendingFrame {
  readonly kind = input<'image' | 'video'>('image');
}
