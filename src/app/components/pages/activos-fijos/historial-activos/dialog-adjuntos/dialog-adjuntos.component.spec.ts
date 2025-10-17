import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdjuntosComponent } from './dialog-adjuntos.component';

describe('DialogAdjuntosComponent', () => {
  let component: DialogAdjuntosComponent;
  let fixture: ComponentFixture<DialogAdjuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdjuntosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAdjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
