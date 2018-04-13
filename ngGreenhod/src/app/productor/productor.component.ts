import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UsuariosDAO } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productor',
  templateUrl: './productor.component.html',
  styleUrls: ['./productor.component.css']
})
export class ProductorComponent implements OnInit, OnDestroy {
  private obs: any;
  public elemento: any;
  constructor(private prodDAO: UsuariosDAO, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
    this.obs = this.route.params.subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      if (id) {
        this.prodDAO.get(id).subscribe(data => this.elemento = data);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
