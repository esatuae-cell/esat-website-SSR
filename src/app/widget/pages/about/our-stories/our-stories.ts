import { Component, computed, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STORIES } from './our-stories.data';

interface Achievement {
  title: string;
  description: string;
  image?: string;
}

interface Story {
  year: number;
  achievements: Achievement[];
}

@Component({
  selector: 'app-our-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-stories.html',
  styleUrl: './our-stories.css',
})
export class OurStories {
  stories: Story[] = STORIES;

  activeIndex = signal(0);

  startIndex = signal(0);

  windowSize = 10;

  visibleStories = computed(() =>
    this.stories.slice(this.startIndex(), this.startIndex() + this.windowSize),
  );

  activeStory = computed(() => this.stories[this.activeIndex()]);

  selectYear(index: number) {
    const globalIndex = this.startIndex() + index;
    this.activeIndex.set(globalIndex);
  }

  next() {
    if (this.activeIndex() < this.stories.length - 1) {
      this.activeIndex.update((index) => index + 1);
    }

    if (this.activeIndex() >= this.startIndex() + this.windowSize) {
      this.startIndex.update((index) => index + 1);
    }
  }

  prev() {
    if (this.activeIndex() > 0) {
      this.activeIndex.update((index) => index - 1);
    }

    if (this.activeIndex() < this.startIndex()) {
      this.startIndex.update((index) => index - 1);
    }
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.next();
    } else if (event.deltaY < 0) {
      this.prev();
    }
  }
}
