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
    // if (localStorage.getItem('isAdminLoggedIn') == 'true') {
    this.cookieService.delete('isAdminLoggedIn');
    this.cookieService.delete('admin_access');
    this.route.navigate(['/admin-login']);
    // } else {
    //   this.route.navigate(['/admin-login']);
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
  }
}
