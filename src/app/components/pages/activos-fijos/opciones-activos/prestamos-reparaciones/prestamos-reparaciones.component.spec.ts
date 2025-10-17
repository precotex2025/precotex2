import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosReparacionesComponent } from './prestamos-reparaciones.component';

describe('PrestamosReparacionesComponent', () => {
  let component: PrestamosReparacionesComponent;
  let fixture: ComponentFixture<PrestamosReparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosReparacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosReparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
