import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDuenoPage } from './registro-dueno.page';

describe('RegistroDuenoPage', () => {
  let component: RegistroDuenoPage;
  let fixture: ComponentFixture<RegistroDuenoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDuenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
