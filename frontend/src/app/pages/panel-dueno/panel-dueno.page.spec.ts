import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelDuenoPage } from './panel-dueno.page';

describe('PanelDuenoPage', () => {
  let component: PanelDuenoPage;
  let fixture: ComponentFixture<PanelDuenoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDuenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
