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
 

  sizes =  [{size:'XS', isClicked: false}, {size:'S', isClicked: false}, {size:'M', isClicked: false}, {size:'L', isClicked: false}, 
  {size:'XL', isClicked: false}, {size:'XXL', isClicked: false} ];
  colors = [{color:'#6b676b', isClicked: false}, {color:'#f587d8', isClicked: false}, {color:'#5ca83e', isClicked: false}, {color:'#2990ff', isClicked: false}, 
  {color:'#ffffff', isClicked: false}, {color:'#292929', isClicked: false}];

  // slider variables
  max = 1000;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  filterParams: IClothFilter = {};
  selectedSizes = [];
  selectedColors = [];

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

  cleanAllFilter() {
    this.clothes$ = this.clothService.findClothes({});
    this.sizes =  [{size:'XS', isClicked: false}, {size:'S', isClicked: false}, {size:'M', isClicked: false}, {size:'L', isClicked: false}, 
    {size:'XL', isClicked: false}, {size:'XXL', isClicked: false} ];
    this.colors = [{color:'#6b676b', isClicked: false}, {color:'#f587d8', isClicked: false}, {color:'#5ca83e', isClicked: false}, {color:'#2990ff', isClicked: false}, 
    {color:'#ffffff', isClicked: false}, {color:'#292929', isClicked: false}];
    this.selectedSizes = [];
    this.selectedColors = [];
    this.value = 0;
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

  filterByColor(colorFilter: {color: string, isClicked: boolean}) {
    this.selectedColors.push(colorFilter.color);
    this.getClothesByColor(colorFilter);
  }

  deleteFilterByColor(colorFilter: {color: string, isClicked: boolean}) {
    const index = this.selectedColors.indexOf(colorFilter.color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    }

    this.getClothesByColor(colorFilter);
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
    this.value > 0 ? this.clothes$ = this.clothService.findClothes({size: this.selectedSizes, color: this.selectedColors, minPrice: 0, maxPrice: this.value}) :
    this.clothes$ = this.clothService.findClothes({size: this.selectedSizes, color: this.selectedColors})
    this.sizes.map(item => {
      if (item.size == sizeFilter.size) {
        return item.isClicked = !sizeFilter.isClicked 
      } else {
         return  item.isClicked;  
      } 
    });
  }

  private getClothesByColor(colorFilter: {color: string, isClicked: boolean}) {
    this.value > 0 ? this.clothes$ = this.clothService.findClothes({size: this.selectedSizes, color: this.selectedColors, minPrice: 0, maxPrice: this.value}) :
    this.clothes$ = this.clothService.findClothes({size: this.selectedSizes, color: this.selectedColors})
    this.colors.map(item => {
      if (item.color == colorFilter.color) {
        return item.isClicked = !colorFilter.isClicked 
      } else {
         return  item.isClicked;  
      } 
    });
  }

  valueChanged($event) {
    this.clothes$ = this.clothService.findClothes({size: this.selectedSizes, color: this.selectedColors, minPrice: 0, maxPrice: $event.value });
  }

}
