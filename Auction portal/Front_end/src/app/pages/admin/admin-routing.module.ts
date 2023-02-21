import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { DealerSignupComponent } from '../client/dealer-signup/dealer-signup.component';
import { AdminComponent } from './admin.component';
import { PageNotFoundComponent } from '../../component/page-not-found/page-not-found.component';
import { LookAndFeelComponent } from './look-and-feel/look-and-feel.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AddDealerComponent } from './dealer/add-dealer/add-dealer.component';
import { DealerLogoComponent } from './dealer/dealer-logo/dealer-logo.component';
import { CustomerServiceAccountComponent } from './customer-service-account/customer-service-account.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AuthGuard } from 'src/app/services/auth-guard.services';
import { AdminAuthGuardService } from 'src/app/core/auth-guard/admin-auth-guard.service';
import { ItemListComponent } from './item-list/item-list.component';
import { ActiveAuctionComponent } from './active-auction/active-auction.component';

const routes: Routes = [
  // { path: '', component: AdminLoginComponent },
  {
    // outlet: 'outletAdmin',
    path: '',
    component: AdminComponent,
    canActivateChild: [AdminAuthGuardService],
    children: [
      { path: 'lookandfeel', component: LookAndFeelComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'add-dealer', component: AddDealerComponent },
      { path: 'dealer-logo', component: DealerLogoComponent },
      { path: 'customer-account', component: CustomerServiceAccountComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'category-list/:id', component: ItemListComponent },
      { path: 'auction', component: ActiveAuctionComponent },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AdminAuthGuardService],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
