import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesUniformesAgentesComponent } from './reportes-uniformes-agentes.component';

describe('ReportesUniformesAgentesComponent', () => {
  let component: ReportesUniformesAgentesComponent;
  let fixture: ComponentFixture<ReportesUniformesAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesUniformesAgentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesUniformesAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
