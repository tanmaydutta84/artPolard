import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "./layouts/header/header.component";
import { SidebarComponent } from "./layouts/sidebar/sidebar.component";
import { AllMaterialModule } from '../shared/All-material-module';
import { InitUserService } from './services/init-user.service';

@NgModule({
  declarations: [
    // HeaderComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,

    AllMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CommonModule]
})
export class ThemeModule {
  static forRoot() {
    return {
      ngModule: ThemeModule,
      providers: [
        InitUserService,
      ],
    };
  }
}
