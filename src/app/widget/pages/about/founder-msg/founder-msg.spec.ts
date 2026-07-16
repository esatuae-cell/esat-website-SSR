import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderMsg } from './founder-msg';

describe('FounderMsg', () => {
  let component: FounderMsg;
  let fixture: ComponentFixture<FounderMsg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FounderMsg],
    }).compileComponents();

    fixture = TestBed.createComponent(FounderMsg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
