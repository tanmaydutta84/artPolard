import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../../core/apis/api-end-points';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  logoPath: any;

  constructor(
    private http: HttpClient,
  ) {
    this.logoPath = environment.ImagePath;
  }

  addTemplate(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.CATEGORYBANNER + '/' + Endpoints.ADDTEMPLATE, postData);
  }

  addUser(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.ADDUSER, postData);
  }

  userList(): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.ALLUSER);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.DELETEUSER + '/' + id);
  }

  LogoList(): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.VIEWLOGO + '/' + Endpoints.ALLLOGOS);
  }

  deleteLogo(id: any): Observable<any> {
    return this.http.delete(environment.baseAPIUrl + Endpoints.DELETELOGO + '/' + Endpoints.DELETELOGOBYID + '/' + id);
  }

  updateLogoDetails(postData: any): Observable<any> {
    return this.http.put(environment.baseAPIUrl + Endpoints.UPDATELOGO + '/' + Endpoints.UPDATELOGODETAILS, postData);
  }

  addCustomerServiceUser(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.CUSTOMERSERVICE + '/' + Endpoints.REGISTRATION, postData);
  }

  customerServiceUserList(): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.CUSTOMERSERVICE + '/' + Endpoints.ALLCUSTOMERSERVICE);
  }

  statusUpdate(id: any, postData: any): Observable<any> {
    return this.http.put(environment.baseAPIUrl + Endpoints.CUSTOMERSERVICE + '/' + Endpoints.STATUSUPDATEBYID + '/' + id, postData);
  }

  deleteCustomerService(id: any): Observable<any> {
    return this.http.delete(environment.baseAPIUrl + Endpoints.CUSTOMERSERVICE + '/' + Endpoints.DELETECUSTOMERSERVICE + '/' + id);
  }

  userStatusUpdate(id: any, postData: any): Observable<any> {
    return this.http.put(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.UPDATESTATUSBYID + '/' + id, postData);
  }
}