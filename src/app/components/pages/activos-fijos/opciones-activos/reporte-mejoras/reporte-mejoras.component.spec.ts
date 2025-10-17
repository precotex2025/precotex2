import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMejorasComponent } from './reporte-mejoras.component';

describe('ReporteMejorasComponent', () => {
  let component: ReporteMejorasComponent;
  let fixture: ComponentFixture<ReporteMejorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMejorasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteMejorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
