import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleAsistenciaComponent } from './dialog-detalle-asistencia.component';

describe('DialogDetalleAsistenciaComponent', () => {
  let component: DialogDetalleAsistenciaComponent;
  let fixture: ComponentFixture<DialogDetalleAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetalleAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDetalleAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
