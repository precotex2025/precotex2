import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDepreciacionActivoComponent } from './dialog-depreciacion-activo.component';

describe('DialogDepreciacionActivoComponent', () => {
  let component: DialogDepreciacionActivoComponent;
  let fixture: ComponentFixture<DialogDepreciacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDepreciacionActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDepreciacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
