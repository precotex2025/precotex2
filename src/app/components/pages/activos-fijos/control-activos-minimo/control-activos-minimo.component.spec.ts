import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlActivosMinimoComponent } from './control-activos-minimo.component';

describe('ControlActivosMinimoComponent', () => {
  let component: ControlActivosMinimoComponent;
  let fixture: ComponentFixture<ControlActivosMinimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlActivosMinimoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlActivosMinimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
