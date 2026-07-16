import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalSurvilance } from './physical-survilance';

describe('PhysicalSurvilance', () => {
  let component: PhysicalSurvilance;
  let fixture: ComponentFixture<PhysicalSurvilance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalSurvilance],
    }).compileComponents();

    fixture = TestBed.createComponent(PhysicalSurvilance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
