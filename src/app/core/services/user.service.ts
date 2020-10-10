import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of as ObservableOf} from 'rxjs';

import { API } from '../../shared/utils';
import { User } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpService: HttpClient
  ) {
  }

  public login(authData: User): Observable<any> {
    return this.httpService.post(`${API.Url}/login`, { user: authData }, {
      responseType: 'json',
      observe: 'response'
    });
  }

  public register(authData: User): Observable<any> {
    return this.httpService.post(`${API.Url}/users/sign_up`, authData, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public signOut(): Observable<any> {
    return ObservableOf(true);
  }
}
