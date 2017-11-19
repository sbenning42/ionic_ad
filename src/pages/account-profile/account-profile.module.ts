import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountProfilePage } from './account-profile';

@NgModule({
  declarations: [
    AccountProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountProfilePage),
  ],
})
export class AccountProfilePageModule {}
