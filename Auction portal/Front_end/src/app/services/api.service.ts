import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Endpoints } from '../core/apis/api-end-points';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  logoPath: any;
  imgPath: any;

  constructor(
    private http: HttpClient,
  ) {
    this.logoPath = environment.ImagePath;
    this.imgPath = environment.ImagePath;
  }

  adminLogin(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.ADMIN + '-' + Endpoints.LOGIN + '/' + Endpoints.LOGIN, postData);
  }

  customerLogin(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.CUSTOMERSERVICE + '/' + Endpoints.LOGIN, postData);
  }

  userById(id: any): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.USER + '/' + Endpoints.USERBYID + '/' + id);
  }

  // uploadUserOldDataPdf(id: any, postData: any): Observable<any> {
  //   return this.http.put(environment.baseAPIUrl + Endpoints.USER + Endpoints.SAVEUSERDATAPDF + '/' + id, postData);
  // }

  addProduct(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.PRODUCT + '/' + Endpoints.ADDPRODUCT, postData);
  }

  uploadXmlFile(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.INVENTORYDATA, postData);
  }

  getXmlFileData(id: any): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.INVENTORYLISTBYUSERID + '/' + id);
  }

  deleteItemById(id: any, postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.INVENTORYITEMDELETEBYID + '/' + id, postData);
  }

  getInventoryItemById(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.VIEWINVENTORYITEMBYID, postData);
  }

  setPublishStatus(auctionId: any, postData: any): Observable<any> {
    return this.http.put(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.PUBLISHITEMSTATUS + '/' + auctionId, postData);
  }

  getPublishList(): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.PUBLISHEDITEMLIST);
  }

  editInventoryItem(auctionId: any, postData: any): Observable<any> {
    return this.http.put(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.UPDATEINVENTORYITEM + '/' + auctionId, postData);
  }

  filterItem(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTITEM, postData);
  }

  filterByPrice(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYPRICE, postData);
  }

  filterByModel(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYMODEL, postData);
  }

  filterByLocation(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYLOCATION, postData);
  }

  filterByYear(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYYEAR, postData);
  }

  filterByCategory(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYCATEGORY, postData);
  }

  filterByDate(postData: any): Observable<any> {
    return this.http.post(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYDATE, postData);
  }

  categoryList(): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.ALLCATEGORY);
  }

  filterByCategoryId(id: any): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.SORTBYCATEGORYID + '/' + id);
  }

  categoryListByPopularity(): Observable<any> {
    return this.http.get(environment.baseAPIUrl + Endpoints.INVENTORY + '/' + Endpoints.CATEGORYBYPOPULARITY);
  }

}
