import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-customer-service-login',
  templateUrl: './customer-service-login.component.html',
  styleUrls: ['./customer-service-login.component.scss']
})
export class CustomerServiceLoginComponent implements OnInit {

  customerForm!: FormGroup;
  isValidForm: boolean = false;

  constructor(
    public sharedService: SharedService,
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public toastr: ToastrService,
    public router: Router,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService
  ) {
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    this.customerFormGroup();
  }

  ngOnInit() { }

  customerFormGroup() {
    this.customerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.customerForm.invalid) {
      this.isValidForm = true;
      return
    }
    else {
      let postData = {
        "Emailid": this.customerForm.value.email,
        "Password": this.customerForm.value.password
      };
      this.spinnerService.show();
      this.apiService.customerLogin(postData).subscribe((res) => {
        if (res?.status == true) {
          this.spinnerService.hide();
          this.toastr.success(res?.message);
          this.cookieService.set('isCustomerLoggedIn', 'true');
          this.cookieService.set('customer_Access', res?.data?.accessToken);
          this.router.navigate(['pages/customer-service/dashboard']);
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
}
