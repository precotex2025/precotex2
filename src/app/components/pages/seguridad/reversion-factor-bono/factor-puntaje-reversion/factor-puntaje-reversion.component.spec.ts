import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorPuntajeReversionComponent } from './factor-puntaje-reversion.component';

describe('FactorPuntajeReversionComponent', () => {
  let component: FactorPuntajeReversionComponent;
  let fixture: ComponentFixture<FactorPuntajeReversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorPuntajeReversionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorPuntajeReversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
