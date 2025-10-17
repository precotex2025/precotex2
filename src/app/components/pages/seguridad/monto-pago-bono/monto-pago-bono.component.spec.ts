import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoPagoBonoComponent } from './monto-pago-bono.component';

describe('MontoPagoBonoComponent', () => {
  let component: MontoPagoBonoComponent;
  let fixture: ComponentFixture<MontoPagoBonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontoPagoBonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontoPagoBonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
