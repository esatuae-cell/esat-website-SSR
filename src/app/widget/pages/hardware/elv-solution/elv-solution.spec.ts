import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElvSolution } from './elv-solution';

describe('ElvSolution', () => {
  let component: ElvSolution;
  let fixture: ComponentFixture<ElvSolution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElvSolution],
    }).compileComponents();

    fixture = TestBed.createComponent(ElvSolution);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
