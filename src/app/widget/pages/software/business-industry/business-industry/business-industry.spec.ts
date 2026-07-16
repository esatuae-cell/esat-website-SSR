import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIndustry } from './business-industry';

describe('BusinessIndustry', () => {
  let component: BusinessIndustry;
  let fixture: ComponentFixture<BusinessIndustry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessIndustry],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessIndustry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
