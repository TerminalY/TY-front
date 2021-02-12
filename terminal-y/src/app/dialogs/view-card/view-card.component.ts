import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource } from '@angular/material/tree';
import { ICloth, IClothProperties } from 'src/app/models';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICloth, private clothesService: ClothesService) { }
  colors = [];
  colorsProperties: { [key: string]: any } = {};
  sizes = [];
  sortSize = [];
  stateSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  errorMessage = false;
  chosenItems: IClothProperties ;
  currColor;
  currSize;
  errorLogin = false;

  ngOnInit(): void {
    this.colors = Object.keys(this.data.properties);

    // Default color is the 1st in the array
    this.colorClicked(undefined, this.colors[0]);
  }

  colorClicked($event, color) {
    this.currSize = undefined;
    this.currColor = color;

    // Define each circle stroke-width to be 1
    this.colors.forEach(c => {
      this.colorsProperties[c] = 1;
    });

    // define clicked color stroke-width to be 3
    this.colorsProperties[this.currColor] = 3;
    
    // Show available sizes of clicked color
    this.sizes = [];
    this.data.properties[this.currColor].forEach(tuple => {
      if(!this.sizes.includes(tuple[0]) && tuple[1] > 0) {
        this.sizes.push(tuple[0]);
      }
    });
    this.sortSize = [];

    this.sizes.map(size => {
      let index;
      index = this.stateSizes.indexOf(size);
      this.sortSize.push(index);
    });

    this.sortSize.sort();

    this.sizes = this.changeIndexToItem(this.sortSize);

  }

  changeIndexToItem(sizeIndex:string[]) {
    let sortSizes = [];
    sizeIndex.map(index => {
      sortSizes.push(this.stateSizes[index]);
    });

    return sortSizes;
  }

  sizeClicked($event, size) {
    this.currSize = size;
  }

  addToCart(nameClothes: string) {
    this.chosenItems = {clothColor: this.currColor, clothSize: this.currSize, clothName: nameClothes}; 
    if (this.currColor != undefined && this.currSize != undefined && localStorage.getItem('email')) {
      this.clothesService.addToCart(localStorage.getItem('email'), this.chosenItems).subscribe(() => {
        this.errorLogin = false
         this.dialogRef.close(this.data);
      });
    } else if (this.currColor != undefined || this.currSize != undefined) {
      this.errorMessage = true;
    } else if (!localStorage.getItem('email')) {
      this.errorLogin = true
    }
  }
}
