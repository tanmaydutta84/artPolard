import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './accordion';
import { MenuItems } from './menu-items/menu-items';
@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
  ],
  providers: [MenuItems],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
