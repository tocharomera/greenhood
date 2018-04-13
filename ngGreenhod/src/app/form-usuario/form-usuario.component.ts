import { Component, OnInit } from '@angular/core';
import { PersonasDAOService } from '../services/personas.service';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
   usuario: UsuarioModel;

  constructor( public vmPers: PersonasDAOService, private ruta: Router) {
    this.usuario = new UsuarioModel();
   }

  ngOnInit() {
  }

  // crea un nuevo usuario en la bbdd
  enviaUser() {
    // debugger;
    this.vmPers.add(this.usuario).subscribe(data => {this.ruta.navigate(['']); } );
  }


  // prueba muestra user
  muestraUser() {
    this.vmPers.get(this.usuario.$email);
  }

}
