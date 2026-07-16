import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmmsTraining } from './cmms-training';

describe('CmmsTraining', () => {
  let component: CmmsTraining;
  let fixture: ComponentFixture<CmmsTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmmsTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(CmmsTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
