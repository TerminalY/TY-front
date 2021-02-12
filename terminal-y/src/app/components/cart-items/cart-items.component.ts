import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit, OnChanges {
  count = 1;
  @Input() cartData: Observable<any>;
  cart: {clothes: any};
  constructor(private clothesService: ClothesService) { }

  ngOnInit(): void {
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.cart = await changes.cartData.currentValue;
  }

  async delete(item) {
    if(item._id) {
      // delet from cart
      await this.clothesService.deleteFromCart(localStorage.getItem('email'), item._id);
      
      // update cart data
      this.cart = (await this.clothesService.getCartByEmail(localStorage.getItem('email'))).cart;
    }
  }
}
