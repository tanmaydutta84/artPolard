import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../services/api.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {

  subCategoryForm!: FormGroup;
  isValidForm: boolean = false;
  categoryList: any;

  constructor(
    public dialogRef: MatDialogRef<AddSubCategoryComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private apiService: ApiService,
    private spinnerService: NgxSpinnerService
  ) {
    this.categoryFormGroup();
  }

  ngOnInit(): void {
    this.getcategoryList();
  }

  categoryFormGroup() {
    this.subCategoryForm = this.formBuilder.group({
      subCategoryName: ['', Validators.required],
      categoryName: ['', Validators.required]
    });
  }

  getcategoryList() {
    this.spinnerService.show();
    this.apiService.categoryListByPopularity().subscribe((res) => {
      if (res?.status == true) {
        this.categoryList = res?.data;
        this.toastr.success(res?.message);
        this.spinnerService.hide();
      } else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error');
      this.spinnerService.hide();
    })
  }

  addSubCategory() {
    if (this.subCategoryForm.invalid) {
      this.isValidForm = true;
      return;
    } else {
      let postData = {
        "Parent_ID": this.subCategoryForm.value.categoryName,
        "CategoryName": this.subCategoryForm.value.subCategoryName,
        "level": "2"
      }
      this.spinnerService.show();
      this.adminService.addCategory(postData).subscribe((res) => {
        if (res?.status == true) {
          this.closeDialog();
          this.toastr.success(res?.message);
          this.spinnerService.hide();
        } else {
          this.toastr.error(res?.message);
          this.spinnerService.hide();
        }
      }, (error: any) => {
        this.toastr.error('Internal server error');
        this.spinnerService.hide();
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

}
