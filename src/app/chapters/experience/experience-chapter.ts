import { Component, inject, signal } from '@angular/core';
import { ChapterState } from '../../core/chapter-state';
import { experienceChapter, nextChapterAfter } from '../../content/chapters';
import { getVideo } from '../../content/media';
import { Phase } from '../../core/models';
import { VideoPlayer } from '../../shared/video-player/video-player';

interface PhaseView extends Phase {
  step: string;
}

/** Capítulo 04 — La experiencia: etapas seleccionables; el video pertenece solo al encuentro. */
@Component({
  selector: 'app-experience-chapter',
  imports: [VideoPlayer],
  templateUrl: './experience-chapter.html',
  host: { class: 'chapter-view' },
})
export class ExperienceChapter {
  protected readonly ui = inject(ChapterState);
  protected readonly content = experienceChapter;
  protected readonly next = nextChapterAfter('capitulo-04');
  protected readonly encounterVideo = getVideo('intervencion');
  protected readonly phases: PhaseView[] = this.content.phases.map((phase, index) => ({
    ...phase,
    step: String(index + 1).padStart(2, '0'),
  }));

  protected readonly selectedId = signal('fase-02');

  protected selected(): PhaseView {
    return this.phases.find((phase) => phase.id === this.selectedId()) ?? this.phases[0];
  }

  protected isEncounter(): boolean {
    return this.selectedId() === 'fase-02';
  }
}
