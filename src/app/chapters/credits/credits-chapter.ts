import { Component, inject } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { credits } from '../../content/credits';
import { documentary } from '../../content/documentary';

/** Capítulo 07 — Créditos: tarjeta de cierre en pantalla y detalle completo en el dosier. */
@Component({
  selector: 'app-credits-chapter',
  templateUrl: './credits-chapter.html',
  host: { class: 'chapter-view' },
})
export class CreditsChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly credits = credits;
  protected readonly documentary = documentary;
}
