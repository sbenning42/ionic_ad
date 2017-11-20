import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { stockApi, sharedApi } from './../../api/api'
import { HttpProvider } from './../http/http';
import { Article } from './../../models/article';

/*
  Generated class for the ArticleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticleProvider {

  constructor(
    public http: HttpProvider
  ) {
    console.log('Hello ArticleProvider Provider');
  }

  getApiArticles(pageOptions): Observable<any> {
    return this.http.post(stockApi, pageOptions);
  }

  getApiSharedArticles(pageOptions): Observable<any> {
    return this.http.post(sharedApi, pageOptions); 
  }
}
