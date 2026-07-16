import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureSliderHome } from './infrastructure-slider-home';

describe('InfrastructureSliderHome', () => {
  let component: InfrastructureSliderHome;
  let fixture: ComponentFixture<InfrastructureSliderHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfrastructureSliderHome],
    }).compileComponents();

    fixture = TestBed.createComponent(InfrastructureSliderHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
