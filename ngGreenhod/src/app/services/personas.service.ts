import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../my-core';
import { PopupService } from './popup.service';
import { Router } from '@angular/router';



@Injectable()
export class PersonasDAOService {
  protected baseUrl =  environment.WSURL + 'usuariosGreen';
  protected options = { withCredentials: true };
  constructor(private http: HttpClient) { }
  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
  get(email: string) {
    return this.http.get(this.baseUrl + '/' + email, this.options);
  }
  add(item: any)  {
    return this.http.post(this.baseUrl, item, this.options);
  }
  change(item: any) {
    return this.http.put(this.baseUrl, item, this.options);
  }
  replace(id: number, item: any) {
    return this.http.patch(this.baseUrl + '/' + id, item, this.options);
  }
  remove(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, this.options);
  }
}



@Injectable()
export class PersonasVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado = [];
  private elemento = {};
  private idOriginal = null;
  protected pk = 'email';
  protected urlList = '/personas';

  constructor(
    private logger: LoggerService,
    private popup: PopupService,
    private dao: PersonasDAOService,
    private router: Router
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

  add() {
    this.elemento = {};
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
