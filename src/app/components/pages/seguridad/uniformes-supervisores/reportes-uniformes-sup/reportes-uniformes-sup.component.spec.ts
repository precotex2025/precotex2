import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesUniformesSupComponent } from './reportes-uniformes-sup.component';

describe('ReportesUniformesSupComponent', () => {
  let component: ReportesUniformesSupComponent;
  let fixture: ComponentFixture<ReportesUniformesSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesUniformesSupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesUniformesSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
