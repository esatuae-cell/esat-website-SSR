import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareLayout } from './hardware-layout';

describe('HardwareLayout', () => {
  let component: HardwareLayout;
  let fixture: ComponentFixture<HardwareLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwareLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
