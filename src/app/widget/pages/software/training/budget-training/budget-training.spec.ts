import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTraining } from './budget-training';

describe('BudgetTraining', () => {
  let component: BudgetTraining;
  let fixture: ComponentFixture<BudgetTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
