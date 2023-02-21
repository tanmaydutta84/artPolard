import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss']
})
export class ProductSidebarComponent implements OnInit {

  panelOpenState = false;
  sortData: any;
  locationInput: any;
  modelValue: any;
  maxPriceValue!: number;
  minPriceValue!: number;
  maxYearValue!: number;
  minYearValue!: number;
  startDate: any;
  endDate: any;

  constructor(
    private apiService: ApiService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  clear() {
    this.sortData = '';
    this.locationInput = '';
    this.modelValue = '';
    this.maxPriceValue = 0;
    this.minPriceValue = 0;
    this.maxYearValue = 0;
    this.minYearValue = 0;
    this.startDate = '';
    this.endDate = '';
  }

  applyPriceFilter() {
    this.filterByPrice(this.minPriceValue, this.maxPriceValue);
  }

  filterByPrice(minValue: number, maxValue: number) {
    let postData = {
      "minprice": minValue,
      "maxprice": maxValue
    }
    this.spinnerService.show();
    this.apiService.filterByPrice(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.sortData = res?.data;
        this.sortData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.sharedService.filterData.next(res?.data);
        this.toastr.success(res?.message);
      } else {
        this.spinnerService.hide();
        this.toastr.error(res?.message);
      }
    }, (error: any) => {
      this.toastr.error('Internal server error!');
      this.spinnerService.hide();
    });
  }

  applyModelFilter() {
    this.filterByModel(this.modelValue);
  }

  filterByModel(searchValue: string) {
    let postData = {
      "ModelName": searchValue
    }
    this.spinnerService.show();
    this.apiService.filterByModel(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.sortData = res?.data;
        this.sortData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.sharedService.filterData.next(res?.data);
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

  // locationInput(value: any) {
  //   console.log('value', value.target.value);
  //   this.filterByLocation('Lakeside Marina & Watercraft Rentals');
  // }

  applyLocationFilter() {
    this.filterByLocation(this.locationInput);
  }

  filterByLocation(searchValue: string) {
    let postData = {
      "Location": searchValue
    }
    this.spinnerService.show();
    this.apiService.filterByLocation(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.sortData = res?.data;
        this.sortData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.sharedService.filterData.next(res?.data);
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

  applyYearFilter() {
    this.filterByYear(this.minYearValue, this.maxYearValue);
  }

  filterByYear(minValue: number, maxValue: number) {
    let postData = {
      "min": minValue,
      "max": maxValue
    }
    this.spinnerService.show();
    this.apiService.filterByYear(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.sortData = res?.data;
        this.sortData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.sharedService.filterData.next(res?.data);
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

  filterByCategory() {
    let postData = {
      "Category": "Robalo"
    }
    this.spinnerService.show();
    this.apiService.filterByCategory(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.sortData = res?.data;
        this.sortData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.sharedService.filterData.next(res?.data);
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

  applyDateFilter() {
    let strDate: any = this.dateFormat(this.startDate);
    let endDate: any = this.dateFormat(this.endDate);
    this.filterByDate(strDate, endDate);
  }

  dateFormat(date: Date) {
    let today = new Date(date);
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10)
      dd = '0' + dd
    if (mm < 10)
      mm = '0' + mm
    return mm + '-' + dd + '-' + yyyy;
  }

  filterByDate(strDate: Date, endDate: Date) {
    let postData = {
      "mindate": strDate,
      "maxdate": endDate
    }
    this.spinnerService.show();
    this.apiService.filterByDate(postData).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        this.sortData = res?.data;
        this.sortData.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.sharedService.filterData.next(res?.data);
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

}
