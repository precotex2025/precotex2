import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosCostoComponent } from './centros-costo.component';

describe('CentrosCostoComponent', () => {
  let component: CentrosCostoComponent;
  let fixture: ComponentFixture<CentrosCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentrosCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrosCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
