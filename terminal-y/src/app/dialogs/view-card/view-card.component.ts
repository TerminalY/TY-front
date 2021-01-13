import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICloth, IUserChoosen } from 'src/app/models';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICloth) { }
  colors = [];
  colorsProperties: { [key: string]: any } = {};
  sizes = [];
  sortSize = [];
  stateSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  errorMessage = false;
  chosenItems: IUserChoosen ;
  currColor;
  currSize;

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

  addToCart() {
    this.chosenItems = {color: this.currColor, size: this.currSize}; 
    if (this.currColor != undefined && this.currSize != undefined) {
      this.dialogRef.close(this.data);
    } else if (this.currColor != undefined || this.currSize != undefined) {
      this.errorMessage = true;
    }
  }
}
