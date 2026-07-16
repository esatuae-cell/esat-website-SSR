import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportLayout } from './support-layout';

describe('SupportLayout', () => {
  let component: SupportLayout;
  let fixture: ComponentFixture<SupportLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
