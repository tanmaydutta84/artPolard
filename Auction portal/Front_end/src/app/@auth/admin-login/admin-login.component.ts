import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  // role: any;
  adminForm!: FormGroup;
  isValidForm: boolean = false;

  constructor(
    public sharedService: SharedService,
    public _formBuilder: FormBuilder,
    public apiService: ApiService,
    public toastr: ToastrService,
    public router: Router,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService
  ) {
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    this.adminFormGroup();
  }

  ngOnInit() { }

  adminFormGroup() {
    this.adminForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      // role: ['', Validators.required]
    });
  }

  // selectedRole(event: any) {
  //   this.role = event?.value;
  // }

  login() {
    if (this.adminForm.invalid) {
      this.isValidForm = true;
      return
    }
    else {
      let postData = {
        "EmailID": this.adminForm.value.email,
        "Password": this.adminForm.value.password,
        // "Role": this.adminForm.value.role,
      }
      this.spinnerService.show();
      this.apiService.adminLogin(postData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.cookieService.set('isAdminLoggedIn', 'true');
          this.cookieService.set('admin_access', res?.data?.accessTokenn);
          this.router.navigate(['/pages/admin-login/dashboard']);
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
