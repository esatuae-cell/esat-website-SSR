import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTraining } from './organization-training';

describe('OrganizationTraining', () => {
  let component: OrganizationTraining;
  let fixture: ComponentFixture<OrganizationTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationTraining],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationTraining);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
