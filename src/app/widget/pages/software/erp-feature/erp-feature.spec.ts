import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpFeature } from './erp-feature';

describe('ErpFeature', () => {
  let component: ErpFeature;
  let fixture: ComponentFixture<ErpFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ErpFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
