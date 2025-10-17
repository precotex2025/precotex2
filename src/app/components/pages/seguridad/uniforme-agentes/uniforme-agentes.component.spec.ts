import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformeAgentesComponent } from './uniforme-agentes.component';

describe('UniformeAgentesComponent', () => {
  let component: UniformeAgentesComponent;
  let fixture: ComponentFixture<UniformeAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformeAgentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniformeAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
