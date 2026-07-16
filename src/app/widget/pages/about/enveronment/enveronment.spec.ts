import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enveronment } from './enveronment';

describe('Enveronment', () => {
  let component: Enveronment;
  let fixture: ComponentFixture<Enveronment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enveronment],
    }).compileComponents();

    fixture = TestBed.createComponent(Enveronment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
