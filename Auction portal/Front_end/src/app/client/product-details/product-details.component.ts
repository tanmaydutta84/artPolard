import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
declare var $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  mystring: string = 'img/slider1.png';
  itemId: any;
  itemData: any;
  itemAttributes: any;
  userId: any;
  itemImg: any;

  currentIndex = 0;
  currentZoom = 0;
  zoomIndex = -1;
  addIsActiveClass = true;
  currIndex: any = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService
  ) {
    this.userId = this.cookieService.get('userId');
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.itemId = params.id
      });
    this.getItem();
  }

  setActive(i: any) {
    this.currIndex = i;
  }
  getCurrentWH() {
    return 70 + (this.currentZoom * 50) + '%';
  }

  setZoomMinus() {
    if (this.currentZoom != 0) {
      this.currentZoom--;
    }
  }

  setZoomPlus() {
    this.currentZoom++;
  }

  setdefaultwidth() {
    this.currentZoom = 0;
  }

  bodyhidden() {
    $('#body-part').addClass('bodyhidden');
  }

  closepopup() {
    $('#body-part').removeClass('bodyhidden');
  }

  getItem() {
    let postData = {
      "ItemID": this.itemId,
      // "UserID": this.userId
    }
    this.spinnerService.show();
    this.apiService.getInventoryItemById(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.itemData = res?.data[0];
        this.itemImg = JSON.parse(this.itemData?.Images);
        this.itemAttributes = JSON.parse(res?.data[0]?.Attributes);
        this.toastr.success(res?.message);
        this.spinnerService.hide();
      } else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error) => {
      this.toastr.error("Internal server error!");
      this.spinnerService.hide();
    });
  }
}
