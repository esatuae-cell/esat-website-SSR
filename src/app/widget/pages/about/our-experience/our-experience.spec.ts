import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurExperience } from './our-experience';

describe('OurExperience', () => {
  let component: OurExperience;
  let fixture: ComponentFixture<OurExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(OurExperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
