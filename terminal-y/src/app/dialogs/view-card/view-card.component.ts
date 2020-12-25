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
  sizes = [];
  ngOnInit(): void {
    this.colors = Object.keys(this.data.properties);
    // TODO: change this to only show sizes of selected color
    // now showing all sizes of all colors
    this.colors.forEach(color => {
      this.data.properties[color].forEach(tuple => {
        if(!this.sizes.includes(tuple[0])) {
          this.sizes.push(tuple[0]);
        }
      })

    });
  }

}
