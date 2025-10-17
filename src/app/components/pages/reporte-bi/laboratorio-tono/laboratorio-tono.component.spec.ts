import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioTonoComponent } from './laboratorio-tono.component';

describe('LaboratorioTonoComponent', () => {
  let component: LaboratorioTonoComponent;
  let fixture: ComponentFixture<LaboratorioTonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratorioTonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratorioTonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
