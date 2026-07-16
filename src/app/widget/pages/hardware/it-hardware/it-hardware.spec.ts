import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItHardware } from './it-hardware';

describe('ItHardware', () => {
  let component: ItHardware;
  let fixture: ComponentFixture<ItHardware>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItHardware],
    }).compileComponents();

    fixture = TestBed.createComponent(ItHardware);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
