import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingTraining } from './manufacturing-training';

describe('ManufacturingTraining', () => {
  let component: ManufacturingTraining;
  let fixture: ComponentFixture<ManufacturingTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturingTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
