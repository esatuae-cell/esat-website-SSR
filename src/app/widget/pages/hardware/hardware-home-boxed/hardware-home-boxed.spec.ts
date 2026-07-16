import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareHomeBoxed } from './hardware-home-boxed';

describe('HardwareHomeBoxed', () => {
  let component: HardwareHomeBoxed;
  let fixture: ComponentFixture<HardwareHomeBoxed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwareHomeBoxed],
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareHomeBoxed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
