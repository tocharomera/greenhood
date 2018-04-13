import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoConsuComponent } from './pedido-consu.component';

describe('PedidoConsuComponent', () => {
  let component: PedidoConsuComponent;
  let fixture: ComponentFixture<PedidoConsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoConsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoConsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
