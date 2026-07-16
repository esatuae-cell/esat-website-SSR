import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSubMenu } from './contact-sub-menu';

describe('ContactSubMenu', () => {
  let component: ContactSubMenu;
  let fixture: ComponentFixture<ContactSubMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSubMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSubMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
