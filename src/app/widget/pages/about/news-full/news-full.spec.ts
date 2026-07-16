import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFull } from './news-full';

describe('NewsFull', () => {
  let component: NewsFull;
  let fixture: ComponentFixture<NewsFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsFull],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsFull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
