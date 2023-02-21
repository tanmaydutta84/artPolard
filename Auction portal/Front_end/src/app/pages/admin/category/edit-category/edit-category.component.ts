import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AnyForUntypedForms } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  isValidForm: boolean = false;
  catName: any;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.categoryFormGroup();
  }

  ngOnInit(): void {
    this.getCategoryById();
  }

  categoryFormGroup() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });
  }

  getCategoryById() {
    this.spinnerService.show();
    this.adminService.categoryById(this.data?.id).subscribe((res) => {
      if (res?.status == true) {        
        this.toastr.success(res?.message);
        this.spinnerService.hide();
        this.categoryForm.controls['categoryName'].setValue(res?.data?.[0]?.CategoryName);
      } else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error');
      this.spinnerService.hide();
    })
  }

  editCategory() {
    if (this.categoryForm.invalid) {
      this.isValidForm = true;
      return;
    } else {
      let postData = {
        "CategoryName": this.categoryForm.value.categoryName,
      };
      this.spinnerService.show();
      this.adminService.editCategory(this.data?.id, postData).subscribe((res) => {
        if (res?.status == true) {
          this.closeDialog();
          this.toastr.success(res?.message);
          this.spinnerService.show();
        } else {
          this.toastr.error(res?.message);
          this.spinnerService.show();
        }
      }, (error: any) => {
        this.toastr.error('Internal server error');
        this.spinnerService.show();
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }

}
