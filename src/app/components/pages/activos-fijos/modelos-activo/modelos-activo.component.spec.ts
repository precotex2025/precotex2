import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelosActivoComponent } from './modelos-activo.component';

describe('ModelosActivoComponent', () => {
  let component: ModelosActivoComponent;
  let fixture: ComponentFixture<ModelosActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelosActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelosActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
