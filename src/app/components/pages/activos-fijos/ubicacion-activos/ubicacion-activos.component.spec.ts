import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionActivosComponent } from './ubicacion-activos.component';

describe('UbicacionActivosComponent', () => {
  let component: UbicacionActivosComponent;
  let fixture: ComponentFixture<UbicacionActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicacionActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
