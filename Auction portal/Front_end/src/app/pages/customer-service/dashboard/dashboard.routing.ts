import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from '../../../core/auth-guard/admin-auth-guard.service';
import { DealerSignupComponent } from '../../../client/dealer-signup/dealer-signup.component';
import { CustomerServiceComponent } from '../customer-service.component';

import { DashboardComponent } from './dashboard.component';
import { CustomerServiceAuthGuardService } from 'src/app/core/auth-guard/customer-service-auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: CustomerServiceComponent,
    canActivate: [CustomerServiceAuthGuardService],
    children: [
      { path: '', component: DashboardComponent },
      // { path: 'dealer-signup', component: DealerSignupComponent },
      // {
      //   path: '',
      //   redirectTo: 'admin-login/dashboard',
      //   pathMatch: 'full'
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
