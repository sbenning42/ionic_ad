import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { HttpProvider } from './../http/http';
import { ArticleProvider } from './../article/article';
import { ChannelsProvider } from './../channels/channels';
import { Article } from './../../models/article';

/*
  Generated class for the ArticlesStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticlesStorageProvider {

  private count: number;
  private miss: number;
  private got: number;
  private iSub: Subscription;
  private pageOptions: PageOptions;
  private articles: Article[];
  private articles$: BehaviorSubject<Article[]>;

  constructor(
    public http: HttpProvider,
    public articlesProvider: ArticleProvider,
    public channelsProvider: ChannelsProvider
  ) {
    this.articles = [];
    this.articles$ = new BehaviorSubject(this.articles);
    this.reset('all');
    console.log('Hello ArticlesStorageProvider Provider');
  }

  get(): Observable<Article[]> {
    return this.articles$.asObservable();
  }

  reset(sort: string) {
    if (this.iSub) { this.iSub.unsubscribe(); }
    this.pageOptions = new PageOptions(20, 0, sort);
    this.articles = [];
    this.iSub = this.articlesProvider.getApiArticles(this.pageOptions).subscribe(
      response => {
        this.count = response.count;
        this.miss = this.count - this.pageOptions.pageSize;
        this.got = this.pageOptions.pageSize;
        this.pageOptions.nextPage();
        const nextPageContent = response.products.map(p => Article.clone(p));
        console.log('NextPageContent: ' + nextPageContent);
        this.articles = this.articles.concat(nextPageContent);
        console.log('Nexting ' + this.articles);
        this.articles$.next(this.articles);
      },
      error => {}
    );
  }

  nextPage() {
    if (this.count < 0) { return ; }
    if (this.iSub) { this.iSub.unsubscribe(); }
    console.log('Loading next page');
    this.iSub = this.articlesProvider.getApiArticles(this.pageOptions).subscribe(
      response => {
        this.miss -= this.pageOptions.pageSize;
        this.got += this.pageOptions.pageSize;
        this.pageOptions.nextPage();
        this.articles = this.articles.concat(response.products.map(p => Article.clone(p)));
        console.log('Nexting');
        this.articles$.next(this.articles);
      },
      error => {}
    );
  }

  publish(article: Article, channel) {
    this.channelsProvider.post(article, channel).subscribe(
      response => {
        const i = this.articles.findIndex(a => +a.id === +response.id);
        this.articles[i] = Article.clone(response);
        this.articles$.next(this.articles);
      }
    );
  }

}

class SharedCollection {

  public count: number;
  public miss: number;
  public got: number;
  public iSub: Subscription;
  
  public pageOptions: PageOptions;
  public articles: Article[];
  public articles$: BehaviorSubject<Article[]>;

  constructor(
    public http: HttpProvider,
    public articlesProvider: ArticleProvider,
    public key: string
  ) {
    this.articles = [];
    this.articles$ = new BehaviorSubject(this.articles);
  }

  get() {
    return this.articlesProvider.getApiArticles(this.pageOptions).do(response => {
      
    });
  }

  nextPage() {
    this.pageOptions.nextPage();
  }
}

class PageOptions {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public sort: string
  ) { }

  nextPage() {
    this.pageIndex += 1;
  }
}
