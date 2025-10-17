import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlActivosComponent } from './control-activos.component';

describe('ControlActivosComponent', () => {
  let component: ControlActivosComponent;
  let fixture: ComponentFixture<ControlActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
