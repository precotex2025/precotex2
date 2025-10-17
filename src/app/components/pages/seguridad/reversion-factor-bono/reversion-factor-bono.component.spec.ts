import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversionFactorBonoComponent } from './reversion-factor-bono.component';

describe('ReversionFactorBonoComponent', () => {
  let component: ReversionFactorBonoComponent;
  let fixture: ComponentFixture<ReversionFactorBonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversionFactorBonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReversionFactorBonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
