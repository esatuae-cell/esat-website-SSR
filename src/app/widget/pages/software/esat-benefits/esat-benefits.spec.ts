import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsatBenefits } from './esat-benefits';

describe('EsatBenefits', () => {
  let component: EsatBenefits;
  let fixture: ComponentFixture<EsatBenefits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsatBenefits],
    }).compileComponents();

    fixture = TestBed.createComponent(EsatBenefits);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
