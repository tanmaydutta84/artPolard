import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  isValidForm: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.categoryFormGroup();
  }

  ngOnInit(): void {
  }

  categoryFormGroup() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      this.isValidForm = true;
      return;
    } else {
      let postData = {
        "Parent_ID": "0",
        "CategoryName": this.categoryForm.value.categoryName,
        "level": "1"
      };
      this.spinnerService.show();
      this.adminService.addCategory(postData).subscribe((res) => {
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
