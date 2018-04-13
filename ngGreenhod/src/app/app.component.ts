import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  height = 0;
  wheight: any;
  isDocBigger: boolean;
  constructor(router: Router) {
    this.timer();

    router.events.subscribe(val => {
      this.timer();
    });
  }

  timer() {
    setTimeout(() => {
      this.height = document.body.clientHeight;
      this.wheight = window.innerHeight - 20;
      console.log('h' + this.height);
      console.log('w' + window.innerHeight);
      if (window.innerHeight > this.height) {
        this.isDocBigger = true;
        console.log(this.wheight);
      } else {
        this.isDocBigger = false;
      }
    }, 0);
  }
  onResize(event) {
    this.timer();
  }
  ngOnInit() {
    this.timer();
  }
}
