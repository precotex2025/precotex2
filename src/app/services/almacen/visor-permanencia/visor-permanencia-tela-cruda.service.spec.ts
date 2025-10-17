import { TestBed } from '@angular/core/testing';

import { VisorPermanenciaTelaCrudaService } from './visor-permanencia-tela-cruda.service';

describe('VisorPermanenciaTelaCrudaService', () => {
  let service: VisorPermanenciaTelaCrudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisorPermanenciaTelaCrudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
