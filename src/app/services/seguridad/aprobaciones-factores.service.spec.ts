import { TestBed } from '@angular/core/testing';

import { AprobacionesFactoresService } from './aprobaciones-factores.service';

describe('AprobacionesFactoresService', () => {
  let service: AprobacionesFactoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AprobacionesFactoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
