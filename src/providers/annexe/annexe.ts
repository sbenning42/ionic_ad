import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpProvider } from './../http/http';
import { annexeApi } from './../../api/api';

/*
  Generated class for the AnnexeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnnexeProvider {

  annexe$: Observable<any>;

  constructor(public http: HttpProvider) {
    console.log('Hello AnnexeProvider Provider');
  }

  private makeStream(): Observable<any> {
    return this.http.get(annexeApi).do(annexe => this.annexe$ = Observable.of(annexe));
  }

  get(): Observable<any> {
    return this.annexe$ ? this.annexe$ : this.makeStream();
  }

}
