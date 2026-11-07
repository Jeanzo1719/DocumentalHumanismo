import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { documentary } from '../../content/documentary';
import { getPhoto } from '../../content/media';
import { formatTime } from '../../core/time';
import { Photo } from '../../shared/photo/photo';
import { VideoPlayer } from '../../shared/video-player/video-player';

/** Capítulo 01 — Portada: placa del documental y ficha de presentación. */
@Component({
  selector: 'app-cover-chapter',
  imports: [Photo, VideoPlayer],
  templateUrl: './cover-chapter.html',
  host: { class: 'chapter-view' },
})
export class CoverChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly documentary = documentary;
  protected readonly cover = getPhoto('portada');
  protected readonly range = documentary.durationRange;

  /** El MP4 definitivo declarado en `documentary.ts` (null = pendiente). */
  protected readonly masterSrc = documentary.video.src;

  /** Reproductor externo (p. ej. Google Drive) cuando el archivo vive fuera del sitio. */
  protected readonly embeddedSrc = documentary.video.embedUrl;

  /** Previsualización de un MP4 local. Nunca sustituye al documental definitivo. */
  protected readonly previewUrl = signal<string | null>(null);

  /** Duración real del material en pantalla. */
  protected readonly realDuration = signal<number | null>(null);

  protected readonly stageSrc = computed(() => this.previewUrl() ?? this.masterSrc);

  protected readonly durationWarning = computed(() => {
    const seconds = this.realDuration();
    if (seconds === null) {
      return null;
    }
    const minutes = seconds / 60;
    if (minutes < this.range.minMinutes || minutes > this.range.maxMinutes) {
      return `La duración real (${formatTime(seconds)}) queda fuera del rango previsto de ${this.range.minMinutes} a ${this.range.maxMinutes} minutos.`;
    }
    return null;
  });

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => this.revokePreview());
  }

  protected onPreviewFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.revokePreview();
    this.previewUrl.set(URL.createObjectURL(file));
    this.realDuration.set(null);
  }

  protected clearPreview(): void {
    this.revokePreview();
    this.realDuration.set(null);
  }

  protected onDuration(seconds: number): void {
    this.realDuration.set(seconds);
  }

  protected stageState(): string {
    if (this.realDuration() !== null) {
      return `Duración real · ${formatTime(this.realDuration()!)}`;
    }
    return this.masterSrc || this.embeddedSrc ? 'Documental disponible' : 'Documental completo';
  }

  private revokePreview(): void {
    const url = this.previewUrl();
    if (url) {
      URL.revokeObjectURL(url);
      this.previewUrl.set(null);
    }
  }
}
