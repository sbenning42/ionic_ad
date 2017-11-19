import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountInformationsPage } from './account-informations';

@NgModule({
  declarations: [
    AccountInformationsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountInformationsPage),
  ],
})
export class AccountInformationsPageModule {}
