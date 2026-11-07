import { Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PendingFrame } from '../pending-frame/pending-frame';

/**
 * Reproductor con controles nativos (reproducción, volumen, progreso y pantalla completa).
 * Nunca se reproduce automáticamente; el video solo carga metadatos o nada hasta que el usuario lo pide.
 */
@Component({
  selector: 'app-video-player',
  imports: [PendingFrame],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: { class: 'video-player' },
})
export class VideoPlayer {
  readonly src = input<string | null>(null);
  readonly poster = input<string | null>(null);
  readonly captions = input<string | null>(null);
  readonly title = input.required<string>();
  readonly preload = input<'none' | 'metadata'>('none');
  readonly dark = input(false);

  /** URL de reproductor externo (p. ej. Google Drive). Se usa cuando no hay `src` local. */
  readonly embedUrl = input<string | null>(null);

  private readonly sanitizer = inject(DomSanitizer);

  /** La URL externa se confía solo por haberse declarado como contenido en `src/app/content/`. */
  protected safeEmbed(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl() ?? '');
  }

  /** Duración en segundos, emitida cuando el navegador lee los metadatos. */
  readonly durationChange = output<number>();

  private readonly player = viewChild<ElementRef<HTMLVideoElement>>('player');

  protected onMetadata(event: Event): void {
    this.durationChange.emit((event.target as HTMLVideoElement).duration);
  }

  /** Sitúa la reproducción en un segundo concreto sin iniciarla. */
  seek(seconds: number): void {
    const video = this.player()?.nativeElement;
    if (video) {
      video.currentTime = seconds;
    }
  }
}
