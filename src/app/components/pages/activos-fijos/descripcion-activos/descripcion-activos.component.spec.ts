import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionActivosComponent } from './descripcion-activos.component';

describe('DescripcionActivosComponent', () => {
  let component: DescripcionActivosComponent;
  let fixture: ComponentFixture<DescripcionActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescripcionActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
