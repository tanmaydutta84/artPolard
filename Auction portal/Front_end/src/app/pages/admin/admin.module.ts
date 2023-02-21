import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
// import { AdminLoginComponent } from './admin-login/admin-login.component';
// import { DealerSignupComponent } from '../client/dealer-signup/dealer-signup.component';
// import { FullComponent } from './layouts/full/full.component';
import { AdminComponent } from './admin.component';
// import { HeaderComponent } from './layouts/header/header.component';
// import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AllMaterialModule } from '../../shared/All-material-module';
// import { SpinnerComponent } from '../../services/spinner.component';
import { PageNotFoundComponent } from '../../component/page-not-found/page-not-found.component';
import { LookAndFeelComponent } from './look-and-feel/look-and-feel.component';
import { AddProductComponent } from './add-product/add-product.component';
// import { TableComponent } from './dashboard/dashboard-components/table/table.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SettingsTabsComponent } from './account-settings/account-settings-component/settings-tabs/settings-tabs.component';
import { SettingProfileLeftComponent } from './account-settings/account-settings-component/setting-profile-left/setting-profile-left.component';
import { AddDealerComponent } from './dealer/add-dealer/add-dealer.component';
import { DealerLogoComponent, LogoEditDialogComponent } from './dealer/dealer-logo/dealer-logo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerServiceAccountComponent, CustomerFormDialog, CustomerStatusDialogComponent } from './customer-service-account/customer-service-account.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddSubCategoryComponent } from './category/add-sub-category/add-sub-category.component';
import { AddSubSubCategoryComponent } from './category/add-sub-sub-category/add-sub-sub-category.component';
import { AuthGuard } from 'src/app/services/auth-guard.services';
import { AdminAuthGuardService } from 'src/app/core/auth-guard/admin-auth-guard.service';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuctionActiveComponent } from './active-auction/active-auction-component/auction-active/auction-active.component';
import { ActiveAuctionComponent } from './active-auction/active-auction.component';
import { AllAuctionComponent } from './active-auction/active-auction-component/all-auction/all-auction.component';
import { PastBuyerComponent } from './active-auction/active-auction-component/past-buyer/past-buyer.component';
import { SoldItemsComponent } from './active-auction/active-auction-component/sold-items/sold-items.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    AdminComponent,
    // AdminLoginComponent,
    // DealerSignupComponent,
    // AdminComponent,
    HeaderComponent,
    SidebarComponent,
    // SidebarComponent,
    PageNotFoundComponent,
    LookAndFeelComponent,
    AddProductComponent,
    AccountSettingsComponent,
    SettingsTabsComponent,
    SettingProfileLeftComponent,
    AddDealerComponent,
    DealerLogoComponent,
    LogoEditDialogComponent,
    CustomerServiceAccountComponent,
    CustomerFormDialog,
    CustomerStatusDialogComponent,
    CategoryListComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    AddSubSubCategoryComponent,
    EditCategoryComponent,
    ItemListComponent,
    ActiveAuctionComponent,
    AllAuctionComponent,
    AuctionActiveComponent,
    PastBuyerComponent,
    SoldItemsComponent
    // TableComponent    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    AllMaterialModule,
    SharedModule,
    FlexLayoutModule,

    NgxMatColorPickerModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [
    AdminAuthGuardService,
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ],
  entryComponents: [
    LogoEditDialogComponent,
    CustomerFormDialog,
    CustomerServiceAccountComponent,
    CustomerStatusDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
