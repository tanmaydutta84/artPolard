import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuardService {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate() {
    if (this.cookieService.get('business_access') != '' && this.cookieService.get('business_access') !== 'undefined') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  canActivateChild() {
    if (this.cookieService.get('business_access') != '' && this.cookieService.get('business_access') !== 'undefined') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  getToken() {
    return this.cookieService.get("business_access");
  }

}
