import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewCardComponent } from 'src/app/dialogs/view-card/view-card.component';
import { ICloth } from 'src/app/models';
import { AccountService } from 'src/app/services/account/account.service';

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

  colors;

  @Input() cloth: ICloth;

  @Output() countCart = new EventEmitter<number>();
  @Output() countFavor = new EventEmitter<number>();

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private userService: AccountService) { }

  ngOnInit(): void {
    this.colors = Object.keys(this.cloth.properties);
  }

  addToFavorite() {
    this.countFavorite = this.countFavorite + 1;
    this.countFavor.emit(this.countFavorite);
    this._snackBar.open(this.messageFavor, null ,{
      duration: 2000,
    });
  }

  openViewCard() {
    this.dialog.open(ViewCardComponent, {
      data: this.cloth,
      height: "90%",
      width: "70%",
      disableClose: true
    });
  }
}
