import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAccounts } from './finance-accounts';

describe('FinanceAccounts', () => {
  let component: FinanceAccounts;
  let fixture: ComponentFixture<FinanceAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceAccounts],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceAccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
