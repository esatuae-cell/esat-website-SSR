import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateTraining } from './real-estate-training';

describe('RealEstateTraining', () => {
  let component: RealEstateTraining;
  let fixture: ComponentFixture<RealEstateTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(RealEstateTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
