import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import {
  BlogComponent,
  BlogViewComponent,
  BlogListComponent,
  BlogAddComponent,
  BlogEditComponent
} from './blog/blog.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { EntradaComponent } from './entrada/entrada.component';
import { PerfilConsumidorComponent } from './perfil-consumidor/perfil-consumidor.component';
import { BuscarProductosComponent } from './buscar-productos/buscar-productos.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ComoFuncionaComponent } from './como-funciona/como-funciona.component';
import {
  ListmsgComponent,
  ReadmsgComponent,
  NewmsgComponent,
  ReplyComponent
} from './allmsg/allmsg.component';
import { FormLoginComponent } from './form-login/form-login.component';
import {
  LegalComponent,
  CookiesComponent,
  MapasitioComponent
} from './legal/legal.component';
import { PerfilproductorComponent } from './perfilproductor/perfilproductor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EdituserComponent } from './usuario/edituser/edituser.component';

export const routes: Routes = [
  { path: '', component: ComoFuncionaComponent },
  { path: 'buscar_productos', component: BuscarProductosComponent },
  { path: 'buscar_productos/:id', component: BuscarProductosComponent },
  {
    path: 'blog',
    children: [
      { path: '', component: BlogListComponent },
      { path: 'add', component: BlogAddComponent },
      { path: ':nombre', component: BlogViewComponent },
      { path: ':nombre/edit', component: BlogEditComponent }
    ]
  },
  {
    path: 'mi_perfil',
    children: [
      { path: '', component: PerfilConsumidorComponent },
      { path: 'editUser', component: EdituserComponent }
     ]
  },
  {
    path: 'perfilproductor',
    children: [
      { path: ':id', component: PerfilproductorComponent },
      { path: 'mis_mensajes', component: ListmsgComponent },
      { path: 'almacen', component: AlmacenComponent }
    ]
  },
  { path: 'almacen', component: AlmacenComponent },

  {
    path: 'legal',
    children: [
      { path: '', component: LegalComponent },
      { path: 'cookies', component: CookiesComponent },
      { path: 'mapasitio', component: MapasitioComponent }
    ]
  },
  {
    path: 'mis_mensajes',
    children: [
      { path: '', component: ListmsgComponent },
      { path: 'read', component: ReadmsgComponent },
      {
        path: 'reply',
        component: ReplyComponent
      },
      {
        path: 'new',
        component: NewmsgComponent
      }
    ]
  },
  { path: 'nuevo_usuario', component: FormUsuarioComponent },
  { path: 'login', component: FormLoginComponent },
  { path: '**', component: PageNotFoundComponent }
];
