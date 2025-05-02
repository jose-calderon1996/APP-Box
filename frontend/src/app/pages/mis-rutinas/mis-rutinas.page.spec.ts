import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisRutinasPage } from './mis-rutinas.page';

describe('MisRutinasPage', () => {
  let component: MisRutinasPage;
  let fixture: ComponentFixture<MisRutinasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRutinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
