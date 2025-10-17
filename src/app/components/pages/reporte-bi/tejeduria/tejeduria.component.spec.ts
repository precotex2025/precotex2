import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TejeduriaComponent } from './tejeduria.component';

describe('TejeduriaComponent', () => {
  let component: TejeduriaComponent;
  let fixture: ComponentFixture<TejeduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TejeduriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TejeduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
