import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../my-core';
import { PopupService } from './popup.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {
  AlmacenDAOService,
  AlmacenVMService
} from '../almacen/almacen.service';

@Injectable()
export class PedidosDaoService {
  protected baseUrl = environment.WSURL + 'pedidos';
  protected options = { withCredentials: true };

  constructor(private http: HttpClient) {}

  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
  get(id: number) {
    return this.http.get(this.baseUrl + '/' + id, this.options);
  }
  add(item: any) {
    return this.http.post(this.baseUrl, item, this.options);
  }
  change(item: any) {
    return this.http.put(this.baseUrl, item, this.options);
  }
  remove(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, this.options);
  }
  replace(id: number, item: any) {
    return this.http.patch(this.baseUrl + '/' + id, item, this.options);
  }
  search(param: string): Observable<any> {
    return this.http.get(this.baseUrl + '?' + param, this.options);
  }
}

@Injectable()
export class PedidosVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado = [];
  private listadoPendiente = [];
  private listadoSuministrado = [];
  private listadoProductosProd = [];
  private elemento = {};
  private idOriginal = null;
  protected pk = 'id';
  protected urlList = '/datos';

  constructor(
    private logger: LoggerService,
    private popup: PopupService,
    private dao: PedidosDaoService,
    private router: Router,
    private auth: AuthService,
    private vmAlmacen: AlmacenVMService
  ) {}

  get Modo() {
    return this.modo;
  }
  get Listado() {
    return this.listado;
  }
  get ListadoPendiente() {
    return this.listadoPendiente;
  }
  get ListadoSuministrado() {
    return this.listadoSuministrado;
  }
  get ListadoProductosProd() {
    return this.listadoProductosProd;
  }
  get Elemento() {
    return this.elemento;
  }

  // ALMACEN PEDIDOS
  getListadoProdPendientes() {
    this.dao
      .search(`emailproduc=${this.auth.IdUsuario}&servido=false`)
      .subscribe(
        datos => {
          this.listadoPendiente = datos;
          this.modo = 'list';
        },
        err => {
          this.popup.add(err.message);
        }
      );
  }

  // ALMACEN SERVIDOS
  getListadoProdSuministrado() {
    this.dao
      .search(`emailproduc=${this.auth.IdUsuario}&servido=true`)
      .subscribe(
        datos => {
          this.listadoSuministrado = datos;
          this.modo = 'list';
        },
        err => {
          this.popup.add(err.message);
        }
      );
  }

  // PERFIL PEDIDOS
  getListadoConsPendiente() {
    this.dao
      .search(`emailconsu=${this.auth.IdUsuario}&recibido=false`)
      .subscribe(
        datos => {
          this.listadoPendiente = datos;
          this.modo = 'list';
        },
        err => {
          this.popup.add(err.message);
        }
      );
  }

  // PEFIL RECIBIDOS
  getListadoConsRecibido() {
    this.dao
      .search(`emailconsu=${this.auth.IdUsuario}&recibido=true`)
      .subscribe(
        datos => {
          this.listadoSuministrado = datos;
          this.modo = 'list';
        },
        err => {
          this.popup.add(err.message);
        }
      );
  }

  // FICHA PRODUCTOR
  listProductosProd(param) {
    this.vmAlmacen.listProductor(param);
  }

  list() {
    this.dao.query().subscribe(
      datos => {
        this.listado = datos;
        this.modo = 'list';
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  // BOTON SERVIDO
  servido(id) {
    this.dao.replace(id, { servido: 'true' }).subscribe(data => {
      this.getListadoProdPendientes();
      this.getListadoProdSuministrado();
    });
    console.log('SERVIDO');
  }

  // BOTON RECIBIDO
  recibido(id) {
    this.dao.replace(id, { recibido: 'true' }).subscribe(data => {
      this.getListadoConsPendiente();
      this.getListadoConsRecibido();
    });
  }

  // add
  add(
    nombreproduc,
    emailproduc,
    producto,
    categoría,
    cantidad,
    precio,
    idProducto,
    cantidadOriginal
  ) {
    const date = new Date();
    // Hours part from the timestamp
    let days: any = date.getDay();
    if (days.toString.length === 1) {
      days = '0' + days; //Esto es un string y se lo asignas despues a un number
    }
    // Minutes part from the timestamp
<<<<<<< HEAD
    let month = date.getMonth();
=======
    let month: any = date.getMonth();
>>>>>>> 4525f8b6dc756b56419c8e7cfcd752ac0e1c6470
    if (month.toString.length === 1) {
      month = '0' + month;
    }
    // Seconds part from the timestamp
    const years = date.getFullYear();

    // Will display time in 10:30:23 format
    const formattedTime = years + '-' + month + '-' + days;

    const elemento = {
      id: 0,
      nombreproduc: nombreproduc,
      emailproduc: emailproduc,
      nombreconsu: this.auth.Nombre,
      emailconsu: this.auth.IdUsuario,
      producto: producto,
      categoría: categoría,
      fecha: formattedTime,
      cantidad: cantidad,
      precio: precio,
      servido: 'false',
      fechaServido: null,
      recibido: 'false',
      fechaRecibido: null
    };

    this.dao.add(elemento).subscribe(
      datos => {
        this.getListadoConsPendiente();
        this.vmAlmacen
          .replace(idProducto, { Cantidad: cantidadOriginal - cantidad })
          .subscribe(
            data => {
              this.getListadoConsRecibido();
              this.listProductosProd(emailproduc);
            },
            err => {}
          );
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  // add() {
  //   this.elemento = {};
  //   this.modo = 'add';
  // }

  edit(key: any) {
    this.dao.get(key).subscribe(
      datos => {
        this.elemento = datos;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  view(key: any) {
    this.dao.get(key).subscribe(
      datos => {
        this.elemento = datos;
        this.modo = 'view';
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  remove(key: any) {
    if (!window.confirm('¿Seguro?')) {
      return;
    }
    this.dao.remove(key).subscribe(
      datos => {
        this.list();
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  addChild(prop: string, value: any = {}, parent: any) {
    if (!parent) {
      parent = this.elemento;
    }
    if (!prop) {
      parent[prop] = [];
    }
    parent[prop].push(value);
  }

  delChild(prop: any, index: number) {
    if (prop && 0 <= index && index < prop.length) {
      prop[index].splice(index);
    }
  }

  cancel() {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigate([this.urlList]);
  }

  send() {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          datos => {
            this.cancel();
          },
          err => {
            this.popup.add(err.message);
          }
        );
        break;
      case 'edit':
        this.dao.change(this.elemento).subscribe(
          datos => {
            this.cancel();
          },
          err => {
            this.popup.add(err.message);
          }
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}
