import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from "../../services/shared.service";
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // role: any;
  loginForm!: FormGroup;
  isValidForm: boolean = false;

  constructor(
    public router: Router,
    public sharedService: SharedService,
    public _formbuilder: FormBuilder,
    public clientService: ClientService,
    public toastr: ToastrService,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService
  ) {
    this.loginFormGroup();
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
  }

  ngOnInit(): void {
  }

  loginFormGroup() {
    this.loginForm = this._formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      businessType: ['', Validators.required],
    });
  }

  // selectedBusinesstype(event: any) {
  //   this.role = event?.value;
  // }

  login() {
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    if (this.loginForm.invalid) {
      this.isValidForm = true;
      return
    } else {
      let postData = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password,
        "Business_type": this.loginForm.value.businessType,
      }
      this.spinnerService.show();
      this.clientService.login(postData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.cookieService.set('isLoggedIn', 'true');
          this.cookieService.set('businessType', res?.data?.user_info?.Business_type);
          this.cookieService.set('inventory_Type', res?.data?.user_info?.Inventory_Type);
          this.cookieService.set('business_access', res?.data?.accessToken);
          this.cookieService.set('email', res?.data?.user_info?.email);
          this.cookieService.set('userId', res?.data?.user_info?.userid);
          this.cookieService.set('firstName', res?.data?.user_info?.firstName);
          this.cookieService.set('lastName', res?.data?.user_info?.lastName);
          this.cookieService.set('image', res?.data?.user_info?.logo);
          this.router.navigate(['/']);
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

}
