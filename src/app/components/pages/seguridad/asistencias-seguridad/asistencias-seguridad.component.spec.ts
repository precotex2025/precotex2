import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasSeguridadComponent } from './asistencias-seguridad.component';

describe('AsistenciasSeguridadComponent', () => {
  let component: AsistenciasSeguridadComponent;
  let fixture: ComponentFixture<AsistenciasSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciasSeguridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciasSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
