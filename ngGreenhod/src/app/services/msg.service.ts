import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class MsgService {
  mod: 0 | 1 | 2 | 3 = 0;
  readid: any;
  transmsg: Newmsg;
  newreceiver: string;
  protected baseUrl = environment.WSURL + 'messages';
  protected options = { withCredentials: true };
  constructor(private http: HttpClient) {}

  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
  get(id: number | string) {
    return this.http.get(this.baseUrl + '/' + id, this.options);
  }
  queryUsers(): Observable<any> {
    return this.http.get(
      environment.WSURL + 'usuariosGreen',
      this.options
    );
  }
  sendmsg(msg: any) {
    return this.http.post(this.baseUrl, msg, this.options);
  }
  change(item: any) {
    return this.http.put(this.baseUrl, item, this.options);
  }
  remove(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, this.options);
  }
  get msgid() {
    return this.readid;
  }
  set msgid(id) {
    this.readid = id;
  }
  newmsg(msg) {
    this.transmsg = msg;
  }
  get newr() {
    return this.newreceiver;
  }
  set newr(receiver) {
    if (!receiver) {
      this.newreceiver = '';
    } else {
      this.newreceiver = receiver;
    }
  }
}

export class Newmsg {
  constructor(
    public emitter: string,
    public receiver: string,
    public message: string
  ) {}
}
