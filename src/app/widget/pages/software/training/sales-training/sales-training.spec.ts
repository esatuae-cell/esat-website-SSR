import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTraining } from './sales-training';

describe('SalesTraining', () => {
  let component: SalesTraining;
  let fixture: ComponentFixture<SalesTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
