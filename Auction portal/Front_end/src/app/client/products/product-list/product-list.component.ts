import { Component, OnInit } from '@angular/core';
import { QuoteByPhoneComponent } from '../../../pages/common/quote-by-phone/quote-by-phone.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestQuoteComponent } from '../../../pages/common/request-quote/request-quote.component';
import { ApiService } from '../../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../../../services/shared.service';
declare var $: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  xmlData: any;
  sortitem: string = 'Select';
  itemImg: any;
  zoomIndex = -1;
  currImg1: any;
  currImg2: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private sharedService: SharedService
  ) {
    this.sharedService.filterData.subscribe((res: any) => {
      this.xmlData = res;
    });
  }

  ngOnInit(): void {
    this.getPublishDataList();
  }

  setCurrentImg1(img: any) {
    this.currImg1 = img;
  }

  setCurrentImg2(img: any) {
    this.currImg2 = img;
  }

  // openQuotePhoneDialog() {
  //   const dialogRef = this.dialog.open(QuoteByPhoneComponent, {
  //     width: '500px',
  //   });
  // }

  // openRequestQuote() {
  //   const dialogRef = this.dialog.open(RequestQuoteComponent, {
  //     width: '500px',
  //   });
  // }  

  bodyhidden() {
    $('#body-part').addClass('bodyhidden');
  }

  closepopup() {
    $('#body-part').removeClass('bodyhidden');
  }

  getPublishDataList() {
    this.spinnerService.show();
    this.apiService.getPublishList().subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.xmlData = res?.data;
        this.xmlData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.toastr.success(res?.message);
      } else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error!');
      this.spinnerService.hide();
    });
  }

  sortItem(value: string) {
    this.getSortItem(value);
  }

  getSortItem(sortItem: string) {
    let postData = {
      "data": sortItem
    }
    this.spinnerService.show();
    this.apiService.filterItem(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.xmlData = res?.data;
        this.xmlData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.toastr.success(res?.message);
      } else {
        this.toastr.error(res?.message || 'Internal server error!');
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error!');
      this.spinnerService.hide();
    });
  }
}
