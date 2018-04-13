import { Component, OnInit } from '@angular/core';
import {
  PedidosVMService,
  PedidosDaoService
} from '../services/pedidos.service';

@Component({
  selector: 'app-recibidos-consu',
  templateUrl: './recibidos-consu.component.html',
  styleUrls: ['./recibidos-consu.component.css']
})
export class RecibidosConsuComponent implements OnInit {

  constructor(
    public ped: PedidosVMService) { }

  ngOnInit() {
    this.ped.getListadoConsRecibido();
  }

}
