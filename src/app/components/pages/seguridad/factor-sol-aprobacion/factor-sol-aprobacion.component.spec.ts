import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorSolAprobacionComponent } from './factor-sol-aprobacion.component';

describe('FactorSolAprobacionComponent', () => {
  let component: FactorSolAprobacionComponent;
  let fixture: ComponentFixture<FactorSolAprobacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorSolAprobacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorSolAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
