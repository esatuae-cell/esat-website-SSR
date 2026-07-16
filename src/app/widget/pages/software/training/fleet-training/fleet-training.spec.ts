import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetTraining } from './fleet-training';

describe('FleetTraining', () => {
  let component: FleetTraining;
  let fixture: ComponentFixture<FleetTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
