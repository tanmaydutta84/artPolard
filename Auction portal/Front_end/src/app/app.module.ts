import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { AllMaterialModule } from './shared/All-material-module';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from './services/auth-guard.services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SharedService } from './services/shared.service';
import { AdminLoginComponent } from './@auth/admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerServiceLoginComponent } from './@auth/customer-service-login/customer-service-login.component';
// import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminAuthGuardService } from './core/auth-guard/admin-auth-guard.service';
import { ClientAuthGuardService } from './core/auth-guard/client-auth-guard.service';
import { CustomerServiceAuthGuardService } from './core/auth-guard/customer-service-auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    AdminLoginComponent,
    CustomerServiceLoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AllMaterialModule,
    NgxMatColorPickerModule,
    ThemeModule.forRoot(),
    CommonModule,
    FlexLayoutModule,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      // preventDuplicates: true,
      // positionClass: "toast-bottom-right",
    }),
    FormsModule,
    ReactiveFormsModule,
    // IvyCarouselModule
    NgxSpinnerModule
  ],
  exports: [CommonModule],
  providers: [
    SharedService,
    AdminAuthGuardService,
    ClientAuthGuardService,
    CustomerServiceAuthGuardService,
    CookieService,
    // LoaderService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // {provide: APP_BASE_HREF, useValue: '/AuctionSite/'}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
