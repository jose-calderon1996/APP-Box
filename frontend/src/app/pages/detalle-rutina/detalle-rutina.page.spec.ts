import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleRutinaPage } from './detalle-rutina.page';

describe('DetalleRutinaPage', () => {
  let component: DetalleRutinaPage;
  let fixture: ComponentFixture<DetalleRutinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
