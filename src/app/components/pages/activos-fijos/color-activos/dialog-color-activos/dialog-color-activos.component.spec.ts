import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColorActivosComponent } from './dialog-color-activos.component';

describe('DialogColorActivosComponent', () => {
  let component: DialogColorActivosComponent;
  let fixture: ComponentFixture<DialogColorActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogColorActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogColorActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
