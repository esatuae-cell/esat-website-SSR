import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingManag } from './manufacturing-manag';

describe('ManufacturingManag', () => {
  let component: ManufacturingManag;
  let fixture: ComponentFixture<ManufacturingManag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingManag],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturingManag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
