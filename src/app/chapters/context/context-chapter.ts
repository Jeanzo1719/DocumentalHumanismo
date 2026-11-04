import { Component, inject, signal } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { contextChapter, nextChapterAfter } from '../../content/chapters';
import { getPhoto } from '../../content/media';
import { Photo } from '../../shared/photo/photo';

/** Capítulo 02 — Contexto y escenario: placa de la sección elegida y dosier con los datos. */
@Component({
  selector: 'app-context-chapter',
  imports: [Photo],
  templateUrl: './context-chapter.html',
  host: { class: 'chapter-view' },
})
export class ContextChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly content = contextChapter;
  protected readonly photos = this.content.photoIds.map((id) => getPhoto(id));
  protected readonly next = nextChapterAfter('capitulo-02');

  protected readonly selected = signal(0);
  protected readonly pad = (index: number): string => String(index + 1).padStart(2, '0');
}
