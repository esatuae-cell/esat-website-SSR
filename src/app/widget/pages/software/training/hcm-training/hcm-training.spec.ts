import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmTraining } from './hcm-training';

describe('HcmTraining', () => {
  let component: HcmTraining;
  let fixture: ComponentFixture<HcmTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HcmTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(HcmTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
