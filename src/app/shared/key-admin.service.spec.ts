import { TestBed } from '@angular/core/testing';

import { KeyAdminService } from './key-admin.service';

describe('KeyAdminService', () => {
  let service: KeyAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
