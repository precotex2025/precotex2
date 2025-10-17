import { TestBed } from '@angular/core/testing';

import { FactorGestionService } from './factor-gestion.service';

describe('FactorGestionService', () => {
  let service: FactorGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
