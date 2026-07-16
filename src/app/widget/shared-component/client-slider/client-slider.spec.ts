import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSlider } from './client-slider';

describe('ClientSlider', () => {
  let component: ClientSlider;
  let fixture: ComponentFixture<ClientSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
