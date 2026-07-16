import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseTraining } from './warehouse-training';

describe('WarehouseTraining', () => {
  let component: WarehouseTraining;
  let fixture: ComponentFixture<WarehouseTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
