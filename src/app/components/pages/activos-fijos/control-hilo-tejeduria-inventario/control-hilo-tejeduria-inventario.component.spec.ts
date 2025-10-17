import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHiloTejeduriaInventarioComponent } from './control-hilo-tejeduria-inventario.component';

describe('ControlHiloTejeduriaInventarioComponent', () => {
  let component: ControlHiloTejeduriaInventarioComponent;
  let fixture: ComponentFixture<ControlHiloTejeduriaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlHiloTejeduriaInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlHiloTejeduriaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
