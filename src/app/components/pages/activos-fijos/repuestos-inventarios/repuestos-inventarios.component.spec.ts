import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepuestosInventariosComponent } from './repuestos-inventarios.component';

describe('RepuestosInventariosComponent', () => {
  let component: RepuestosInventariosComponent;
  let fixture: ComponentFixture<RepuestosInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepuestosInventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepuestosInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
