import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Retail } from './retail';

describe('Retail', () => {
  let component: Retail;
  let fixture: ComponentFixture<Retail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Retail],
    }).compileComponents();

    fixture = TestBed.createComponent(Retail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
