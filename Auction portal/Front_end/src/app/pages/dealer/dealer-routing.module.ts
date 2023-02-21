import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerComponent } from './dealer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ActiveAuctionComponent } from './active-auction/active-auction.component';
import { LogoComponent } from './logo/logo.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { ClientAuthGuardService } from '../../core/auth-guard/client-auth-guard.service';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: DealerComponent,
    canActivate: [ClientAuthGuardService],
    canActivateChild: [ClientAuthGuardService],
    children: [

      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'active-auction', component: ActiveAuctionComponent },
      { path: 'logo', component: LogoComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'inventory-list', component: InventoryListComponent },
      { path: 'inventory-list/:id', component: InventoryViewComponent },
      { path: 'add-product', component: AddProductComponent }
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
export class DealerRoutingModule { }
