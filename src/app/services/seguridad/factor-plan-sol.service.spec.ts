import { TestBed } from '@angular/core/testing';

import { FactorPlanSolService } from './factor-plan-sol.service';

describe('FactorPlanSolService', () => {
  let service: FactorPlanSolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorPlanSolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
