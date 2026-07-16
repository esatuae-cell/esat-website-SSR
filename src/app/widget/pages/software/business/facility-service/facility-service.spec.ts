import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityService } from './facility-service';

describe('FacilityService', () => {
  let component: FacilityService;
  let fixture: ComponentFixture<FacilityService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityService],
    }).compileComponents();

    fixture = TestBed.createComponent(FacilityService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
