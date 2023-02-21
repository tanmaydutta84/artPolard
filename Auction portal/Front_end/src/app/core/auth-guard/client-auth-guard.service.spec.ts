import { TestBed } from '@angular/core/testing';

import { ClientAuthGuardService } from './client-auth-guard.service';

describe('ClientAuthGuardService', () => {
  let service: ClientAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
