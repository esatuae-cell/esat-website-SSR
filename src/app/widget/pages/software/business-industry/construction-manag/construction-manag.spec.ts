import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionManag } from './construction-manag';

describe('ConstructionManag', () => {
  let component: ConstructionManag;
  let fixture: ComponentFixture<ConstructionManag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionManag],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionManag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
