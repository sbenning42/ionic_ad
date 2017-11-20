import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import {
  loginApi,
  logoutApi
} from './../../api/api';
import { HttpProvider } from './../http/http';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private token: string;
  private isLog: boolean;
  private isAdmin: boolean;

  private _token$: BehaviorSubject<string>;
  private _isAdmin$: BehaviorSubject<boolean>;
  private _isLog$: BehaviorSubject<boolean>;

  constructor(public http: HttpProvider) {
    this.token = undefined;
    this.isLog = false;
    this.isAdmin = false;
    this._token$ = new BehaviorSubject(this.token);
    this._isAdmin$ = new BehaviorSubject(this.isAdmin);
    this._isLog$ = new BehaviorSubject(this.isLog);
    this.init();
    console.log('Hello AuthProvider Provider');
  }

  public get token$(): Observable<string> { return this._token$.asObservable(); }
  public get isAdmin$(): Observable<boolean> { return this._isAdmin$.asObservable(); }
  public get isLog$(): Observable<boolean> { return this._isLog$.asObservable(); }

  private next() {
    this._token$.next(this.token);
    this._isAdmin$.next(this.isAdmin);
    this._isLog$.next(this.isLog);
  }

  private init() {
    const token = localStorage.getItem('token');
    const admin = +localStorage.getItem('admin');
    if (token) {
      console.log('Set log');
      this.log(token, admin ? true : false);
    } else {
      console.log('Set unlog');
      this.unlog();
    }
  }

  private log(token: string, isAdmin: boolean = false) {
      localStorage.setItem('token', token);
      localStorage.setItem('admin', (isAdmin ? 1 : 0) + '');
      this.token = token;
      this.isAdmin = isAdmin;
      this.isLog = true;
      this.next();
  }

  private unlog() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.token = undefined;
    this.isAdmin = false;
    this.isLog = false;
    this.next();
  }

  login(user: any): Observable<any> {
    return this.http.post(loginApi, user).do(response => this.log(response.token, response.admin));
  }

  logout()/*: Observable<any>*/ {
    this.unlog();
    // return this.http.post(logoutApi).do(response => this.unlog());
  }

}
