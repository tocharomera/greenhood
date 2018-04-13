import { Component, OnInit, Input } from '@angular/core';
import { PedidosVMService } from '../services/pedidos.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  cantidadPedida: number = 0;
  errMsg = '';
  @Input('producto') producto: any;

  constructor(public ped: PedidosVMService, public auth: AuthService) { }

  ngOnInit() {
  }

  generaPedido() {
    this.ped.add(
      this.producto.nombre,
      this.producto.idProductor,
      this.producto.Producto,
      this.producto.Categoria,
      this.cantidadPedida,
      this.producto.Precio,
      this.producto.id,
      this.producto.Cantidad
    );
    // this.ped.add(
    //   this.vmAlm.nombre,
    //   this.vmAlm.idProductor,
    //   this.vmAlm.Producto,
    //   this.vmAlm.Categoría,
    //   this.vmAlm.Cantidad,
    //   this.vmAlm.Precio,
    //   this.vmAlm.id,
    //   this.vmAlm.Cantidad,
    // );
    console.log('PRUEBA');
  }

}
