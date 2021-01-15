import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IClothFilter } from '../../models/index';

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
        if (cloth.size.length > 1) {
          // params = params.set(key, cloth[key]);
          cloth.size.forEach(item => {
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
}

