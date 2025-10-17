import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialActivosComponent } from './historial-activos.component';

describe('HistorialActivosComponent', () => {
  let component: HistorialActivosComponent;
  let fixture: ComponentFixture<HistorialActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
