import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlActivosInventarioComponent } from './control-activos-inventario.component';

describe('ControlActivosInventarioComponent', () => {
  let component: ControlActivosInventarioComponent;
  let fixture: ComponentFixture<ControlActivosInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlActivosInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlActivosInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
