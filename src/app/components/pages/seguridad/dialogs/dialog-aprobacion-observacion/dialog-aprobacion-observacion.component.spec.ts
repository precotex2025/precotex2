import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAprobacionObservacionComponent } from './dialog-aprobacion-observacion.component';

describe('DialogAprobacionObservacionComponent', () => {
  let component: DialogAprobacionObservacionComponent;
  let fixture: ComponentFixture<DialogAprobacionObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAprobacionObservacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAprobacionObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
