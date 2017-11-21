import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpProvider } from './../http/http';
import { channelsApi } from './../../api/api';

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

}
