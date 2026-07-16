import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YutHone } from './yut-hone';

describe('YutHone', () => {
  let component: YutHone;
  let fixture: ComponentFixture<YutHone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YutHone],
    }).compileComponents();

    fixture = TestBed.createComponent(YutHone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
