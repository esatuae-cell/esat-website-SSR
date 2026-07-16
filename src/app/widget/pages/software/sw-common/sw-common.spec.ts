import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwCommon } from './sw-common';

describe('SwCommon', () => {
  let component: SwCommon;
  let fixture: ComponentFixture<SwCommon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwCommon],
    }).compileComponents();

    fixture = TestBed.createComponent(SwCommon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
