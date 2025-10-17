import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatosDiversosComponent } from './formatos-diversos.component';

describe('FormatosDiversosComponent', () => {
  let component: FormatosDiversosComponent;
  let fixture: ComponentFixture<FormatosDiversosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatosDiversosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatosDiversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
