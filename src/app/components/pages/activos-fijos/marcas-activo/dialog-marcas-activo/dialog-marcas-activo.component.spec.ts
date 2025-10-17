import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMarcasActivoComponent } from './dialog-marcas-activo.component';

describe('DialogMarcasActivoComponent', () => {
  let component: DialogMarcasActivoComponent;
  let fixture: ComponentFixture<DialogMarcasActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMarcasActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMarcasActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
