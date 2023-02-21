import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceAuthGuardService {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate() {
    if (this.cookieService.get('customer_Access') != '' && this.cookieService.get('customer_Access') !== 'undefined') {
      //     return true;
      // } else if (this.cookieService.get('customer_Access') != '' && this.cookieService.get('customer_Access') !== 'undefined') {
      return true;
    } else {
      this.router.navigate(['/customer-service-login']);
      return false;
    }
  }

  canActivateChild() {
    if (this.cookieService.get('customer_Access') != '' && this.cookieService.get('customer_Access') !== 'undefined') {
      return true;
    } else {
      this.router.navigate(['/customer-service-login']);
      return false;
    }
  }

  getToken() {
    return this.cookieService.get("customer_Access");
  }
}
