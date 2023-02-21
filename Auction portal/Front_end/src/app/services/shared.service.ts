import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isShowHeader: boolean = true;
  isShowFooter: boolean = true;
  isShowSidebar: boolean = true;
  businessType: any;

  token1: any
  // LoggedInBusinessType = localStorage.getItem('businessType');

  public filterData = new BehaviorSubject<any>([]);
  constructor(private cookieService: CookieService) {
  }

  getBusinessToken() {
    return this.cookieService.get('business_access');
  }
}

