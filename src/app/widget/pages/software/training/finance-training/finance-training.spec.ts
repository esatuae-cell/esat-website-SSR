import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTraining } from './finance-training';

describe('FinanceTraining', () => {
  let component: FinanceTraining;
  let fixture: ComponentFixture<FinanceTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
