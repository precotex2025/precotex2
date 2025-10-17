import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformesSupervisoresComponent } from './uniformes-supervisores.component';

describe('UniformesSupervisoresComponent', () => {
  let component: UniformesSupervisoresComponent;
  let fixture: ComponentFixture<UniformesSupervisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniformesSupervisoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniformesSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
