import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';
import { ServiceProviderComponent } from './service-provider.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SettingProfileLeftComponent } from './account-settings/account-settings-component/setting-profile-left/setting-profile-left.component';
import { SettingsTabsComponent } from './account-settings/account-settings-component/settings-tabs/settings-tabs.component';
import { LogoComponent } from './logo/logo.component';
import { AllMaterialModule } from '../../shared/All-material-module';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ClientAuthGuardService } from '../../core/auth-guard/client-auth-guard.service';
@NgModule({
  declarations: [
    ServiceProviderComponent,
    HeaderComponent,
    SidebarComponent,
    AccountSettingsComponent,
    SettingProfileLeftComponent,
    SettingsTabsComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    ServiceProviderRoutingModule,

    AllMaterialModule,
    SharedModule,
    FlexLayoutModule,

    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [ClientAuthGuardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServiceProviderModule { }
