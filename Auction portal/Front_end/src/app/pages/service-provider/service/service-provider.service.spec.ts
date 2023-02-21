import { TestBed } from '@angular/core/testing';

import { ServicerProviderService } from './service-provider.service';

describe('ServicerProviderService', () => {
  let service: ServicerProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
