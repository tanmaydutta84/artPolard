import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AllMaterialModule } from '../shared/All-material-module';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../@theme/layouts/header/header.component';
import { SidebarComponent } from '../@theme/layouts/sidebar/sidebar.component';
import { CommonDialogComponent } from './common/common-dialog/common-dialog.component';
import { QuoteByPhoneComponent } from './common/quote-by-phone/quote-by-phone.component';
import { RequestQuoteComponent } from './common/request-quote/request-quote.component';
import { AdminAuthGuardService } from '../core/auth-guard/admin-auth-guard.service';
import { CustomerServiceAuthGuardService } from '../core/auth-guard/customer-service-auth-guard.service';
// import { AuthGuard } from '../services/auth-guard.services';
@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidebarComponent,
    CommonDialogComponent,
    QuoteByPhoneComponent,
    RequestQuoteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,

    AllMaterialModule,
    SharedModule,
    FlexLayoutModule,
    ThemeModule
  ],
  providers: [AdminAuthGuardService, CustomerServiceAuthGuardService],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
