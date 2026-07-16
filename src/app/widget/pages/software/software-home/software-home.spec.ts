import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareHome } from './software-home';

describe('SoftwareHome', () => {
  let component: SoftwareHome;
  let fixture: ComponentFixture<SoftwareHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareHome],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
