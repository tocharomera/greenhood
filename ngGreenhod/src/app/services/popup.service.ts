import { Injectable } from '@angular/core';

@Injectable()
export class PopupService {
  private lista = Array<string>();

  constructor() {}

  get Lista() {
    return this.lista;
  }

  add(msg: string) {
    this.lista.push(msg);
  }
  remove(index: number) {
    if (0 <= index && index < this.lista.length) {
      this.lista.splice(index, 1);
    }
  }
  clear() {
    this.lista.splice(0, this.lista.length - 1);
  }
}
