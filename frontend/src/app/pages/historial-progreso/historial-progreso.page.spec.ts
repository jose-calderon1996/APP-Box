import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialProgresoPage } from './historial-progreso.page';

describe('HistorialProgresoPage', () => {
  let component: HistorialProgresoPage;
  let fixture: ComponentFixture<HistorialProgresoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialProgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
