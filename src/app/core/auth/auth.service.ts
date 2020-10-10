import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../shared/models';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userState$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  public currentUser$ = this.userState$;
  public authenticated$ = this.authenticatedState$;

  constructor(
    private jwtHelper: JwtHelperService,
    private userService: UserService
  ) {
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      const expired = this.jwtHelper.isTokenExpired();
      if (expired) {
        this.authenticatedState$.next(false);
      } else {
        const user = this.jwtHelper.decodeToken(
          localStorage.getItem(environment.auth.tokenName)
        )
        this.authenticatedState$.next(true);
        this.currentUser$.next(user);
      }
      resolve();
      // ////do your initialisation stuff here
      // setTimeout(() => {
      //     console.log('AppInitService Finished');
      //     resolve();
      // }, 2000);
    });
  }

  public login(authData: User): Observable<any> {
    return this.userService.login(authData)
      .pipe(
        map((res) => {
          const token = res.headers.get('authorization').replace('Bearer', '');
          localStorage.setItem(environment.auth.tokenName, token);
          const user = res.body;
          this.userState$.next(user);
          this.authenticatedState$.next(true);
          return user;
        })
      );
  }

  public register(authData: User): Observable<any> {
    return this.userService.register(authData);
  }

  public signOut() {
    this.userService.signOut().subscribe(() => {
      localStorage.removeItem(environment.auth.tokenName);
      this.userState$.next(null);
      this.authenticatedState$.next(false);
    });
  }

  public setToken(token: string) {
    if (!this.jwtHelper.isTokenExpired(token)) {
      localStorage.setItem(environment.auth.tokenName, token);
      const user: User = this.jwtHelper.decodeToken(token);
      this.userState$.next(user);
      this.authenticatedState$.next(true);
    } else {
      this.userState$.next(null);
      this.authenticatedState$.next(false);
    }
  }

  private getToken(): Observable<string> {
    return of(localStorage.getItem(environment.auth.tokenName));
  }
}