import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './@auth/admin-login/admin-login.component';
import { CustomerServiceLoginComponent } from './@auth/customer-service-login/customer-service-login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AdminAuthGuardService } from './core/auth-guard/admin-auth-guard.service';
import { ClientAuthGuardService } from './core/auth-guard/client-auth-guard.service';
import { CustomerServiceAuthGuardService } from './core/auth-guard/customer-service-auth-guard.service';
import { AuthGuard } from './services/auth-guard.services';
// import { SpinnerComponent } from './shared/spinner.component';
import { AuthInterceptor } from './_helpers/interceptors/auth.interceptor';

const routes: Routes = [
  // { path: 'spinner', component: SpinnerComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'customer-service-login', component: CustomerServiceLoginComponent },
  {
    path: '',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule)
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    }),
  ],
  exports: [RouterModule],
  providers: [AdminAuthGuardService, ClientAuthGuardService, CustomerServiceAuthGuardService, AuthInterceptor]
})
export class AppRoutingModule { }
