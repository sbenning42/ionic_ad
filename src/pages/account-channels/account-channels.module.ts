import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountChannelsPage } from './account-channels';

@NgModule({
  declarations: [
    AccountChannelsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountChannelsPage),
  ],
})
export class AccountChannelsPageModule {}
