import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGestionInventarioComponent } from './dialog-gestion-inventario.component';

describe('DialogGestionInventarioComponent', () => {
  let component: DialogGestionInventarioComponent;
  let fixture: ComponentFixture<DialogGestionInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGestionInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGestionInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
