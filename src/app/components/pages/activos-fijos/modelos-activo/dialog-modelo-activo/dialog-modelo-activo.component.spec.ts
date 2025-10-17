import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModeloActivoComponent } from './dialog-modelo-activo.component';

describe('DialogModeloActivoComponent', () => {
  let component: DialogModeloActivoComponent;
  let fixture: ComponentFixture<DialogModeloActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModeloActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModeloActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
