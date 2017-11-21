import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AccountPage } from '../pages/account/account';
import { GalleryPage } from '../pages/gallery/gallery';
import { StockPage } from '../pages/stock/stock';

import { ModalContactPage } from '../pages/modal-contact/modal-contact';

import { AccountAddressesPage } from '../pages/account-addresses/account-addresses';
import { AccountAddressePage } from '../pages/account-addresse/account-addresse';
import { AccountAvatarPage } from '../pages/account-avatar/account-avatar';
import { AccountChannelsPage } from '../pages/account-channels/account-channels';
import { AccountInformationsPage } from '../pages/account-informations/account-informations';
import { AccountProfilePage } from '../pages/account-profile/account-profile';

import { StockMasterPage } from '../pages/stock-master/stock-master';
import { StockAddPage } from '../pages/stock-add/stock-add';

import { GalleryArticlePage } from '../pages/gallery-article/gallery-article';
import { StockArticlePage } from '../pages/stock-article/stock-article';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';
import { AuthProvider } from '../providers/auth/auth';
import { ArticleProvider } from '../providers/article/article';
import { StockModeProvider } from '../providers/stock-mode/stock-mode';
import { SharedModeProvider } from '../providers/shared-mode/shared-mode';
import { AnnexeProvider } from '../providers/annexe/annexe';
import { ChannelsProvider } from '../providers/channels/channels';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AccountPage,
    GalleryPage,
    StockPage,
    ModalContactPage,
    AccountAddressesPage,
    AccountAddressePage,
    AccountAvatarPage,
    AccountChannelsPage,
    AccountInformationsPage,
    AccountProfilePage,
    StockMasterPage,
    StockAddPage,
    GalleryArticlePage,
    StockArticlePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AccountPage,
    GalleryPage,
    StockPage,
    ModalContactPage,
    AccountAddressesPage,
    AccountAddressePage,
    AccountAvatarPage,
    AccountChannelsPage,
    AccountInformationsPage,
    AccountProfilePage,
    StockMasterPage,
    StockAddPage,
    GalleryArticlePage,
    StockArticlePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    AuthProvider,
    ArticleProvider,
    StockModeProvider,
    SharedModeProvider,
    AnnexeProvider,
    ChannelsProvider
  ]
})
export class AppModule {}
