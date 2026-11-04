import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Injectable, signal } from '@angular/core';
import { CHAPTERS } from '../content/chapters';

/**
 * Estado de la sala de proyección: capítulo activo y superposiciones abiertas.
 * La navegación no depende del desplazamiento: seleccionar un capítulo cambia la vista.
 * `#capitulo-04` en la URL abre el capítulo 04 directamente.
 */
@Injectable({ providedIn: 'root' })
export class ChapterState {
  private readonly doc = inject(DOCUMENT);

  readonly chapters = CHAPTERS;
  readonly activeId = signal<string>(CHAPTERS[0].id);
  readonly progress = signal(0);
  readonly fichaOpen = signal(false);
  readonly infoSheetOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      this.activeId.set(this.chapterFromHash());
      this.syncProgress();
      const win = this.doc.defaultView!;
      win.addEventListener('hashchange', () => this.activeId.set(this.chapterFromHash()));
    });
  }

  activeIndex(): number {
    return Math.max(
      0,
      this.chapters.findIndex((chapter) => chapter.id === this.activeId()),
    );
  }

  active() {
    return this.chapters[this.activeIndex()];
  }

  select(id: string): void {
    if (!this.chapters.some((chapter) => chapter.id === id)) {
      return;
    }
    this.infoSheetOpen.set(false);
    this.fichaOpen.set(false);
    if (this.doc.defaultView!.location.hash !== `#${id}`) {
      this.doc.defaultView!.location.hash = id;
    }
    this.activeId.set(id);
    this.syncProgress();
    this.focusStage();
  }

  next(): void {
    const index = this.activeIndex();
    if (index < this.chapters.length - 1) {
      this.select(this.chapters[index + 1].id);
    }
  }

  prev(): void {
    const index = this.activeIndex();
    if (index > 0) {
      this.select(this.chapters[index - 1].id);
    }
  }

  toggleFicha(): void {
    this.infoSheetOpen.set(false);
    this.fichaOpen.update((open) => !open);
  }

  closeOverlays(): void {
    this.fichaOpen.set(false);
    this.infoSheetOpen.set(false);
  }

  closeInfoSheet(): void {
    this.infoSheetOpen.set(false);
  }

  toggleInfoSheet(): void {
    this.fichaOpen.set(false);
    this.infoSheetOpen.update((open) => !open);
  }

  /** Devuelve el foco al título del escenario para que el teclado no se pierda. */
  private focusStage(): void {
    const win = this.doc.defaultView!;
    win.requestAnimationFrame(() => {
      this.doc.getElementById('stage-title')?.focus({ preventScroll: true });
    });
  }

  private chapterFromHash(): string {
    const hash = this.doc.defaultView!.location.hash.replace('#', '');
    return this.chapters.some((chapter) => chapter.id === hash) ? hash : CHAPTERS[0].id;
  }

  private syncProgress(): void {
    this.progress.set((this.activeIndex() + 1) / this.chapters.length);
  }
}
