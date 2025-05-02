import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelClientePage } from './panel-cliente.page';

describe('PanelClientePage', () => {
  let component: PanelClientePage;
  let fixture: ComponentFixture<PanelClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
