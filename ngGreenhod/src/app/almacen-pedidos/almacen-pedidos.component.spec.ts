import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenPedidosComponent } from './almacen-pedidos.component';

describe('AlmacenPedidosComponent', () => {
  let component: AlmacenPedidosComponent;
  let fixture: ComponentFixture<AlmacenPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
