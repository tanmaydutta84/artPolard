import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMaterialModule } from '../../../shared/All-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { TableComponent, UserStatusDialogComponent, ViewDetailDialogComponent } from './dashboard-components/table/table.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent,
    ViewDetailDialogComponent,
    UserStatusDialogComponent
  ],
  imports: [
    CommonModule,
    AllMaterialModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  entryComponents: [
    ViewDetailDialogComponent,
    UserStatusDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
