import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateManag } from './real-estate-manag';

describe('RealEstateManag', () => {
  let component: RealEstateManag;
  let fixture: ComponentFixture<RealEstateManag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateManag],
    }).compileComponents();

    fixture = TestBed.createComponent(RealEstateManag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
