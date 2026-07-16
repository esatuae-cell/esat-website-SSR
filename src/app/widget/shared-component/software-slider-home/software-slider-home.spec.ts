import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSliderHome } from './software-slider-home';

describe('SoftwareSliderHome', () => {
  let component: SoftwareSliderHome;
  let fixture: ComponentFixture<SoftwareSliderHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareSliderHome],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareSliderHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
