import { Component, OnInit } from '@angular/core';
import { MsgService, Newmsg } from '../services/msg.service';
import { Routes, RouterEvent, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-readmsg',
  templateUrl: './readmsg.component.html',
  styleUrls: ['./allmsg.component.less']
})
export class ReadmsgComponent implements OnInit {
  id: any = '';
  msg: any = '';
  constructor(private srv: MsgService) {}

  ngOnInit() {
    this.id = this.srv.readid;
    this.srv.get(this.id).subscribe(res => {
      this.msg = res;
    });
  }
  newmsg(msg) {
    this.srv.newmsg(msg);
  }
  del(msgid) {
    console.log(msgid);

    this.srv.remove(msgid).subscribe();
  }

  // tslint:disable-next-line:member-ordering
}
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./allmsg.component.less']
})
export class ReplyComponent implements OnInit {
  constructor(private srv: MsgService, private _location: Location) {}
  newmsg: Newmsg;
  mensaje: string;
  nuevomensaje: {};
  usr: any;

  ngOnInit() {
    this.usr = JSON.parse(localStorage.getItem('GreenHoodUser'));
    this.newmsg = this.srv.transmsg;
  }
  backClicked() {
    this._location.back();
  }
  contestar() {
    this.nuevomensaje = {
      emitter: this.usr.idUsuario,
      receiver: this.newmsg.emitter,
      message: this.mensaje,
      id: Math.random()
        .toFixed(4)
        .substr(2, 9)
    };
    this.srv.sendmsg(this.nuevomensaje).subscribe();
  }
}
@Component({
  selector: 'app-newmsg',
  templateUrl: './newmsg.component.html',
  styleUrls: ['./allmsg.component.less']
})
export class NewmsgComponent implements OnInit {
  constructor(
    private router: Router,
    private srv: MsgService,
    private _location: Location,
    private authsrv: AuthService
  ) {}
  newr: any;
  mensaje: string;
  receiver: string;
  emitter: string;
  usr: any;
  listusrs: any = [];
  suggested: any = [];
  timer: any;
  searchTerm$ = new Subject<string>();
  nuevomensaje: {};
  ngOnInit() {
    this.usr = JSON.parse(localStorage.getItem('GreenHoodUser'));
    //  this.newr = this.srv.newr;
    this.emitter = this.authsrv.Nombre;
  }
  backClicked() {
    this._location.back();
  }
  searchDelay(e) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search(e.target.value);
    }, 800);
  }
  search(term) {
    this.srv.queryUsers().subscribe(res => {
      this.listusrs = res;
      this.suggested = this.listusrs.filter(usrs =>
        usrs.nombre.toUpperCase().startsWith(term.toUpperCase())
      );
    });
  }
  enviar() {
    if (this.newr) {
      this.nuevomensaje = {
        emitter: this.usr.idUsuario,
        receiver: this.newr,
        message: this.mensaje,
        id: Math.random()
          .toFixed(4)
          .substr(2, 9)
      };
    }
    this.srv.sendmsg(this.nuevomensaje).subscribe(data => {
      this.router.navigateByUrl('/mis_mensajes');
    });
  }
}
@Component({
  selector: 'app-listmsg',
  templateUrl: './listmsg.component.html',
  styleUrls: ['./allmsg.component.less']
})
export class ListmsgComponent implements OnInit {
  receivers: any;
  emitters: any;
  listusrs: any;
  msglist: any = [];
  msgsplit: any = [];
  sentmsgs: any = [];
  listmsg: any = [];
  receivedmsgs: any = [];
  usr: any;

  list() {
    this.srv.query().subscribe(list => {
      this.msglist = list;
      this.listmsg = this.msglist;
      this.sentmsgs = this.listmsg.filter(
        msg => msg.emitter === this.usr.idUsuario
      );
      this.receivedmsgs = this.listmsg.filter(
        msg => msg.receiver === this.usr.idUsuario
      );
    });
  }
  ngOnInit() {
    this.usr = JSON.parse(localStorage.getItem('GreenHoodUser'));
    this.list();
  }
  OnChanges() {
    this.list();
  }
  read(id) {
    this.srv.msgid = id;
  }
  del(msgid) {
    this.srv.remove(msgid).subscribe(res => this.list());
  }
  nuevo(receiver) {
    this.srv.newr = receiver;
  }
  constructor(private srv: MsgService) {}
}
export const MSGCOMPONENTS = [
  ReplyComponent,
  NewmsgComponent,
  ReadmsgComponent,
  ListmsgComponent
];
