import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarResponsableComponent } from './asignar-responsable.component';

describe('AsignarResponsableComponent', () => {
  let component: AsignarResponsableComponent;
  let fixture: ComponentFixture<AsignarResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarResponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
