import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTraining } from './inventory-training';

describe('InventoryTraining', () => {
  let component: InventoryTraining;
  let fixture: ComponentFixture<InventoryTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
