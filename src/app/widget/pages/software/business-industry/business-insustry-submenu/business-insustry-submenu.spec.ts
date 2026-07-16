import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInsustrySubmenu } from './business-insustry-submenu';

describe('BusinessInsustrySubmenu', () => {
  let component: BusinessInsustrySubmenu;
  let fixture: ComponentFixture<BusinessInsustrySubmenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInsustrySubmenu],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessInsustrySubmenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
