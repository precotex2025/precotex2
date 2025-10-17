import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistorialUbicacionesComponent } from './dialog-historial-ubicaciones.component';

describe('DialogHistorialUbicacionesComponent', () => {
  let component: DialogHistorialUbicacionesComponent;
  let fixture: ComponentFixture<DialogHistorialUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHistorialUbicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHistorialUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
