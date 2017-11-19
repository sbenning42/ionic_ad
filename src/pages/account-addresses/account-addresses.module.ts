import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountAddressesPage } from './account-addresses';

@NgModule({
  declarations: [
    AccountAddressesPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountAddressesPage),
  ],
})
export class AccountAddressesPageModule {}
