import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LoggerService } from '../../my-core';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private isProductor = false;

  // tslint:disable-next-line:no-inferrable-types
  private idUsuario: string = '(sin id)';
  // tslint:disable-next-line:no-inferrable-types
  private nombre: string = '(Anonimo)';
  private authToken: string;

  constructor(private logger: LoggerService) {
    if (localStorage && localStorage.GreenHoodUser) {
      const usr = JSON.parse(localStorage.GreenHoodUser);
      this.isAuthenticated = usr.isAuthenticated;
      this.idUsuario = usr.idUsuario;
      this.nombre = usr.nombre;
      this.isProductor = usr.isProductor;
      this.authToken = usr.authToken;
    }
  }

  login(
    idUsuario: string,
    nombre: string,
    token: string,
    isProductor: boolean
  ) {
    this.logger.log('Se ha autenticado');
    this.idUsuario = idUsuario;
    this.isAuthenticated = true;
    this.nombre = nombre;
    this.isProductor = isProductor;
    this.authToken = token;
    if (localStorage) {
      localStorage.GreenHoodUser = JSON.stringify(this);
    }
    return true;
  }

  logout() {
    this.idUsuario = '(sin id)';
    this.nombre = '(Anonimo)';
    this.authToken = null;
    this.logger.log('Se ha desconectado');
    this.isAuthenticated = false;
    if (localStorage && localStorage.GreenHoodUser) {
      localStorage.removeItem('GreenHoodUser');
    }
  }

  get AuthenticationToken() {
    return this.authToken;
  }
  get IsAuthenticated() {
    return this.isAuthenticated;
  }
  get IsProductor() {
    return this.isProductor;
  }
  get IdUsuario() {
    return this.idUsuario;
  }
  get Nombre() {
    return this.nombre;
  }
  set Nombre(value: string) {
    this.nombre = value;
  }
}

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private auth: AuthService) {}
  get isAutenticated() {
    return this.auth.IsAuthenticated;
  }
  get IsProductor() {
    return this.auth.IsProductor;
  }
  login(usr: string, pwd: string) {
    return new Observable(observable =>
      this.http
        .post(environment.WSURL + 'login', { name: usr, password: pwd })
        .subscribe(
          data => {
            if (data['success']) {
              this.auth.login(
                usr,
                data['name'],
                data['token'],
                data['productor']
              );
            } else {
              this.auth.logout();
            }
            observable.next(data['success']);
          },
          (err: HttpErrorResponse) => {
            observable.error(err);
          }
        )
    );
  }
  logout() {
    this.auth.logout();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.withCredentials || !this.auth.IsAuthenticated) {
      return next.handle(req);
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.auth.AuthenticationToken)
    });
    return next.handle(authReq);
  }
}

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).do(event => {
      if (event instanceof HttpResponse) {
        console.log(
          `Request for ${req.urlWithParams} took ${Date.now() - started} ms.`
        );
      }
    });
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authService.IsAuthenticated;
  }
}


@Injectable()
export class UsuariosDAO {
  protected baseUrl = environment.WSURL + "usuariosGreen";
  protected options = { withCredentials: true };

  constructor(private http: HttpClient) {}

  get(id: string) {
    return this.http.get(this.baseUrl + "/" + id, this.options);
  }
}
