import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAsset } from './fixed-asset';

describe('FixedAsset', () => {
  let component: FixedAsset;
  let fixture: ComponentFixture<FixedAsset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedAsset],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedAsset);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
