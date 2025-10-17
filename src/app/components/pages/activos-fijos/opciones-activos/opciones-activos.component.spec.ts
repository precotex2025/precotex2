import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesActivosComponent } from './opciones-activos.component';

describe('OpcionesActivosComponent', () => {
  let component: OpcionesActivosComponent;
  let fixture: ComponentFixture<OpcionesActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
