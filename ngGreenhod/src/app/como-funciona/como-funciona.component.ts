import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-como-funciona',
  templateUrl: './como-funciona.component.html',
  styleUrls: ['./como-funciona.component.less']
})
export class ComoFuncionaComponent implements OnInit {
  timer: any;
  clicked = false;
  busqueda = '';
  constructor() {}

  ngOnInit() {

  }
}
