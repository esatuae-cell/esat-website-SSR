import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHome } from './support-home';

describe('SupportHome', () => {
  let component: SupportHome;
  let fixture: ComponentFixture<SupportHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportHome],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
