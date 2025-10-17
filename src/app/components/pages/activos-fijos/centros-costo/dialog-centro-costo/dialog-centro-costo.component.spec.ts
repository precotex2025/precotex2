import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCentroCostoComponent } from './dialog-centro-costo.component';

describe('DialogCentroCostoComponent', () => {
  let component: DialogCentroCostoComponent;
  let fixture: ComponentFixture<DialogCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCentroCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
