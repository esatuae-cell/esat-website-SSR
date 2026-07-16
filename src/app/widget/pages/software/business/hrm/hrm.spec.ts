import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hrm } from './hrm';

describe('Hrm', () => {
  let component: Hrm;
  let fixture: ComponentFixture<Hrm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hrm],
    }).compileComponents();

    fixture = TestBed.createComponent(Hrm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
