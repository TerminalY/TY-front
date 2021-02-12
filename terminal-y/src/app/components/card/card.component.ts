import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewCardComponent } from 'src/app/dialogs/view-card/view-card.component';
import { ICloth, IClothProperties } from 'src/app/models';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  countItems = 0;
  countFavorite = 0;
  messageCart = 'This item added to cart';
  messageFavor = 'This item added to Favorite';
  chooseItems: IClothProperties; 
  colors;
  Items: any;

  @Input() cloth: ICloth;

  @Output() countCart = new EventEmitter<number>();
  @Output() countFavor = new EventEmitter<number>();

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private clothesService: ClothesService) { }

  ngOnInit(): void {
    this.colors = Object.keys(this.cloth.properties);
  }

  async addToCart() {
    this.Items = await this.clothesService.getCartByEmail(localStorage.getItem('email'));
    this.countItems = this.Items.cart.clothes.length;
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

  openViewCard() {
    const dialogRef = this.dialog.open(ViewCardComponent, {
      data: this.cloth,
      height: "90%",
      width: "70%",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chooseItems = result;
      console.log(result);
      if (result.length != 0) {
        this.addToCart();
      }      
    });
  }
}
