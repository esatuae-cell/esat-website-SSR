import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityTraining } from './facility-training';

describe('FacilityTraining', () => {
  let component: FacilityTraining;
  let fixture: ComponentFixture<FacilityTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilityTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
