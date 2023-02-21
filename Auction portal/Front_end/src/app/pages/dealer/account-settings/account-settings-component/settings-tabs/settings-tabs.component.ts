import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../services/api.service';
import { SharedService } from '../../../../../services/shared.service';
import { DealerService } from '../../../service/dealer.service';
@Component({
  selector: 'app-settings-tabs',
  templateUrl: './settings-tabs.component.html',
  styleUrls: ['./settings-tabs.component.scss']
})
export class SettingsTabsComponent implements OnInit {

  userUpdateForm!: FormGroup;
  companyForm!: FormGroup;
  userDataList: any;
  userId: any;

  constructor(
    public _formbuilder: FormBuilder,
    public dealerService: DealerService,
    public apiService: ApiService,
    public toastr: ToastrService,
    public sharedService: SharedService,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService
  ) {
    this.userId = this.cookieService.get('userId');
    this.userUpdateFromGroup();
    this.companyFormGroup();
  }

  ngOnInit() {
    this.getUser();
  }

  userUpdateFromGroup() {
    this.userUpdateForm = this._formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      businessType: [''],
      inventoryType: [''],
      address1: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],
    });
  }

  setUserData() {
    this.userUpdateForm.controls['firstName'].setValue(this.userDataList?.firstName);
    this.userUpdateForm.controls['lastName'].setValue(this.userDataList?.lastName);
    this.userUpdateForm.controls['email'].setValue(this.userDataList?.email);
    this.userUpdateForm.controls['phone'].setValue(this.userDataList?.phone);
    this.userUpdateForm.controls['businessType'].setValue(this.userDataList?.Business_type);
    this.userUpdateForm.controls['inventoryType'].setValue(this.userDataList?.Inventory_Type);
    this.userUpdateForm.controls['address1'].setValue(this.userDataList?.Address1);
    this.userUpdateForm.controls['city'].setValue(this.userDataList?.city);
    this.userUpdateForm.controls['state'].setValue(this.userDataList?.state);
    this.userUpdateForm.controls['country'].setValue(this.userDataList?.country);
    this.userUpdateForm.controls['postalCode'].setValue(this.userDataList?.postalcode);
    this.companyForm.controls['company'].setValue(this.userDataList?.company);
    this.companyForm.controls['website'].setValue(this.userDataList?.Website);
  }

  companyFormGroup() {
    this.companyForm = this._formbuilder.group({
      company: [''],
      website: ['']
    });
  }

  getUser() {
    this.spinnerService.show();
    this.apiService.userById(this.userId).subscribe((res) => {
      if (res?.status == true) {
        this.toastr.success(res?.message);
        this.userDataList = res?.data[0];
        this.setUserData();
        this.spinnerService.hide();
      } else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error!');
      this.spinnerService.hide();
    });
  }

  updateUser() {
    if (this.userId) {
      let postData = {
        "UserID": this.userId,
        "firstName": this.userUpdateForm.value.firstName,
        "lastName": this.userUpdateForm.value.lastName,
        "phone": this.userUpdateForm.value.phone,
        "company": this.companyForm.value.company,
        "Business_type": this.userUpdateForm.value.businessType,
        "Inventory_Type": this.userUpdateForm.value.inventoryType,
        "Website": this.companyForm.value.website,
        "Address1": this.userUpdateForm.value.address1,
        "Address2": this.userDataList?.Address2,
        "city": this.userUpdateForm.value.city,
        "state": this.userUpdateForm.value.state,
        "postalcode": this.userUpdateForm.value.postalCode,
        "country": this.userUpdateForm.value.country,
        "email": this.userDataList?.email
      }
      this.spinnerService.show();
      this.dealerService.updateUser(postData).subscribe((res) => {
        if (res?.status == true) {
          this.deleteCookies();
          this.cookieService.set('businessType', res?.data?.[0]?.Business_type);
          this.cookieService.set('inventory_Type', res?.data?.[0]?.Inventory_Type);
          this.cookieService.set('email', res?.data?.[0]?.email);
          this.cookieService.set('firstName', res?.data?.[0]?.firstName);
          this.cookieService.set('lastName', res?.data?.[0]?.lastName);
          this.cookieService.set('image', res?.data?.[0]?.logo);
          this.toastr.success(res?.message);
          this.setUserData();
          this.spinnerService.hide();
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

  updateCompanyDetails() {
    if (this.userId) {
      let postData = {
        "UserID": this.userId,
        "firstName": this.userUpdateForm.value.firstName,
        "lastName": this.userUpdateForm.value.lastName,
        "phone": this.userUpdateForm.value.phone,
        "company": this.companyForm.value.company,
        "Business_type": this.userUpdateForm.value.businessType,
        "Inventory_Type": this.userUpdateForm.value.inventoryType,
        "Website": this.companyForm.value.website,
        "Address1": this.userUpdateForm.value.address1,
        "Address2": this.userDataList?.Address2,
        "city": this.userUpdateForm.value.city,
        "state": this.userUpdateForm.value.state,
        "postalcode": this.userUpdateForm.value.postalCode,
        "country": this.userUpdateForm.value.country,
        "email": this.userDataList?.email
      }
      this.spinnerService.show();
      this.dealerService.updateUser(postData).subscribe((res) => {
        if (res?.status == true) {
          this.deleteCookies();
          this.cookieService.set('businessType', res?.data?.[0]?.Business_type);
          this.cookieService.set('inventory_Type', res?.data?.[0]?.Inventory_Type);
          this.cookieService.set('email', res?.data?.[0]?.email);
          this.cookieService.set('firstName', res?.data?.[0]?.firstName);
          this.cookieService.set('lastName', res?.data?.[0]?.lastName);
          this.cookieService.set('image', res?.data?.[0]?.logo);
          this.toastr.success(res?.message);
          this.setUserData();
          this.spinnerService.hide();
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

  deleteCookies() {
    this.cookieService.delete('businessType');
    this.cookieService.delete('inventory_Type');
    this.cookieService.delete('email');
    this.cookieService.delete('firstName');
    this.cookieService.delete('lastName');
    this.cookieService.delete('image');
  }

  // generatePdf() {
  //   console.log('calling');

  //   const doc = new jsPDF();

  //   doc.text("First Name", 10, 10);
  //   doc.text(this.userUpdateForm.value.firstName, 100, 10);
  //   doc.text("Last Name", 10, 20);
  //   doc.text(this.userUpdateForm.value.lastName, 100, 20);
  //   doc.save("Old Details.pdf");

  //   var blob = doc.output('blob');

  //   this.pdfUpload(blob);
  //   // this.pdfUpload(doc.output('datauristring'));
  // }

  // pdfUpload(data: any) {
  //   if (data) {
  //     const formData = new FormData();
  //     formData.append('Previous_Data', data);
  //     this.apiService.uploadUserOldDataPdf(localStorage.getItem('userId'), formData).subscribe((res) => {
  //       console.log('res', res);
  //       if (res?.status == true) {
  //         this.toastr.success(res?.message);
  //         this.setUserData();
  //       } else {
  //         this.toastr.error(res?.message);
  //       }

  //     });
  //   }
  // }
}
