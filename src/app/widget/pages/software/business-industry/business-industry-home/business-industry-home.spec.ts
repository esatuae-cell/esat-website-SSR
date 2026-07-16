import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIndustryHome } from './business-industry-home';

describe('BusinessIndustryHome', () => {
  let component: BusinessIndustryHome;
  let fixture: ComponentFixture<BusinessIndustryHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessIndustryHome],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessIndustryHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
