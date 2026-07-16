import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailTraining } from './retail-training';

describe('RetailTraining', () => {
  let component: RetailTraining;
  let fixture: ComponentFixture<RetailTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(RetailTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
