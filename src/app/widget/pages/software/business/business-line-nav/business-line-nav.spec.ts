import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLineNav } from './business-line-nav';

describe('BusinessLineNav', () => {
  let component: BusinessLineNav;
  let fixture: ComponentFixture<BusinessLineNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessLineNav],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessLineNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
