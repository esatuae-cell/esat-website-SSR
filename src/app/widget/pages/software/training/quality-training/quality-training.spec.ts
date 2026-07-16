import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityTraining } from './quality-training';

describe('QualityTraining', () => {
  let component: QualityTraining;
  let fixture: ComponentFixture<QualityTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(QualityTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
