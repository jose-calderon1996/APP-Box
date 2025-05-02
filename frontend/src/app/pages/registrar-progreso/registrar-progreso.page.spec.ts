import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarProgresoPage } from './registrar-progreso.page';

describe('RegistrarProgresoPage', () => {
  let component: RegistrarProgresoPage;
  let fixture: ComponentFixture<RegistrarProgresoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarProgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
