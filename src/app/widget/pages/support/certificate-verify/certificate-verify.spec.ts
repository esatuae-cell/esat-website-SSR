import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateVerify } from './certificate-verify';

describe('CertificateVerify', () => {
  let component: CertificateVerify;
  let fixture: ComponentFixture<CertificateVerify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateVerify],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificateVerify);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
