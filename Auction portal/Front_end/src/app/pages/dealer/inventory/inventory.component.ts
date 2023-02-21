import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  inventoryForm!: FormGroup;
  isValidForm: boolean = false;
  userId: any;
  xmlFile: any;

  constructor(
    public _formbuilder: FormBuilder,
    public toastr: ToastrService,
    private apiService: ApiService,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService
  ) {
    this.userId = this.cookieService.get('userId');
    this.inventoryFormGroup();
  }

  ngOnInit(): void {
  }

  inventoryFormGroup() {
    this.inventoryForm = this._formbuilder.group({
      file: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    let fileList: FileList = event.target.files[0];
    this.xmlFile = fileList;
  }

  uploadXml() {
    if (this.inventoryForm.invalid) {
      this.isValidForm = true;
      return;
    } else {
      let formData = new FormData();

      formData.append('UserID', this.cookieService.get('userId'));
      formData.append('xmlfile', this.xmlFile);

      this.spinnerService.show();
      this.apiService.uploadXmlFile(formData).subscribe((res) => {
        if (res?.status == true) {
          // this.getXmlFile(this.cookieService.get('userId'));
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
    // this.apiService.addProduct(formData).subscribe((res) => {

    // });
  }

  // getXmlFile(userId: any) {
  //   this.apiService.getXmlFileData(userId).subscribe((res) => {
  //     if (res?.status == true) {
  //       this.xmlFileData = res?.data;
  //       console.log('this.xmlFileData', this.xmlFileData);
  //       this.toastr.success(res?.message);
  //     } else {
  //       this.toastr.error(res?.message);
  //     }
  //   }, (error) => {
  //     this.toastr.error("Internal server error!");
  //   });
  // }

}
