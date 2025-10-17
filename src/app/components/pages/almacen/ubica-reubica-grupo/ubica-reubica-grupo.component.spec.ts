import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicaReubicaGrupoComponent } from './ubica-reubica-grupo.component';

describe('UbicaReubicaGrupoComponent', () => {
  let component: UbicaReubicaGrupoComponent;
  let fixture: ComponentFixture<UbicaReubicaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicaReubicaGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicaReubicaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
