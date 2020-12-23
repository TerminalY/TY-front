import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Output() countCart = new EventEmitter<number>();
  @Output() countFavor = new EventEmitter<number>();

  countItems = 0;
  countFavorite = 0;
  messageCart = 'This item added to cart';
  messageFavor = 'This item added to Favorite';

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.countItems = this.countItems + 1;
    this.countCart.emit(this.countItems);
    this._snackBar.open(this.messageCart, null ,{
      duration: 2000,
    });
  }

  addToFavorite() {
    this.countFavorite = this.countFavorite + 1;
    this.countFavor.emit(this.countFavorite);
    this._snackBar.open(this.messageFavor, null ,{
      duration: 2000,
    });
  }
}
