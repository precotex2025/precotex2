import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolSupervisoresComponent } from './sol-supervisores.component';

describe('SolSupervisoresComponent', () => {
  let component: SolSupervisoresComponent;
  let fixture: ComponentFixture<SolSupervisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolSupervisoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
