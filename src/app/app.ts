import { Component, inject } from '@angular/core';
import { ChapterState } from './core/chapter-state';
import { SiteHeader } from './layout/site-header/site-header';
import { Ficha } from './room/ficha/ficha';
import { CoverChapter } from './chapters/cover/cover-chapter';
import { ContextChapter } from './chapters/context/context-chapter';
import { ProblemChapter } from './chapters/problem/problem-chapter';
import { ExperienceChapter } from './chapters/experience/experience-chapter';
import { ResultsChapter } from './chapters/results/results-chapter';
import { ReflectionChapter } from './chapters/reflection/reflection-chapter';
import { CreditsChapter } from './chapters/credits/credits-chapter';

@Component({
  selector: 'app-root',
  imports: [
    SiteHeader,
    Ficha,
    CoverChapter,
    ContextChapter,
    ProblemChapter,
    ExperienceChapter,
    ResultsChapter,
    ReflectionChapter,
    CreditsChapter,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(document:keydown.escape)': 'onEscape()',
    '(document:keydown.arrowright)': 'onArrow($event, 1)',
    '(document:keydown.arrowleft)': 'onArrow($event, -1)',
  },
})
export class App {
  protected readonly ui = inject(ChapterState);

  protected onEscape(): void {
    this.ui.closeOverlays();
  }

  protected onArrow(event: KeyboardEvent | Event, direction: 1 | -1): void {
    const keyboard = event as KeyboardEvent;
    const target = keyboard.target as HTMLElement | null;
    if (!target || target.closest('input, textarea, select, [data-room-overlay]')) {
      return;
    }
    keyboard.preventDefault();
    if (direction === 1) {
      this.ui.next();
    } else {
      this.ui.prev();
    }
  }
}
