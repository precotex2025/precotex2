import { TestBed } from '@angular/core/testing';

import { InventarioRepuestoService } from './inventario-repuesto.service';

describe('InventarioRepuestoService', () => {
  let service: InventarioRepuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioRepuestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
