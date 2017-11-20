import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AccountPage } from '../pages/account/account';
import { GalleryPage } from '../pages/gallery/gallery';
import { StockPage } from '../pages/stock/stock';

import { AccountAddressesPage } from '../pages/account-addresses/account-addresses';
import { AccountAddressePage } from '../pages/account-addresse/account-addresse';
import { AccountAvatarPage } from '../pages/account-avatar/account-avatar';
import { AccountChannelsPage } from '../pages/account-channels/account-channels';
import { AccountInformationsPage } from '../pages/account-informations/account-informations';
import { AccountProfilePage } from '../pages/account-profile/account-profile';

import { StockAllPage } from '../pages/stock-all/stock-all';
import { StockCreationPage } from '../pages/stock-creation/stock-creation';
import { StockPendingPage } from '../pages/stock-pending/stock-pending';
import { StockSoldPage } from '../pages/stock-sold/stock-sold';
import { StockAddPage } from '../pages/stock-add/stock-add';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';
import { AuthProvider } from '../providers/auth/auth';
import { ArticleProvider } from '../providers/article/article';
import { StockModeProvider } from '../providers/stock-mode/stock-mode';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AccountPage,
    GalleryPage,
    StockPage,
    AccountAddressesPage,
    AccountAddressePage,
    AccountAvatarPage,
    AccountChannelsPage,
    AccountInformationsPage,
    AccountProfilePage,
    StockAllPage,
    StockCreationPage,
    StockPendingPage,
    StockSoldPage,
    StockAddPage,
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
    AccountAddressesPage,
    AccountAddressePage,
    AccountAvatarPage,
    AccountChannelsPage,
    AccountInformationsPage,
    AccountProfilePage,
    StockAllPage,
    StockCreationPage,
    StockPendingPage,
    StockSoldPage,
    StockAddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    AuthProvider,
    ArticleProvider,
    StockModeProvider
  ]
})
export class AppModule {}
