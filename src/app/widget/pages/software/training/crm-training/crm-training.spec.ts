import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTraining } from './crm-training';

describe('CrmTraining', () => {
  let component: CrmTraining;
  let fixture: ComponentFixture<CrmTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(CrmTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
