import { TestBed } from '@angular/core/testing';

import { CtrolInventarioHiloTejeduriaService } from '../Tejeduria/ctrol-inventario-hilo-tejeduria.service';

describe('CtrolInventarioHiloTejeduriaService', () => {
  let service: CtrolInventarioHiloTejeduriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtrolInventarioHiloTejeduriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
