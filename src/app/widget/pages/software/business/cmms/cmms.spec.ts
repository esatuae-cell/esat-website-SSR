import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMMS } from './cmms';

describe('CMMS', () => {
  let component: CMMS;
  let fixture: ComponentFixture<CMMS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMMS],
    }).compileComponents();

    fixture = TestBed.createComponent(CMMS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
