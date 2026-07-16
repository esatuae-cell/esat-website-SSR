import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersLoad } from './careers-load';

describe('CareersLoad', () => {
  let component: CareersLoad;
  let fixture: ComponentFixture<CareersLoad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareersLoad],
    }).compileComponents();

    fixture = TestBed.createComponent(CareersLoad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
