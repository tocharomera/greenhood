import { TestBed, inject } from '@angular/core/testing';

import { PedidosDaoService } from './pedidos.service';

describe('PedidosDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PedidosDaoService]
    });
  });

  it('should be created', inject([PedidosDaoService], (service: PedidosDaoService) => {
    expect(service).toBeTruthy();
  }));
});
