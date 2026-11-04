import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ChapterState } from '../../core/chapter-state';

/** Barra de la sala: capítulo actual, progreso del recorrido, ficha y menú de capítulos. */
@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: {
    class: 'site-header',
    '(document:keydown.escape)': 'menuOpen() ? closeMenu() : true',
  },
})
export class SiteHeader {
  protected readonly ui = inject(ChapterState);
  protected readonly menuOpen = signal(false);
  protected readonly total = this.ui.chapters.length;

  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');
  private readonly menuLinks = viewChildren<ElementRef<HTMLButtonElement>>('menuLink');
  private readonly injector = inject(Injector);

  protected readonly activeIndex = computed(() => this.ui.activeIndex());
  protected readonly count = computed(() => String(this.activeIndex() + 1).padStart(2, '0'));
  protected readonly totalLabel = String(this.total).padStart(2, '0');

  protected toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      return;
    }
    this.ui.fichaOpen.set(false);
    this.menuOpen.set(true);
    afterNextRender(
      () => {
        this.menuLinks()[this.activeIndex()]?.nativeElement.focus();
      },
      { injector: this.injector },
    );
  }

  protected selectFromMenu(id: string): void {
    this.closeMenu(false);
    this.ui.select(id);
  }

  protected closeMenu(restoreFocus = true): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    if (restoreFocus) {
      this.toggleButton().nativeElement.focus();
    }
  }
}
