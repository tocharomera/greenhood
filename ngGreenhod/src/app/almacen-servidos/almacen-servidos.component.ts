import { Component, OnInit } from '@angular/core';
import {
  PedidosVMService,
  PedidosDaoService
} from '../services/pedidos.service';
@Component({
  selector: 'app-almacen-servidos',
  templateUrl: './almacen-servidos.component.html',
  styleUrls: ['./almacen-servidos.component.css']
})
export class AlmacenServidosComponent implements OnInit {
  constructor(public ped: PedidosVMService) {}

  ngOnInit() {
    this.ped.getListadoProdSuministrado();
  }
}
