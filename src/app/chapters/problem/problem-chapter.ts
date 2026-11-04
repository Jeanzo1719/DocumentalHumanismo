import { Component, inject } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { nextChapterAfter, problemChapter } from '../../content/chapters';

/** Capítulo 03 — La problemática: declaración en pantalla y contexto en el dosier. */
@Component({
  selector: 'app-problem-chapter',
  templateUrl: './problem-chapter.html',
  host: { class: 'chapter-view' },
})
export class ProblemChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly content = problemChapter;
  protected readonly next = nextChapterAfter('capitulo-03');
}
