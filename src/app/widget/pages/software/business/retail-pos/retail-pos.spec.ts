import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailPOS } from './retail-pos';

describe('RetailPOS', () => {
  let component: RetailPOS;
  let fixture: ComponentFixture<RetailPOS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailPOS],
    }).compileComponents();

    fixture = TestBed.createComponent(RetailPOS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
