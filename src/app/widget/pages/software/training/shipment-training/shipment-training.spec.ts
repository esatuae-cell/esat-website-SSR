import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentTraining } from './shipment-training';

describe('ShipmentTraining', () => {
  let component: ShipmentTraining;
  let fixture: ComponentFixture<ShipmentTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
