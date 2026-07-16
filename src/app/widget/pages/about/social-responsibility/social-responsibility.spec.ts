import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialResponsibility } from './social-responsibility';

describe('SocialResponsibility', () => {
  let component: SocialResponsibility;
  let fixture: ComponentFixture<SocialResponsibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialResponsibility],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialResponsibility);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
