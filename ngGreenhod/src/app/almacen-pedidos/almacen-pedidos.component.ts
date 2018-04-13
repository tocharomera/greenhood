import { Component, OnInit } from '@angular/core';
import { PedidosVMService } from '../services/pedidos.service';

@Component({
  selector: 'app-almacen-pedidos',
  templateUrl: './almacen-pedidos.component.html',
  styleUrls: ['./almacen-pedidos.component.css']
})
export class AlmacenPedidosComponent implements OnInit {
  idPed: number;
  constructor( public ped: PedidosVMService) { }

  ngOnInit() {
    this.ped.getListadoProdPendientes();
  }

}
