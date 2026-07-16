import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cmms } from './cmms';

describe('Cmms', () => {
  let component: Cmms;
  let fixture: ComponentFixture<Cmms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cmms],
    }).compileComponents();

    fixture = TestBed.createComponent(Cmms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
