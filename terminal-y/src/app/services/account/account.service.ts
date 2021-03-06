import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  registration(user: IUser): Observable<any> {
    const route = `${environment.backendAddress}/users/add`
    return this.http.post<IUser>(route, user);
  }

  login(user: IUser): Observable<any> {
    const route = `${environment.backendAddress}/login`;
    return this.http.post<any>(route, user);
  }
}
