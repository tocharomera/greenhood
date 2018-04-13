import { Component, OnInit } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu1',
  templateUrl: './menu1.component.html',
  styleUrls: ['./menu1.component.css']
})
export class Menu1Component implements OnInit {
  menu = [
    {nombre: 'Como Funciona', url: ''},
    {nombre: 'Busca Productos', url: '/buscar_productos'},
    {nombre: 'Blog', url: '/blog'},
  ];

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
