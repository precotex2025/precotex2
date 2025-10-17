import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClaseActivosComponent } from './dialog-clase-activos.component';

describe('DialogClaseActivosComponent', () => {
  let component: DialogClaseActivosComponent;
  let fixture: ComponentFixture<DialogClaseActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClaseActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogClaseActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
