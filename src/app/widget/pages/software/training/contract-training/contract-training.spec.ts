import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTraining } from './contract-training';

describe('ContractTraining', () => {
  let component: ContractTraining;
  let fixture: ComponentFixture<ContractTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
