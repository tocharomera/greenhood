import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  PersonasVMService,
  PersonasDAOService
} from '../services/personas.service';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  test = false;
  allowpass: boolean;
  newpass: any;
  editpass = false;
  private usuarioId;
  newpassR: any;
  testpass: any;
  passmatch = false;
  usuario: any;
  constructor(
    private router: Router,
    public auth: AuthService,
    public vm: PersonasDAOService
  ) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    this.getuser();
  }
  getuser() {
    this.usuarioId = JSON.parse(localStorage.getItem('GreenHoodUser'));
    this.vm.get(this.usuarioId.idUsuario).subscribe(res => {
      this.usuario = res;

    });
  }
  // crea un nuevo usuario en la bbdd
  editUser() {
    if (this.testpass === this.usuario.pass) {
      this.allowpass = true;
    }

    this.router.navigate(['/mi_perfil/editUser']);
  }
  alloweditpass() {
    this.test = true;
    if (this.testpass === this.usuario.pass) {
      this.test = this.test ? false : true;

      this.testpass = '';
      this.editpass = true;
    }
  }
  cancelaPass() {
    this.test = false;
  }
  testmatch() {
    if (this.newpass === this.newpassR) {
      this.passmatch = false;
    } else {
      this.passmatch = true;
    }
  }
  editPass() {
    if (this.newpass === this.newpassR) {
      this.editpass = false;
      this.vm
        .replace(this.usuario.email, { pass: this.newpass })
        .subscribe(res => {
          this.getuser();
        });
      this.newpass = '';
      this.newpassR = '';
    }
  }
}
