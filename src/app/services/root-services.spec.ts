import { TestBed } from '@angular/core/testing';

import { RootServices } from './root-services';

describe('RootServices', () => {
  let service: RootServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
