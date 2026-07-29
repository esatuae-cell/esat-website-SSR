import { Component, computed, signal, HostListener } from '@angular/core';
import { STORIES } from './our-stories.data';
import { CommonModule } from '@angular/common';
import { About } from '../about/about';

interface Story {
  year: number;
  title: string;
  description: string;
  image?: string;
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

  // active index
  activeIndex = signal(0);

  // visible window (first 10 years initially)
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
    // Move active year forward
    if (this.activeIndex() < this.stories.length - 1) {
      this.activeIndex.update((v) => v + 1);
    }

    // Move visible window forward if active year reaches the end
    if (this.activeIndex() >= this.startIndex() + this.windowSize) {
      this.startIndex.update((v) => v + 1);
    }
  }

  prev() {
    // Move active year backward
    if (this.activeIndex() > 0) {
      this.activeIndex.update((v) => v - 1);
    }

    // Move visible window backward if active year reaches the beginning
    if (this.activeIndex() < this.startIndex()) {
      this.startIndex.update((v) => v - 1);
    }
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) this.next();
    else this.prev();
  }
}
