import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from '../core/auth-guard/admin-auth-guard.service';
import { ClientAuthGuardService } from '../core/auth-guard/client-auth-guard.service';
import { CustomerServiceAuthGuardService } from '../core/auth-guard/customer-service-auth-guard.service';
import { AuthGuard } from '../services/auth-guard.services';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'admin-login',
      canActivate: [AdminAuthGuardService],
      loadChildren: () =>
        import('./admin/admin.module').then((m) => m.AdminModule),
    },
    {
      path: 'customer-service',
      canActivate: [CustomerServiceAuthGuardService],
      loadChildren: () =>
        import('./customer-service/customer-service.module').then((m) => m.CustomerServiceModule),
    },
    {
      path: 'dealer',
      canActivate: [ClientAuthGuardService],
      loadChildren: () =>
        import('./dealer/dealer.module').then((m) => m.DealerModule),
    },
    {
      path: 'manufacturer',
      canActivate: [ClientAuthGuardService],
      loadChildren: () =>
        import('./manufacturer/manufacturer.module').then((m) => m.ManufacturerModule)
    },
    {
      path: 'service-provider',
      canActivate: [ClientAuthGuardService],
      loadChildren: () =>
        import('./service-provider/service-provider.module').then((m) => m.ServiceProviderModule)
    },
    {
      path: '',
      redirectTo: '/',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
