import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICloth } from 'src/app/models';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ICloth) { }
  colors = [];
  colorsProperties: { [key: string]: any } = {};
  sizes = [];

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
  }

  sizeClicked($event, size) {
    this.currSize = size;
  }
}
