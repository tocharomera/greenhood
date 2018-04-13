import { Component, OnInit } from '@angular/core';
import { PersonasDAOService } from '../services/personas.service';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';
import { LoginService, AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  private usuario: UsuarioModel;

  constructor( public user: PersonasDAOService, private ruta: Router, private log: LoginService,
    private auth: AuthService, private popup: PopupService) {
    this.usuario = new UsuarioModel();
   }

  ngOnInit() {
  }

  buscaUser() {
    this.log.login(this.usuario.$email, this.usuario.$pass).subscribe(
      autenticado => {
        if (autenticado) {
          this.ruta.navigate(['/mi_perfil']);
        } else {
          window.alert('Usuario o contraseña invalida.');
        }
      },
      err => {
        this.popup.add(err.message);
      }
    );
;

    /*
    this.user.get(this.usuario.$email).subscribe(function () {
      this.log.login(this.usuario.email, this.usuario.pass);
    });
    // // .subscribe(data => {this.ruta.navigate(['']); } );
  */
  }
}
