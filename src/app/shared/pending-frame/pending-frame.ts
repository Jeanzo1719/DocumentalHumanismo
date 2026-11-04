import { Component, input } from '@angular/core';
import { PENDING } from '../../content/pending';

/** Marco visual para recursos que aún no existen. Indica la ruta esperada. */
@Component({
  selector: 'app-pending-frame',
  templateUrl: './pending-frame.html',
  styleUrl: './pending-frame.scss',
  host: { class: 'pending-frame', '[class.pending-frame--video]': "kind() === 'video'" },
})
export class PendingFrame {
  readonly kind = input<'image' | 'video'>('image');
  readonly path = input<string>('');
  readonly label = input<string>(PENDING);
}
