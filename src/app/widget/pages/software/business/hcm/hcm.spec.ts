import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hcm } from './hcm';

describe('Hcm', () => {
  let component: Hcm;
  let fixture: ComponentFixture<Hcm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hcm],
    }).compileComponents();

    fixture = TestBed.createComponent(Hcm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
