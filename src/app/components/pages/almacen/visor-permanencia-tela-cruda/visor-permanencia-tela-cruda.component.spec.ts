import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorPermanenciaTelaCrudaComponent } from './visor-permanencia-tela-cruda.component';

describe('VisorPermanenciaTelaCrudaComponent', () => {
  let component: VisorPermanenciaTelaCrudaComponent;
  let fixture: ComponentFixture<VisorPermanenciaTelaCrudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorPermanenciaTelaCrudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorPermanenciaTelaCrudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
