import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorGestionAprobacionComponent } from './factor-gestion-aprobacion.component';

describe('FactorGestionAprobacionComponent', () => {
  let component: FactorGestionAprobacionComponent;
  let fixture: ComponentFixture<FactorGestionAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorGestionAprobacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorGestionAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
