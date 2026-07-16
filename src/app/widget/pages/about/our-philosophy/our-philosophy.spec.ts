import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPhilosophy } from './our-philosophy';

describe('OurPhilosophy', () => {
  let component: OurPhilosophy;
  let fixture: ComponentFixture<OurPhilosophy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurPhilosophy],
    }).compileComponents();

    fixture = TestBed.createComponent(OurPhilosophy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
