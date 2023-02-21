import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AllMaterialModule } from '../../shared/All-material-module';

import { DealerRoutingModule } from './dealer-routing.module';
import { DealerComponent } from './dealer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SettingProfileLeftComponent } from './account-settings/account-settings-component/setting-profile-left/setting-profile-left.component';
import { SettingsTabsComponent } from './account-settings/account-settings-component/settings-tabs/settings-tabs.component';
import { ActiveAuctionComponent } from './active-auction/active-auction.component';
import { AllAuctionComponent } from './active-auction/active-auction-component/all-auction/all-auction.component';
import { SoldItemsComponent } from './active-auction/active-auction-component/sold-items/sold-items.component';
import { PastBuyerComponent } from './active-auction/active-auction-component/past-buyer/past-buyer.component';
import { AuctionActiveComponent } from './active-auction/active-auction-component/auction-active/auction-active.component';
import { LogoComponent } from './logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SpinnerComponent } from '../../shared/spinner.component';
import { EditInventoryItemComponent } from './edit-inventory-item/edit-inventory-item.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ClientAuthGuardService } from '../../core/auth-guard/client-auth-guard.service';
import { AddProductComponent } from './add-product/add-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [
    DealerComponent,
    HeaderComponent,
    SidebarComponent,
    AccountSettingsComponent,
    SettingProfileLeftComponent,
    SettingsTabsComponent,
    ActiveAuctionComponent,
    AllAuctionComponent,
    SoldItemsComponent,
    PastBuyerComponent,
    AuctionActiveComponent,
    LogoComponent,
    InventoryComponent,
    InventoryListComponent,
    InventoryViewComponent,
    EditInventoryItemComponent,
    AddProductComponent
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    DealerRoutingModule,

    AllMaterialModule,
    SharedModule,
    FlexLayoutModule,

    ReactiveFormsModule,
    FormsModule,
    IvyCarouselModule,
    CKEditorModule,
    NgxDropzoneModule
  ],
  providers: [ClientAuthGuardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DealerModule { }
