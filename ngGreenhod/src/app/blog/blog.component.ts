import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogVMService } from './blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less'] /*todas con blog B minuscula*/
})
export class BlogComponent implements OnInit {
  /*Cambiar a Blog con B mayusculas.*/

  constructor(public vm: BlogVMService) {}

  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './template.list.html',
  styleUrls: ['./blog.component.less']
})
export class BlogListComponent implements OnInit {
  user: any;
  isAuthenticated: boolean;
  hide: boolean;

  constructor(public vm: BlogVMService, private router: Router) {
    if (localStorage.getItem('GreenHoodUser')) {
      this.user = JSON.parse(localStorage.getItem('GreenHoodUser'));
    }
  }

  ngOnInit() {
    if (localStorage.getItem('GreenHoodUser')) {
      this.user = JSON.parse(localStorage.getItem('GreenHoodUser'));
      this.isAuthenticated = this.user.isAuthenticated;
      console.log(this.user.isAuthenticated);
    }

    this.vm.list();
  }
}
@Component({
  selector: 'app-blog-add',
  templateUrl: './template.form.html',
  styleUrls: ['./blog.component.less']
})
export class BlogAddComponent implements OnInit {

  constructor(public vm: BlogVMService) {}

  ngOnInit() {
    this.vm.add();
  }
}
@Component({
  selector: 'app-blog-edit',
  templateUrl: './template.form.html',
  styleUrls: ['./blog.component.less']
})
export class BlogEditComponent implements OnInit, OnDestroy {
  private obs: any;
  constructor(
    public vm: BlogVMService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.obs = this.route.params.subscribe(params => {
      const id = +params['nombre']; // (+) converts string 'id' to a number
      if (id && !isNaN(id)) {
        this.vm.edit(id);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
@Component({
  selector: 'app-blog-view',
  templateUrl: './template.view.html',
  styleUrls: ['./blog.component.less']
})
export class BlogViewComponent implements OnInit, OnDestroy {
  private obs: any;
  constructor(
    public vm: BlogVMService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.obs = this.route.params.subscribe(params => {
      const id = +params['nombre']; // (+) converts string 'id' to a number
      if (id && !isNaN(id)) {
        this.vm.view(id);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
export const BLOG_COMPONENTS = [
  BlogComponent,
  BlogListComponent,
  BlogAddComponent,
  BlogEditComponent,
  BlogViewComponent
]; /*Sustituir personas por blog con B mayuscula.*/
