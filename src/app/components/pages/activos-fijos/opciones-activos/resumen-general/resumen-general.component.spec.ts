import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenGeneralComponent } from './resumen-general.component';

describe('ResumenGeneralComponent', () => {
  let component: ResumenGeneralComponent;
  let fixture: ComponentFixture<ResumenGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
