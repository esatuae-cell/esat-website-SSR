import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusnessHome } from './busness-home';

describe('BusnessHome', () => {
  let component: BusnessHome;
  let fixture: ComponentFixture<BusnessHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusnessHome],
    }).compileComponents();

    fixture = TestBed.createComponent(BusnessHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
