import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureErp } from './secure-erp';

describe('SecureErp', () => {
  let component: SecureErp;
  let fixture: ComponentFixture<SecureErp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureErp],
    }).compileComponents();

    fixture = TestBed.createComponent(SecureErp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
