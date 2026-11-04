import { Component, inject } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { nextChapterAfter, reflectionChapter } from '../../content/chapters';
import { getVideo } from '../../content/media';
import { VideoPlayer } from '../../shared/video-player/video-player';

/** Capítulo 06 — Reflexión final: la voz del responsable responde las preguntas de cierre. */
@Component({
  selector: 'app-reflection-chapter',
  imports: [VideoPlayer],
  templateUrl: './reflection-chapter.html',
  host: { class: 'chapter-view' },
})
export class ReflectionChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly content = reflectionChapter;
  protected readonly video = getVideo(this.content.videoId);
  protected readonly next = nextChapterAfter('capitulo-06');
}
