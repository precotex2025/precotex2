import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUbicacionActivosComponent } from './dialog-ubicacion-activos.component';

describe('DialogUbicacionActivosComponent', () => {
  let component: DialogUbicacionActivosComponent;
  let fixture: ComponentFixture<DialogUbicacionActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUbicacionActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUbicacionActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
