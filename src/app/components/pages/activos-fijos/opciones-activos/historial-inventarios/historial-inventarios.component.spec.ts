import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialInventariosComponent } from './historial-inventarios.component';

describe('HistorialInventariosComponent', () => {
  let component: HistorialInventariosComponent;
  let fixture: ComponentFixture<HistorialInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialInventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
