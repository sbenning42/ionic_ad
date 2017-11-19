import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountAddressePage } from './account-addresse';

@NgModule({
  declarations: [
    AccountAddressePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountAddressePage),
  ],
})
export class AccountAddressePageModule {}
