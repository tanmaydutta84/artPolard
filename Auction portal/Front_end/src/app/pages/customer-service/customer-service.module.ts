import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerServiceRoutingModule } from './customer-service-routing.module';
import { CustomerServiceComponent } from '../customer-service/customer-service.component';
import { AllMaterialModule } from '../../shared/All-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { SharedModule } from '../../shared/shared.module';
import { LookAndFeelComponent } from './look-and-feel/look-and-feel.component';
import { DealerLogoComponent, LogoEditDialogComponent } from './dealer/dealer-logo/dealer-logo.component';
import { AddDealerComponent } from './dealer/add-dealer/add-dealer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SettingProfileLeftComponent } from './account-settings/account-settings-component/setting-profile-left/setting-profile-left.component';
import { SettingsTabsComponent } from './account-settings/account-settings-component/settings-tabs/settings-tabs.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AdminAuthGuardService } from 'src/app/core/auth-guard/admin-auth-guard.service';
import { CustomerServiceAuthGuardService } from 'src/app/core/auth-guard/customer-service-auth-guard.service';

@NgModule({
  declarations: [
    CustomerServiceComponent,
    HeaderComponent,
    SidebarComponent,
    LookAndFeelComponent,
    LogoEditDialogComponent,
    DealerLogoComponent,
    AddDealerComponent,
    AddProductComponent,
    AccountSettingsComponent,
    SettingProfileLeftComponent,
    SettingsTabsComponent,
  ],
  imports: [
    CommonModule,
    CustomerServiceRoutingModule,

    AllMaterialModule,
    SharedModule,
    FlexLayoutModule,

    NgxMatColorPickerModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CustomerServiceAuthGuardService,
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerServiceModule { }
