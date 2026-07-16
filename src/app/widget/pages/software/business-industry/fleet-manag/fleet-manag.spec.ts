import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetManag } from './fleet-manag';

describe('FleetManag', () => {
  let component: FleetManag;
  let fixture: ComponentFixture<FleetManag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetManag],
    }).compileComponents();

    fixture = TestBed.createComponent(FleetManag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
