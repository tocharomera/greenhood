import { Component, OnInit } from '@angular/core';
import { AlmacenVMService } from './almacen.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {
  constructor(public vm: AlmacenVMService) {}

  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-almacen-list',
  templateUrl: './template.list.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenListComponent implements OnInit {
  constructor(public vm: AlmacenVMService) {}

  ngOnInit() {}
}
@Component({
  selector: 'app-almacen-add',
  templateUrl: './template.form.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenAddComponent implements OnInit {
  nuevoid = 0;
  constructor(public vm: AlmacenVMService) {}
  generarId() {
    this.nuevoid = Math.random() * 10;
  }
  ngOnInit() {

    this.generarId();
    // console.log(this.nuevoid);

  }
}
@Component({
  selector: 'app-almacen-edit',
  templateUrl: './template.form.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenEditComponent implements OnInit {
  constructor(public vm: AlmacenVMService) {}

  ngOnInit() {}
}
@Component({
  selector: 'app-almacen-view',
  templateUrl: './template.view.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenViewComponent implements OnInit {
  constructor(public vm: AlmacenVMService) {}

  ngOnInit() {}
}

export const ALMACEN_COMPONENTS = [
  AlmacenComponent,
  AlmacenListComponent,
  AlmacenAddComponent,
  AlmacenEditComponent,
  AlmacenViewComponent
];
