import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AlertController } from 'ionic-angular';

import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { GalleryPage } from '../pages/gallery/gallery';
import { StockPage } from '../pages/stock/stock';
import { User } from '../models/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  isLog: boolean;
  user = new User();

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, niy?: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
    private alertCtrl: AlertController
    
  ) {
    this.initializeApp();
    this.makeMenu();
    console.log('isLog: ' + this.isLog);
  }

  makeUserMenu() {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Account', component: AccountPage, niy: '-- Not Implemented Yet --' },
      { title: 'Gallery', component: GalleryPage },
      { title: 'Stock', component: StockPage },
      { title: 'Logout', component: HomePage },
    ];
  }

  makeVisitorMenu() {
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  makeMenu() {
    this.auth.isLog$.subscribe(
      isLog => (this.isLog = isLog) ? this.makeUserMenu() : this.makeVisitorMenu()
    );
  }

  login() {
    if (!this.user.email || !this.user.password) { return ; }
    this.auth.login(this.user).subscribe(
      response => {},
      error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.errors,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.niy) { return ; }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === 'Logout') {
      this.auth.logout();
    } else {
      this.nav.setRoot(page.component);
    }
  }

}
