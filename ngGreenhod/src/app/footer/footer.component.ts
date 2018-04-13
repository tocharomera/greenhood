import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  busqueda: any;
  constructor() {}
  ngOnInit() {}
}

@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./footer.component.less']
})
export class AcceptanceComponent implements OnInit {
  clicked: boolean;
  constructor() {}
  ponerCookie() {
    localStorage.acceptC = true;
    this.clicked = true;
  }

  ngOnInit() {
    if (localStorage.getItem('acceptC')) {
      this.clicked = JSON.parse(localStorage.getItem('acceptC'));
    } else {
      this.clicked = false;
    }
  }
}
