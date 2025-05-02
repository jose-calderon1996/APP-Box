import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroEntrenadorPage } from './registro-entrenador.page';

describe('RegistroEntrenadorPage', () => {
  let component: RegistroEntrenadorPage;
  let fixture: ComponentFixture<RegistroEntrenadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEntrenadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
