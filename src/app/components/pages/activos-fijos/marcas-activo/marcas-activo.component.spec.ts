import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasActivoComponent } from './marcas-activo.component';

describe('MarcasActivoComponent', () => {
  let component: MarcasActivoComponent;
  let fixture: ComponentFixture<MarcasActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcasActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcasActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
