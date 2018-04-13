import { Injectable } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../my-core';

@Injectable()
export class BlogDAOService {
  protected baseUrl = environment.WSURL + 'blog';
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
}

@Injectable()
export class BlogVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado = [];
  private elemento = {};
  private idOriginal = null;
  protected pk = 'id';
  protected urlList = '/blog';

  constructor(
    private logger: LoggerService,
    private popup: PopupService,
    private dao: BlogDAOService,
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
    const obj = this.dao.query();
    obj.subscribe(
      datos => {
        this.listado = datos;
        this.modo = 'list';
      },
      err => {
        this.popup.add(err.message);
      }
    );
    obj.subscribe(
      datos => {
        // Calcula totales
      },
      err => {
        this.popup.add(err.message);
      }
    );
  }

  add() {
    this.elemento = {};
    this.elemento[this.pk] = 0;
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
