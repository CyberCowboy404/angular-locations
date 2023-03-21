import { TestBed } from '@angular/core/testing';

import { ApplicationCommonService } from './application-common.service';

describe('ApplicationCommonService', () => {
  let service: ApplicationCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
