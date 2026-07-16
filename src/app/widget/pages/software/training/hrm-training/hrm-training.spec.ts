import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmTraining } from './hrm-training';

describe('HrmTraining', () => {
  let component: HrmTraining;
  let fixture: ComponentFixture<HrmTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(HrmTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
