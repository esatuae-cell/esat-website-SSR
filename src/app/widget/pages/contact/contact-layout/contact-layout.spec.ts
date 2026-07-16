import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLayout } from './contact-layout';

describe('ContactLayout', () => {
  let component: ContactLayout;
  let fixture: ComponentFixture<ContactLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
