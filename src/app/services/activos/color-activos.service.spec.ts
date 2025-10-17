import { TestBed } from '@angular/core/testing';

import { ColorActivosService } from './color-activos.service';

describe('ColorActivosService', () => {
  let service: ColorActivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorActivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
