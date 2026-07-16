import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHomeLayout } from './business-home-layout';

describe('BusinessHomeLayout', () => {
  let component: BusinessHomeLayout;
  let fixture: ComponentFixture<BusinessHomeLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessHomeLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHomeLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
