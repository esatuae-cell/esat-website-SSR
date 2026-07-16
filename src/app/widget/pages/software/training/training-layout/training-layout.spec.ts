import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLayout } from './training-layout';

describe('TrainingLayout', () => {
  let component: TrainingLayout;
  let fixture: ComponentFixture<TrainingLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
