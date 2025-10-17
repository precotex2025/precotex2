import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorSedeCentroComponent } from './valor-sede-centro.component';

describe('ValorSedeCentroComponent', () => {
  let component: ValorSedeCentroComponent;
  let fixture: ComponentFixture<ValorSedeCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorSedeCentroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorSedeCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
