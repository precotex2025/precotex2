import { TestBed } from '@angular/core/testing';

import { FactorAsistenciasService } from './factor-asistencias.service';

describe('FactorAsistenciasService', () => {
  let service: FactorAsistenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorAsistenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
