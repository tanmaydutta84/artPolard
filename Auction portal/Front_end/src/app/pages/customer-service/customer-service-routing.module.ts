import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerServiceAuthGuardService } from 'src/app/core/auth-guard/customer-service-auth-guard.service';
import { AdminAuthGuardService } from '../../core/auth-guard/admin-auth-guard.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CustomerServiceComponent } from './customer-service.component';
import { AddDealerComponent } from './dealer/add-dealer/add-dealer.component';
import { DealerLogoComponent } from './dealer/dealer-logo/dealer-logo.component';
import { LookAndFeelComponent } from './look-and-feel/look-and-feel.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerServiceComponent,
    canActivate: [CustomerServiceAuthGuardService],
    canActivateChild: [CustomerServiceAuthGuardService],
    children: [
      { path: 'lookandfeel', component: LookAndFeelComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'add-dealer', component: AddDealerComponent },
      { path: 'dealer-logo', component: DealerLogoComponent },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [CustomerServiceAuthGuardService],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServiceRoutingModule { }
