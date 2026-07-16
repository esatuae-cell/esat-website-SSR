import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurStories } from './our-stories';

describe('OurStories', () => {
  let component: OurStories;
  let fixture: ComponentFixture<OurStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurStories],
    }).compileComponents();

    fixture = TestBed.createComponent(OurStories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
