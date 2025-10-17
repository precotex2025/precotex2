import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFamiliaresActivoComponent } from './dialog-familiares-activo.component';

describe('DialogFamiliaresActivoComponent', () => {
  let component: DialogFamiliaresActivoComponent;
  let fixture: ComponentFixture<DialogFamiliaresActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFamiliaresActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFamiliaresActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
