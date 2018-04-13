import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonasDAOService } from '../../services/personas.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  private usuarioId;
  usuario: any;
  constructor(
    private router: Router,
    public auth: AuthService,
    public vm: PersonasDAOService
  ) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    this.usuarioId = JSON.parse(localStorage.getItem('GreenHoodUser'));
    this.vm.get(this.usuarioId.idUsuario).subscribe(res => {
      this.usuario = res;
    });
  }
  editUser() {
    this.vm.change(this.usuario).subscribe(res => {
      this.router.navigate(['/mi_perfil']);
    });
  }
}
