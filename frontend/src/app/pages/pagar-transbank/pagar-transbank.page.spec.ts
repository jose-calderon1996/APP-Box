import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagarTransbankPage } from './pagar-transbank.page';

describe('PagarTransbankPage', () => {
  let component: PagarTransbankPage;
  let fixture: ComponentFixture<PagarTransbankPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarTransbankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
