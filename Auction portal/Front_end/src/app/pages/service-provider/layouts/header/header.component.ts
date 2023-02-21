import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public route: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    // if ((localStorage.getItem('businessType') == 'Dealer') || (localStorage.getItem('businessType') == 'Manufacturer') || (localStorage.getItem('businessType') == 'ServiceProvider')) {
    //   localStorage.setItem('isLoggedIn', 'false');
    //   localStorage.setItem('businessType', '');
    //   localStorage.setItem('token', '');
    //   localStorage.setItem('userId', '');
    //   this.route.navigate(['/']);
    // } else if (localStorage.getItem('isAdminLoggedIn') == 'true') {
    //   localStorage.setItem('isAdminLoggedIn', '');
    //   // localStorage.setItem('role', '');
    //   localStorage.setItem('admin_access', '');
    //   this.route.navigate(['/admin-login']);
    //   // } else {
    //   //   this.route.navigate(['/admin-login']);
    // }
    // else if (localStorage.getItem('isCustomerLoggedIn') == 'true') {
    //   localStorage.setItem('isCustomerLoggedIn', '');
    //   // localStorage.setItem('role', '');
    //   localStorage.setItem('customer_Access', '');
    //   this.route.navigate(['/customer-service-login']);
    // } else {
    //   this.route.navigate(['/']);
    // }
    //  else {
    //   this.route.navigate(['/']);
    // }
    this.cookieService.set('isLoggedIn', 'false');
    this.cookieService.delete('businessType');
    this.cookieService.delete('business_access');
    this.cookieService.delete('userId');
    this.cookieService.delete('email');
    this.cookieService.delete('firstName');
    this.cookieService.delete('lastName');
    this.cookieService.delete('image');
    this.route.navigate(['/']);
  }
}
