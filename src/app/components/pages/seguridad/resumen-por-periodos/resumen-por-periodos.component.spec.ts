import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPorPeriodosComponent } from './resumen-por-periodos.component';

describe('ResumenPorPeriodosComponent', () => {
  let component: ResumenPorPeriodosComponent;
  let fixture: ComponentFixture<ResumenPorPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenPorPeriodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenPorPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
