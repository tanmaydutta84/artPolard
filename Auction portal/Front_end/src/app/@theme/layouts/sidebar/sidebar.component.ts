import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  role = "Admin";
  role1 = "Dealer";
  adminMenu: any = [];
  businessTypeMenu: any = [];

  mobileQuery: MediaQueryList;
  finalMenu: any = [];
  private _mobileQueryListener: () => void;
  userId: any;
  loggedInBusinessType: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public route: Router,
    public apiService: ApiService,
    public toastar: ToastrService,
    public sharedService: SharedService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.userId = localStorage.getItem('userId');
    this.loggedInBusinessType = localStorage.getItem('businessType');
    // Set side menus
    if (localStorage.getItem('role1') == 'Dealer') {
      this.sideMenusBusinesstype();
    } else if (localStorage.getItem('role') == 'Admin') {
      this.sideMenusAdmin();
    } else if (localStorage.getItem('isCustomerLoggedIn') == 'true') {      
      this.sideMenuCustomerService();
    }
  }

  ngOnInit() {
    // Set side menus
    // if (localStorage.getItem('isLoggedIn') == 'true') {
    //   this.sideMenusBusinesstype();
    // }
    // if (localStorage.getItem('isAdminLoggedIn') == 'true') {
    //   this.sideMenusAdmin();
    // }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  sideMenusAdmin() {
    // this.apiService.userById(this.userId).subscribe((res) => {
    //   if (res?.data[0]?.Business_type == this.loggedInBusinessType) {
    // if (localStorage.getItem('isAdminLoggedIn') == 'true') {
    //   console.log('calling');
    this.adminMenu = this.menuItems.getAdminMenuitem();
    // }
    //   } else {
    //     this.toastar.error('Role is invalid!');
    //     this.route.navigate(['/pages/admin-login/']);
    //   }
    // });
  }

  sideMenuCustomerService() {
    this.finalMenu = this.menuItems.getCustomerServiceMenuItem();
  }

  sideMenusBusinesstype() {
    this.apiService.userById(localStorage.getItem('userId')).subscribe((res) => {
      if (res?.data[0]?.Business_type == this.loggedInBusinessType) {
        if (localStorage.getItem('businessType') == 'Dealer') {
          this.businessTypeMenu = this.menuItems.getDealerMenuItem();
        } else if (localStorage.getItem('businessType') == 'Manufacturer') {
          this.businessTypeMenu = this.menuItems.getManufacturerMenuItem();
        } else if (localStorage.getItem('businessType') == 'ServiceProvider') {
          this.businessTypeMenu = this.menuItems.getServiceProviderMenuItem();
        }
      } else {
        this.toastar.error('Business type is invalid!');
        this.route.navigate(['/']);
      }
    });
  }

  redirectToPages(child: any) {
    if (localStorage.getItem('isAdminLoggedIn') == 'true') {
      this.route.navigate(['/pages' + '/admin-login/' + child.state || child.menuitem.state]);
    }
    if (localStorage.getItem('businessType') == 'Dealer') {
      this.route.navigate(['/pages' + '/dealer/' + child.state || child.menuitem.state]);
    }
    if (localStorage.getItem('businessType') == 'Manufacturer') {
      this.route.navigate(['/pages' + '/manufacturer/' + child.state || child.menuitem.state]);
    }
    if (localStorage.getItem('businessType') == 'ServiceProvider') {
      this.route.navigate(['/pages' + '/service-provider/' + child.state || child.menuitem.state]);
    }
  }
}
