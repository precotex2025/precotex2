import { TestBed } from '@angular/core/testing';

import { BultoHiladoGrupoService } from './bulto-hilado-grupo.service';

describe('BultoHiladoGrupoService', () => {
  let service: BultoHiladoGrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BultoHiladoGrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
