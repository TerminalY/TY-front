import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IClothFilter, IClothProperties } from '../../models/index';

@Injectable({
  providedIn: 'root'
})

export class ClothesService {

  constructor(private http: HttpClient) { }

  findClothes(cloth: IClothFilter): Observable<any> {
    const route = `${environment.backendAddress}/clothes`

    let params = new HttpParams();
    
    Object.keys(cloth).forEach(key => {
      if(cloth[key] != undefined) {
        if ((key === 'size' || key === 'color') && cloth[key].length > 1) {
          // params = params.set(key, cloth[key]);
          cloth[key].forEach(item => {
            params = params.append(key,item);
          })
        } else {
          params = params.set(key, cloth[key]);
        }
      }
    });

    return this.http.get(route, {
      params
    });
  }

  getCartByEmail(email: string): Promise<any> {
    const route = `${environment.backendAddress}/users/${email}/getCart`;
    return this.http.get(route).toPromise();
  }

  addToCart(email: string, userChosen: IClothProperties): Observable<any> {
    const route = `${environment.backendAddress}/users/${email}/addToCart`;
    return this.http.post<any>(route, userChosen);
  }

  deleteFromCart(email: string, clothID): Promise<any> {
    const route = `${environment.backendAddress}/cart/deleteitem`;
    let params = new HttpParams();
    params = params.set('email', email);
    params = params.set('id', clothID);
    return this.http.get(route, {params}).toPromise();
  }
}

