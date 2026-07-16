import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipForm } from './partnership-form';

describe('PartnershipForm', () => {
  let component: PartnershipForm;
  let fixture: ComponentFixture<PartnershipForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnershipForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnershipForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
