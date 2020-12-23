import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {
  panelOpenState = false;
  @Output() countItems = new EventEmitter<number>();
  @Output() countFavor = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  addToCart(count) {
    this.countItems.emit(count);
  }

  addToFavor(count) {
    this.countFavor.emit(count);
  }

}
