import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICloth, IClothFilter } from 'src/app/models';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {
  panelOpenState = false;
  private countProduct: BehaviorSubject<number>;
  private countFavorite: BehaviorSubject<number>;
  sizes = [{size:'XS', isClicked: false}, {size:'S', isClicked: false}, {size:'M', isClicked: false}, {size:'L', isClicked: false}, 
  {size:'XL', isClicked: false}, {size:'XXL', isClicked: false} ];


  // slider variables
  max = 1000;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  filterParams: IClothFilter = {};
  selectedSizes = [];

  clothes$: Observable<ICloth>;

  @Output() countItems = new EventEmitter<number>();
  @Output() countFavor = new EventEmitter<number>();


  constructor(public clothService: ClothesService) { 
    this.countProduct = new BehaviorSubject(0);
    this.countFavorite = new BehaviorSubject(0);
  }

  ngOnInit(): void {
    this.clothes$ = this.clothService.findClothes({});
  }

  addToCart() {
    this.countProduct.next(this.countProduct.getValue() + 1)
    this.countItems.emit(this.countProduct.getValue());
  }

  addToFavor() {
    this.countFavorite.next(this.countFavorite.getValue() + 1)
    this.countFavor.emit(this.countFavorite.getValue());
  }

  formatLabel(value: number) {
    return value + '₪';
  }

  filterBySize(sizeFilter: {size: string, isClicked: boolean}) {
    this.selectedSizes.push(sizeFilter.size);
    this.getClothesBySize(sizeFilter);

  }

  deleteFilterBySize(sizeFilter: {size: string, isClicked: boolean}) {
    const index = this.selectedSizes.indexOf(sizeFilter.size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    }

    this.getClothesBySize(sizeFilter);
  }

  private getClothesBySize(sizeFilter: {size: string, isClicked: boolean}) {
    this.clothes$ = this.clothService.findClothes({size: this.selectedSizes});
    this.sizes.map(item => {
      if (item.size == sizeFilter.size) {
        return item.isClicked = !sizeFilter.isClicked 
      } else {
         return  item.isClicked;  
      } 
    });
  }

}
