import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTraining } from './procurement-training';

describe('ProcurementTraining', () => {
  let component: ProcurementTraining;
  let fixture: ComponentFixture<ProcurementTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcurementTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
