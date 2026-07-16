import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareHome } from './hardware-home';

describe('HardwareHome', () => {
  let component: HardwareHome;
  let fixture: ComponentFixture<HardwareHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwareHome],
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
