import { Injectable } from '@angular/core';
import { LoggerService } from '../../my-core';
import { PopupService } from '../services/popup.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AlmacenDAOService {
  protected baseUrl = environment.WSURL + 'almacen';
  protected options = { withCredentials: true };
  constructor(private http: HttpClient) {}
  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
  get(id: number | string) {
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
export class AlmacenVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado = [];
  private elemento = {};
  private idOriginal = null;
  protected pk = 'id';
  protected urlList = '/almacen';

  constructor(
    private logger: LoggerService,
    private popup: PopupService,
    private dao: AlmacenDAOService,
    private router: Router,
    private auth: AuthService
  ) {}

  get Modo() {
    return this.modo;
  }
  get Listado() {
    return this.listado;
  }
  get Elemento() {
    return this.elemento;
  }

  replace(id: number, item: any) {
    return this.dao.replace(id, item);
  }

  list() {
    this.listProductor(this.auth.IdUsuario);
  }

  listProductor(idProductor) {
    this.dao.search(`idProductor=${idProductor}`).subscribe(
      datos => {
        this.listado = datos;
        this.modo = 'list';
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  add() {
    this.elemento = { id: 0, idProductor: this.auth.IdUsuario, nombre: this.auth.Nombre };
    this.modo = 'add';
  }

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
    this.list();
    // this.router.navigate([this.urlList]);
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

// @Injectable()
// export class AlmacenVMService {
//   private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
//   private listado = [];
//   private elemento = {};
//   private idOriginal = null;
//   protected pk = 'id';

//   constructor(private logger: LoggerService, private popup: PopupService) {}

//   get Modo() {
//     return this.modo;
//   }
//   get Listado() {
//     return this.listado;
//   }
//   get Elemento() {
//     return this.elemento;
//   }

//   list() {
//     this.modo = 'list';
//     if (this.listado.length === 0) {
//       this.listado = [
//         {
//           Producto: 'manzanas',
//           Categoria: 'frutas',
//           Cantidad: '2',
//           Fecha: '2018-03-07',
//           Precio: '1.02',
//           id: 3,
//           nombre: 'mario',

//         },
//         {
//           Producto: 'peras',
//           Categoria: 'frutas',
//           Cantidad: '3',
//           Fecha: '2018-05-07',
//           Precio: '1.06',
//           id: 4,
//           nombre: 'mario',

//         },
//         {
//           Producto: 'limones',
//           Categoria: 'frutas',
//           Cantidad: '4',
//           Fecha: '2018-06-07',
//           Precio: '2.02',
//           id: 5,
//           nombre: 'mario',

//         }
//       ];
//     }
//   }

//   add() {
//     this.elemento = {};
//     this.modo = 'add';
//   }

//   edit(key: any) {
//     const ele = this.listado.find(item => item[this.pk] == key);
//     if (ele) {
//       this.elemento = ele;
//       this.idOriginal = key;
//       this.modo = 'edit';
//     } else {
//       this.popup.add('Elemento no encontrado.');
//     }
//   }

//   view(key: any) {
//     const ele = this.listado.find(item => item[this.pk] == key);
//     if (ele) {
//       this.elemento = ele;
//       this.modo = 'view';
//     } else {
//       this.popup.add('Elemento no encontrado.');
//     }
//   }

//   remove(key: any) {
//     if (!window.confirm('¿Seguro?')) {
//       return;
//     }
//     const indice = this.listado.findIndex(item => item[this.pk] == key);
//     if (indice >= 0) {
//       this.listado.splice(indice, 1);
//       this.list();
//     } else {
//       this.popup.add('Elemento no encontrado.');
//     }
//   }

//   cancel() {
//     this.elemento = {};
//     this.idOriginal = null;
//     this.list();
//   }

//   send() {
//     switch (this.modo) {
//       case 'add':
//         this.listado.push(this.elemento);
//         this.cancel();
//         break;
//       case 'edit':
//         const indice = this.listado.findIndex(
//           item => item[this.pk] === this.idOriginal
//         );
//         if (indice >= 0) {
//           this.listado[indice] = this.elemento;
//           this.cancel();
//         } else {
//           this.popup.add('Elemento no encontrado.');
//         }
//         break;
//       case 'view':
//         this.cancel();
//         break;
//     }
//   }
// }
