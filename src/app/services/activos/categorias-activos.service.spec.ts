import { TestBed } from '@angular/core/testing';

import { CategoriasActivosService } from './categorias-activos.service';

describe('CategoriasActivosService', () => {
  let service: CategoriasActivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasActivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
