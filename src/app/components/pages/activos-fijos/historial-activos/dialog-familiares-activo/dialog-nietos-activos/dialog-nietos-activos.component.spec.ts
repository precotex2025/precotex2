import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNietosActivosComponent } from './dialog-nietos-activos.component';

describe('DialogNietosActivosComponent', () => {
  let component: DialogNietosActivosComponent;
  let fixture: ComponentFixture<DialogNietosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNietosActivosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNietosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
