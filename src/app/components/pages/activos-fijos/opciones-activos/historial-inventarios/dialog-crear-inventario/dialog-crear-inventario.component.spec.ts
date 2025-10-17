import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearInventarioComponent } from './dialog-crear-inventario.component';

describe('DialogCrearInventarioComponent', () => {
  let component: DialogCrearInventarioComponent;
  let fixture: ComponentFixture<DialogCrearInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCrearInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCrearInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
