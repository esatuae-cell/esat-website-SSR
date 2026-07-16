import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityManag } from './facility-manag';

describe('FacilityManag', () => {
  let component: FacilityManag;
  let fixture: ComponentFixture<FacilityManag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityManag],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilityManag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
