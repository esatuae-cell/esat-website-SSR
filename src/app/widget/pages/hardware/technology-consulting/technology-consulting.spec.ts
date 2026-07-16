import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyConsulting } from './technology-consulting';

describe('TechnologyConsulting', () => {
  let component: TechnologyConsulting;
  let fixture: ComponentFixture<TechnologyConsulting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyConsulting],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyConsulting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
