import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { ClientComponent } from './client.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { ProductsLayoutComponent } from './products/products-layout/products-layout.component';
import { DealerSignupComponent } from './dealer-signup/dealer-signup.component';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  // {
  //     path: 'admin',
  //     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // },
  // {
  //     path: 'admin',
  //     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dealer-signup', component: DealerSignupComponent },
  { path: 'contact-info', component: ContactInfoComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'pricing', component: PricingComponent },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'products',
    component: ProductsLayoutComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'contact-info', component: ContactInfoComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      { path: 'pricing', component: PricingComponent },
      // {
      //   path: 'dealer-signup',
      //   component: DealerSignupComponent,
      // },
    ],
  },
  // { path: '', component: HomeComponent },
  // { path: 'header', component: HomeComponent },
  // { path: 'home', component: HomeComponent },

  // { path: 'contact-info', component: ContactInfoComponent },
  // { path: 'contact-us', component: ContactUsComponent },
  // { path: 'about-us', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
