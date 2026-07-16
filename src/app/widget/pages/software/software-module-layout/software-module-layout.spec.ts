import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareModuleLayout } from './software-module-layout';

describe('SoftwareModuleLayout', () => {
  let component: SoftwareModuleLayout;
  let fixture: ComponentFixture<SoftwareModuleLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareModuleLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftwareModuleLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
