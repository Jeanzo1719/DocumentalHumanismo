import { Component, inject, signal } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { nextChapterAfter, resultsChapter } from '../../content/chapters';

/** Capítulo 05 — Resultados: momentos cronológicos en pantalla y observaciones en el dosier. */
@Component({
  selector: 'app-results-chapter',
  templateUrl: './results-chapter.html',
  host: { class: 'chapter-view' },
})
export class ResultsChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly content = resultsChapter;
  protected readonly next = nextChapterAfter('capitulo-05');

  protected readonly selected = signal(0);
  protected readonly pad = (index: number): string => String(index + 1).padStart(2, '0');
}
