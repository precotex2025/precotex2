import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionBultoConsultaComponent } from './ubicacion-bulto-consulta.component';

describe('UbicacionBultoConsultaComponent', () => {
  let component: UbicacionBultoConsultaComponent;
  let fixture: ComponentFixture<UbicacionBultoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionBultoConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicacionBultoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
