import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate() {
    if (this.cookieService.get('admin_access') != '' && this.cookieService.get('admin_access') !== 'undefined') {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }

  canActivateChild() {
    if (this.cookieService.get('admin_access') != '' && this.cookieService.get('admin_access') !== 'undefined') {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }

  getToken() {
    return this.cookieService.get("admin_access");
  }
  // public isLogin(): boolean {
  //   //console.log("Token test ",this.cookieService.get('access') ,this.cookieService.get('refresh'),this.cookieService.get('access') && this.cookieService.get('refresh'))
  //   if (this.cookieService.get('access') != "" && this.cookieService.get('refresh') != "") {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
}
