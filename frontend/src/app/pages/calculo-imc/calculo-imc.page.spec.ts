import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculoImcPage } from './calculo-imc.page';

describe('CalculoImcPage', () => {
  let component: CalculoImcPage;
  let fixture: ComponentFixture<CalculoImcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoImcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
