import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css']
})
export class Menu2Component implements OnInit {
  menu2 = [
    {nombre: 'Mi Perfil', url: '/mi_perfil' },
    {nombre: 'Mi Almacén', url: '/almacen', soloProductor : true},
    {nombre: 'Mis Mensajes', url: '/mis_mensajes'},

  ];

  constructor(public auth: AuthService) {
   }

  ngOnInit() {
  }

}
