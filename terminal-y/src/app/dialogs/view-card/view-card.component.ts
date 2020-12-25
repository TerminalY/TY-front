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

  ngOnInit(): void {
  }

}
