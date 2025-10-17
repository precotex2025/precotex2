import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaActivosComponent } from './baja-activos.component';

describe('BajaActivosComponent', () => {
  let component: BajaActivosComponent;
  let fixture: ComponentFixture<BajaActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
