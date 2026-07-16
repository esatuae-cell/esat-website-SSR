import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSubMenu } from './training-sub-menu';

describe('TrainingSubMenu', () => {
  let component: TrainingSubMenu;
  let fixture: ComponentFixture<TrainingSubMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSubMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingSubMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
