import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelEntrenadorPage } from './panel-entrenador.page';

describe('PanelEntrenadorPage', () => {
  let component: PanelEntrenadorPage;
  let fixture: ComponentFixture<PanelEntrenadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelEntrenadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
