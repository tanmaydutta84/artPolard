import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../../core/apis/api-end-points';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(
    private http: HttpClient,
  ) { }

  addLogo(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.ADDLOGO + '/' + Endpoints.ADDLOGODETAILS, postData);
  }

  updateUser(postData: any): Observable<any> {
    return this.http.put(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.UPDATEUSER, postData);
  }

  // userById(id: any): Observable<any> {
  //   return this.http.get(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.USERBYID + '/' + id);
  // }
}
