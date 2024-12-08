import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeRecepcionComponent } from './informe-recepcion.component';

describe('InformeRecepcionComponent', () => {
  let component: InformeRecepcionComponent;
  let fixture: ComponentFixture<InformeRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeRecepcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
