import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciacionActivoComponent } from './depreciacion-activo.component';

describe('DepreciacionActivoComponent', () => {
  let component: DepreciacionActivoComponent;
  let fixture: ComponentFixture<DepreciacionActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciacionActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepreciacionActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
