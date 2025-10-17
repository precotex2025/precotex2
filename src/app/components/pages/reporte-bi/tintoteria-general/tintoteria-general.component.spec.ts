import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TintoteriaGeneralComponent } from './tintoteria-general.component';

describe('TintoteriaGeneralComponent', () => {
  let component: TintoteriaGeneralComponent;
  let fixture: ComponentFixture<TintoteriaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TintoteriaGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TintoteriaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
