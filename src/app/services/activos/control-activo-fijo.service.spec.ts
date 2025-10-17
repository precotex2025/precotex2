import { TestBed } from '@angular/core/testing';

import { ControlActivoFijoService } from './control-activo-fijo.service';

describe('ControlActivoFijoService', () => {
  let service: ControlActivoFijoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlActivoFijoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
