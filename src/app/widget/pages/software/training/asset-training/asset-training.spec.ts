import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTraining } from './asset-training';

describe('AssetTraining', () => {
  let component: AssetTraining;
  let fixture: ComponentFixture<AssetTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
