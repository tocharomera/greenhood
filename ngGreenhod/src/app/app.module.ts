// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MyCoreModule } from '../my-core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// SERVICIOS
import { AuthService, LoginService, AuthInterceptor, TimingInterceptor, AuthGuard, UsuariosDAO } from './services/auth.service';
import { LoggerService, LOGGER_LEVEL } from '../my-core';
import { PopupService } from './services/popup.service';
import { PersonasDAOService, PersonasVMService } from './services/personas.service';
import { MsgService } from './services/msg.service';
import { MapService } from './services/map.service';
import { PedidosDaoService, PedidosVMService } from './services/pedidos.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Menu1Component } from './menu1/menu1.component';
import { Menu2Component } from './menu2/menu2.component';
import { BLOG_COMPONENTS } from './blog/blog.component';
import { EntradaComponent } from './entrada/entrada.component';
import { ALMACEN_COMPONENTS } from './almacen/almacen.component';
import { PerfilConsumidorComponent } from './perfil-consumidor/perfil-consumidor.component';
import { BuscarProductosComponent } from './buscar-productos/buscar-productos.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { ComoFuncionaComponent } from './como-funciona/como-funciona.component';
import { BlogVMService, BlogDAOService } from './blog/blog.service';
import { AlmacenVMService, AlmacenDAOService } from './almacen/almacen.service';
import { MSGCOMPONENTS } from './allmsg/allmsg.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { LegalComponent, LEGALCOMPONENTS, CookiesComponent } from './legal/legal.component';
import { PerfilproductorComponent } from './perfilproductor/perfilproductor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent, AcceptanceComponent } from './footer/footer.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AlmacenPedidosComponent } from './almacen-pedidos/almacen-pedidos.component';
import { AlmacenServidosComponent } from './almacen-servidos/almacen-servidos.component';
import { PedidoConsuComponent } from './pedido-consu/pedido-consu.component';
import { RecibidosConsuComponent } from './recibidos-consu/recibidos-consu.component';
import { ProductorComponent } from './productor/productor.component';
import { CompraComponent } from './compra/compra.component';
import { ProductosDisponiblesComponent } from './productos-disponibles/productos-disponibles.component';
import { EdituserComponent } from './usuario/edituser/edituser.component';



@NgModule({
  declarations: [
    AppComponent,
    ALMACEN_COMPONENTS,
    HeaderComponent,
    Menu1Component,
    Menu2Component,
    BLOG_COMPONENTS,
    EntradaComponent,
    MSGCOMPONENTS,
    LEGALCOMPONENTS,
    PerfilConsumidorComponent,
    BuscarProductosComponent,
    FormUsuarioComponent,
    ComoFuncionaComponent,
    FormLoginComponent,
    LegalComponent,
    PerfilproductorComponent,
    PageNotFoundComponent,
    FooterComponent,
    UsuarioComponent,
    CarritoComponent,
    AlmacenPedidosComponent,
    AlmacenServidosComponent,
    PedidoConsuComponent,
    RecibidosConsuComponent,
    ProductorComponent,
    EdituserComponent,
    CompraComponent,
    ProductosDisponiblesComponent,
    CookiesComponent,
    AcceptanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(routes),
    MyCoreModule
  ],
  providers: [UsuariosDAO, PedidosDaoService, PedidosVMService, MapService, AuthService, MsgService,
     PersonasDAOService, LoggerService, PopupService,
    LoginService, AuthInterceptor, TimingInterceptor, AuthGuard,
    { provide: LOGGER_LEVEL, useValue: 5 }, BlogVMService, BlogDAOService, PersonasVMService,
  AlmacenVMService, AlmacenDAOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
