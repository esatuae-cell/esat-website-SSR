import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpTraining } from './erp-training';

describe('ErpTraining', () => {
  let component: ErpTraining;
  let fixture: ComponentFixture<ErpTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErpTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(ErpTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
