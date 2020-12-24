import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICloth } from 'src/app/models';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {
  panelOpenState = false;

  clothes$: Observable<ICloth>;

  @Output() countItems = new EventEmitter<number>();
  @Output() countFavor = new EventEmitter<number>();


  constructor(public clothService: ClothesService) { }

  ngOnInit(): void {
    this.clothes$ = this.clothService.findClothes({});

    this.clothes$.subscribe(cloth => {
      console.log(cloth)
    });
    
  }

  addToCart(count) {
    this.countItems.emit(count);
  }

  addToFavor(count) {
    this.countFavor.emit(count);
  }

}
