import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportNav } from './support-nav';

describe('SupportNav', () => {
  let component: SupportNav;
  let fixture: ComponentFixture<SupportNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportNav],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
