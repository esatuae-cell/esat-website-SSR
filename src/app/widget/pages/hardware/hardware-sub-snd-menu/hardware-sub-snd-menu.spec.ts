import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareSubSndMenu } from './hardware-sub-snd-menu';

describe('HardwareSubSndMenu', () => {
  let component: HardwareSubSndMenu;
  let fixture: ComponentFixture<HardwareSubSndMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwareSubSndMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(HardwareSubSndMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
