import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolAgentesComponent } from './sol-agentes.component';

describe('SolAgentesComponent', () => {
  let component: SolAgentesComponent;
  let fixture: ComponentFixture<SolAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolAgentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
