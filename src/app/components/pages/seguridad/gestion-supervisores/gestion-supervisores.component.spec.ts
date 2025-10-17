import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSupervisoresComponent } from './gestion-supervisores.component';

describe('GestionSupervisoresComponent', () => {
  let component: GestionSupervisoresComponent;
  let fixture: ComponentFixture<GestionSupervisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSupervisoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
