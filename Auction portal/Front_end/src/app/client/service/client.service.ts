import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../core/apis/api-end-points';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // private token = localStorage.getItem('business_access');

  // private token1 = this.cookieService.get('business_access');


  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private sharedService: SharedService
  ) { }

  signUp(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.REGISTRATION, postData);
  }

  login(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.LOGIN, postData);
  }

  logout(): Observable<any> {
    // let header = new Headers({ 'Authorization': `Bearer ${this.token}` });
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.sharedService.getBusinessToken()}`)
    }    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.sharedService.getBusinessToken()
      }),
    };
    return this.http.get(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.LOGOUT, httpOptions);
  }

}
