import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../services/shared.service';
import { ClientService } from '../service/client.service';
import { ConfirmedValidator } from "../../component/confirmed.validator";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isValidForm: boolean = false;

  constructor(
    public router: Router,
    public sharedService: SharedService,
    public _formbuilder: FormBuilder,
    public clientService: ClientService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.registerFormGroup();
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
  }

  ngOnInit(): void {
  }

  registerFormGroup() {
    this.registerForm = this._formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      businessType: [this.sharedService.businessType, Validators.required],
      inventoryType: [''],
      website: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  createAccount() {
    if (this.registerForm.invalid) {
      this.isValidForm = true;
      return
    } else {
      let postData = {
        "firstName": this.registerForm.value.firstName,
        "lastName": this.registerForm.value.lastName,
        "phone": this.registerForm.value.phone,
        "company": this.registerForm.value.company,
        "Business_type": this.registerForm.value.businessType,
        "Inventory_Type": this.registerForm.value.inventoryType,
        "Website": this.registerForm.value.website,
        "Address1": this.registerForm.value.address1,
        "Address2": this.registerForm.value.address2,
        "city": this.registerForm.value.city,
        "state": this.registerForm.value.state,
        "postalcode": this.registerForm.value.postalCode,
        "country": this.registerForm.value.country,
        "email": this.registerForm.value.email,
        "password": this.registerForm.value.password
      };
      this.spinnerService.show();
      this.clientService.signUp(postData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.router.navigate(['/login']);
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
