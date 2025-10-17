import { TestBed } from '@angular/core/testing';

import { FactorUniformesService } from './factor-uniformes.service';

describe('FactorUniformesService', () => {
  let service: FactorUniformesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorUniformesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
