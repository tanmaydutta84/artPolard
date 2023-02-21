import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAuthGuardService } from '../../core/auth-guard/client-auth-guard.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LogoComponent } from './logo/logo.component';
import { ServiceProviderComponent } from './service-provider.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderComponent,
    canActivate: [ClientAuthGuardService],
    canActivateChild: [ClientAuthGuardService],
    children: [
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'logo', component: LogoComponent },
    ],
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('../admin/dashboard/dashboard.module').then((m) => m.DashboardModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
