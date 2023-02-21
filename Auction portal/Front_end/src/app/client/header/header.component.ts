import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  businessType: any;
  isLoggedIn: boolean = false;

  constructor(
    public sharedService: SharedService,
    public route: Router,
    public clientService: ClientService,
    public toastr: ToastrService,
    private cookieService: CookieService
  ) {
    this.businessType = this.cookieService.get('businessType');
    if (this.cookieService.get('isLoggedIn') == 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit(): void {
  }

  redirectToDashboard() {
    if (this.cookieService.get('businessType') == 'Dealer') {
      this.route.navigate(['/pages/dealer/logo']);
    }
    if (this.cookieService.get('businessType') == 'Manufacturer') {
      this.route.navigate(['/pages/manufacturer/logo']);
    }
    if (this.cookieService.get('businessType') == 'ServiceProvider') {
      this.route.navigate(['/pages/service-provider/logo']);
    }
  }

  sell() {
    if (this.cookieService.get('isLoggedIn') == "false" || this.cookieService.get('isLoggedIn') == null) {
      this.sharedService.isShowHeader = false;
      this.sharedService.isShowFooter = false;
      this.route.navigate(['/login']);
    }
  }

  loginToRedirect() {
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    this.route.navigate(['/login']);
  }

  signUpToRedirect() {
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    this.route.navigate(['/signup']);
  }

  logout() {
    // this.clientService.logout().subscribe((res) => {
    //   if (res?.status == true) {

    // this.cookieService.deleteAll();
    this.cookieService.set('isLoggedIn', 'false');
    // this.cookieService.set('isLoggedIn', 'false');
    this.cookieService.delete('businessType');
    this.cookieService.delete('business_access');
    this.cookieService.delete('inventory_Type');
    this.cookieService.delete('userId');
    this.cookieService.delete('email');
    this.cookieService.delete('firstName');
    this.cookieService.delete('lastName');
    this.cookieService.delete('image');
    window.location.reload();
    // this.toastr.success(res?.message);
    // } else {
    //   this.toastr.error(res?.message);
    // }
    // });
  }
}

