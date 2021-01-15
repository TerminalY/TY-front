import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  count = 1;
  constructor() { }

  ngOnInit(): void {
  }

  calcCount(kind: string) {
    switch(kind) {
      case "+":
        this.count++;
        break; 
      case "-":
        this.count--; 
        break;
    }
  }

}
