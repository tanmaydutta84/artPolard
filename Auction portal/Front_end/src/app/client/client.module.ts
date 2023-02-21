import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HomeComponent } from '../client/home/home.component';
// import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from '../component/header/header.component';
import { LoginComponent } from '../client/login/login.component';
import { RegisterComponent } from '../client/register/register.component';
import { ContactInfoComponent } from '../client/contact-info/contact-info.component';
import { ContactUsComponent } from '../client/contact-us/contact-us.component';
import { AboutUsComponent } from '../client/about-us/about-us.component';
import { ClientRoutingModule } from './client-routing.module';
import { AllMaterialModule } from '../shared/All-material-module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSidebarComponent } from './products/product-sidebar/product-sidebar.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsLayoutComponent } from './products/products-layout/products-layout.component';
import { DealerSignupComponent } from './dealer-signup/dealer-signup.component';
import { PricingComponent } from './pricing/pricing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ContactInfoComponent,
    ContactUsComponent,
    AboutUsComponent,
    ProductDetailsComponent,
    ProductSidebarComponent,
    ProductListComponent,
    ProductsLayoutComponent,
    DealerSignupComponent,
    PricingComponent
  ],
  imports: [
    ClientRoutingModule,
    AllMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    IvyCarouselModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientModule { }
