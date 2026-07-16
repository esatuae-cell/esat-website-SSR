import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetProject } from './budget-project';

describe('BudgetProject', () => {
  let component: BudgetProject;
  let fixture: ComponentFixture<BudgetProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetProject],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
