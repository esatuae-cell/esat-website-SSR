import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollTraining } from './payroll-training';

describe('PayrollTraining', () => {
  let component: PayrollTraining;
  let fixture: ComponentFixture<PayrollTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
