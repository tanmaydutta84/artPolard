import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private cookieService: CookieService
    ) { }

    canActivate() {
        if (this.cookieService.get('business_access') != '' && this.cookieService.get('business_access') !== 'undefined') {
            return true;
            // } else if (this.cookieService.get('admin_access') != '' && this.cookieService.get('admin_access') !== 'undefined') {
            //     return true;
            // } else if (this.cookieService.get('customer_Access') != '' && this.cookieService.get('customer_Access') !== 'undefined') {
            //     return true;
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