import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlmacenVMService } from '../almacen/almacen.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos-disponibles',
  templateUrl: './productos-disponibles.component.html',
  styleUrls: ['./productos-disponibles.component.css']
})
export class ProductosDisponiblesComponent implements OnInit, OnDestroy {
  private obs: any;
  constructor(public vm: AlmacenVMService, private route: ActivatedRoute,
     private router: Router) { }
  ngOnInit() {
    this.obs = this.route.params.subscribe(params => {
      const id = params['id']; // (+) converts string 'id' to a number
      if (id) {
        this.vm.listProductor(id);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
