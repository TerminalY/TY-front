import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICloth } from 'src/app/models';
import { ClothesService } from 'src/app/services/clothes/clothes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  title = 'terminal-y';
  countCart = 0;
  countFavor = 0;
  accountName = undefined;
  searchValue = '';
  filterByType:{subtype: string, gender: string} = {subtype: '', gender: ''};
  
  filterSubtypeMen = [{name: 'Shirts', subtype: [{name: 'sleevless', isClicked: false}, {name: 'tshirts', isClicked: false}] },
                        {name: 'Jackets-coats', subtype: [{name:'coats', isClicked: false}, {name:'jackets', isClicked: false}] }];
  filterSubtypeMenSecond = [{name: 'Pants', subtype: [{name: 'sport-pants', isClicked: false}, {name: 'jeans', isClicked: false}] },
                        {name: 'Shoes', subtype: [{name:'sneakers-sports', isClicked: false}, {name: 'elegant', isClicked: false}] }];

  filterSubtypeWomen = [{name: 'Tops', subtype: [{name: 'tank-tops', isClicked: false}, {name: 'tshirts', isClicked: false}] },
                            {name: 'Jackets-coats', subtype: [{name:'coats', isClicked: false}, {name: 'jackets', isClicked: false}] }];

  filterSubtypeWomenSecond = [{name: 'Pants-skirts', subtype: [{name: 'jeans', isClicked: false}, {name: 'shorts', isClicked: false}] },
                            {name: 'Shoes', subtype: [{name:'sneakers', isClicked: false}, {name: 'heels', isClicked: false}] }];

  constructor(public clothService: ClothesService) {}

  ngOnInit(): void {
    this.accountName = localStorage.getItem('name');
  }

  changeCountCart(count) {
    this.countCart = count;
  }

  changeCountFavor(count) {
    this.countFavor = count;
  }

  logout() {
    localStorage.removeItem('name');
    location.reload();
  }

  onSearchChange(searchValue: string): void {  
    this.searchValue = searchValue;
  }

  getSubtypeClothes(item: any, name: string, gender: string) {  
    this.filterByType = {subtype: name, gender: gender};
    this.resetData(this.filterSubtypeMen);
    this.resetData(this.filterSubtypeMenSecond);
    this.resetData(this.filterSubtypeWomen);
    this.resetData(this.filterSubtypeWomenSecond);
    (<HTMLInputElement>document.getElementById('searchItem')).value = '';
    this.searchValue = '';
    item.isClicked = true;
  }

  deleteSubtypeClothes(item: any) {
    this.filterByType = {subtype: '', gender: ''};
    (<HTMLInputElement>document.getElementById('searchItem')).value = '';
    this.searchValue = '';
    item.isClicked = false;
  }

  private resetData(itemArray: any) {
    itemArray.map(item=> item.subtype.map(subtype => subtype.isClicked = false));
  }
}
