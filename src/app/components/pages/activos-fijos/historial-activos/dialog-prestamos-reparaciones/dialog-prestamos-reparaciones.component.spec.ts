import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrestamosReparacionesComponent } from './dialog-prestamos-reparaciones.component';

describe('DialogPrestamosReparacionesComponent', () => {
  let component: DialogPrestamosReparacionesComponent;
  let fixture: ComponentFixture<DialogPrestamosReparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPrestamosReparacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrestamosReparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
