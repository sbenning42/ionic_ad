import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Article } from './../../models/article';
import { HttpProvider } from './../http/http';
import { channelsApi, channelsPublishApi } from './../../api/api';

/*
  Generated class for the ChannelsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChannelsProvider {

  constructor(public http: HttpProvider) {
    console.log('Hello ChannelsProvider Provider');
  }

  get(): Observable<any[]> {
    return this.http.get(channelsApi);
  }

  post(article: Article, channel): Observable<any> {
    return this.http.post(channelsPublishApi, { product: { id: article.id }, marketplace: channel.name });
  }

}
