import { TestBed } from '@angular/core/testing';

import { InventariosActivosService } from './inventarios-activos.service';

describe('InventariosActivosService', () => {
  let service: InventariosActivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventariosActivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
