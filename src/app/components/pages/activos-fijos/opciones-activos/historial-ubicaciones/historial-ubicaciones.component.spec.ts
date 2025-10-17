import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialUbicacionesComponent } from './historial-ubicaciones.component';

describe('HistorialUbicacionesComponent', () => {
  let component: HistorialUbicacionesComponent;
  let fixture: ComponentFixture<HistorialUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialUbicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
