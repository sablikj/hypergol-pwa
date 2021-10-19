import { TestBed } from '@angular/core/testing';

import { LaunchApiService } from './launch-api.service';

describe('LaunchApiService', () => {
  let service: LaunchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
