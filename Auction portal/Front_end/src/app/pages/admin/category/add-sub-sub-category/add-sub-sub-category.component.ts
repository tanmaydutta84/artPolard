import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from '../../service/admin.service';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';

@Component({
  selector: 'app-add-sub-sub-category',
  templateUrl: './add-sub-sub-category.component.html',
  styleUrls: ['./add-sub-sub-category.component.scss']
})
export class AddSubSubCategoryComponent implements OnInit {

  subSubCategoryForm!: FormGroup;
  isValidForm: boolean = false;
  categoryList: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddSubSubCategoryComponent>,
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
    this.subSubCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      subCategoryName: ['', Validators.required]
    });
  }

  getcategoryList() {
    let subCatArr: any = [];
    this.spinnerService.show();
    this.apiService.categoryList().subscribe((res) => {
      if (res?.status == true) {
        res?.data.forEach((element: any) => {
          if (element?.subCate) {
            subCatArr = [...subCatArr, ...element?.subCate];
          }
        });
        this.categoryList = subCatArr;
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

  addSubSubCategory() {
    if (this.subSubCategoryForm.invalid) {
      this.isValidForm = true;
      return;
    } else {
      let postData = {
        "Parent_ID": this.subSubCategoryForm.value.subCategoryName,
        "CategoryName": this.subSubCategoryForm.value.categoryName,
        "level": "3"
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
