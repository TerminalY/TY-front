import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit, OnChanges {
  count = 1;
  @Input() cartData: Observable<any>;
  cart: {clothes: any};
  constructor() { }

  ngOnInit(): void {
    console.log(this.cartData);
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.cart = await changes.cartData.currentValue;
  }
}
