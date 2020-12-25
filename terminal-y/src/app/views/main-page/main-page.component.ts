import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  title = 'terminal-y';
  countCart = 0;
  countFavor = 0;

  constructor() {}

  ngOnInit(): void {
  }

  changeCountCart(count) {
    this.countCart = count;
  }

  changeCountFavor(count) {
    this.countFavor = count;
  }

}
