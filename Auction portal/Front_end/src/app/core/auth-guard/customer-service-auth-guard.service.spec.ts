import { TestBed } from '@angular/core/testing';

import { CustomerServiceAuthGuardService } from './customer-service-auth-guard.service';

describe('CustomerServiceAuthGuardService', () => {
  let service: CustomerServiceAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerServiceAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
