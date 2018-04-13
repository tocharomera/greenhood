import { Component, OnInit } from '@angular/core';
import {
  PedidosVMService,
  PedidosDaoService
} from '../services/pedidos.service';
@Component({
  selector: 'app-pedido-consu',
  templateUrl: './pedido-consu.component.html',
  styleUrls: ['./pedido-consu.component.css']
})
export class PedidoConsuComponent implements OnInit {

  constructor(public ped: PedidosVMService)  { }

  ngOnInit() {
    this.ped.getListadoConsPendiente() ;
  }

}
