import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingHome } from './training-home';

describe('TrainingHome', () => {
  let component: TrainingHome;
  let fixture: ComponentFixture<TrainingHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingHome],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
