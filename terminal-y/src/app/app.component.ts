import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'terminal-y';
  countCart = 0;
  countFavor = 0;

  changeCountCart(count) {
    this.countCart = count;
  }

  changeCountFavor(count) {
    this.countFavor = count;
  }
}
