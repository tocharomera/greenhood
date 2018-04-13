import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
@Component({
  selector: 'app-cookies',
  templateUrl: './cookies-component.html',
  styleUrls: ['./legal.component.css']
})
export class CookiesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'app-mapasitio',
  templateUrl: './mapasitio.component.html',
  styleUrls: ['./legal.component.css']
})
export class MapasitioComponent implements OnInit {
  logged: any;
  constructor(private srv: AuthService) {
    this.logged = this.srv.IsAuthenticated;
  }

  ngOnInit() {}
}
export const LEGALCOMPONENTS = [
  LegalComponent,
  MapasitioComponent,
  CookiesComponent
];
