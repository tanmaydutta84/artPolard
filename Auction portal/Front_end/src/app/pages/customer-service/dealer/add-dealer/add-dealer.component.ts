import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from '../../../../component/confirmed.validator';
import { CustomerServiceService } from '../../service/customer-service.service';

@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.scss']
})
export class AddDealerComponent implements OnInit {

  imageSrcLogo: any;
  businessType = "Dealer"

  dealerForm!: FormGroup;
  isValidForm: boolean = false;
  imgFile: any;

  constructor(
    public router: Router,
    public _formbuilder: FormBuilder,
    public customerServiceService: CustomerServiceService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.dealerFormGroup();
  }

  ngOnInit(): void {
  }

  dealerFormGroup() {
    this.dealerForm = this._formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      businessType: ['', Validators.required],
      inventoryType: [''],
      website: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      logo: ['', Validators.required],
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

  onFileChangeLogo(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileList: FileList = event.target.files[0];
      this.imgFile = fileList;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrcLogo = reader.result as string;

        // this.myForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
    }
  }

  dealerAccount() {
    if (this.dealerForm.invalid) {
      this.isValidForm = true;
      return
    } else {
      const formData = new FormData();

      formData.append('firstName', this.dealerForm.value.firstName);
      formData.append('lastName', this.dealerForm.value.lastName);
      formData.append('phone', this.dealerForm.value.phone);
      formData.append('company', this.dealerForm.value.company);
      formData.append('Business_type', this.dealerForm.value.businessType);
      formData.append('Inventory_Type', this.dealerForm.value.inventoryType);
      formData.append('Website', this.dealerForm.value.website);
      formData.append('Address1', this.dealerForm.value.address1);
      formData.append('Address2', this.dealerForm.value.address2);
      formData.append('city', this.dealerForm.value.city);
      formData.append('state', this.dealerForm.value.state);
      formData.append('postalcode', this.dealerForm.value.postalCode);
      formData.append('country', this.dealerForm.value.country);
      formData.append('logo', this.imgFile);
      formData.append('email', this.dealerForm.value.email);
      formData.append('password', this.dealerForm.value.password);
      this.spinnerService.show();
      this.customerServiceService.addUser(formData).subscribe((res) => {
        if (res?.status == true) {
          this.isValidForm = false;
          this.toastr.success(res?.message);
          this.dealerForm.reset();
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
