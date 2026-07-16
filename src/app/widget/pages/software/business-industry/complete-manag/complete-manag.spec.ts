import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteManag } from './complete-manag';

describe('CompleteManag', () => {
  let component: CompleteManag;
  let fixture: ComponentFixture<CompleteManag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteManag],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteManag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
