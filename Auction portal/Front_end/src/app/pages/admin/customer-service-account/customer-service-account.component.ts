import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../services/shared.service';
import { AdminService } from '../service/admin.service';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-service-account',
  templateUrl: './customer-service-account.component.html',
  styleUrls: ['./customer-service-account.component.scss']
})
export class CustomerServiceAccountComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'username', 'email', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();

  customerForm!: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public sharedService: SharedService,
    public formbuilder: FormBuilder,
    public adminService: AdminService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.customerList();
  }

  customerList() {
    this.spinnerService.show();
    this.adminService.customerServiceUserList().subscribe((res) => {
      if (res?.status == true) {
        let data = res?.data.sort((a: any, b: any) => moment(b.created_at).unix() - moment(a.date).unix());
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CustomerFormDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.customerList();
    });
  }

  openStatusDialog(id: any, status: any) {
    const dialogRef = this.dialog.open(CustomerStatusDialogComponent, {
      width: '500px',
      data: { id, status }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.customerList();
    });
  }

  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        title: "Delete customer service account ",
        message: "Are you sure you want to delete this customer service account?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.spinnerService.show();
        this.adminService.deleteCustomerService(id).subscribe((res) => {
          if (res?.status == true) {
            this.toastr.success(res?.message);
            this.customerList();
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
    });
  }

}

// add user
@Component({
  selector: 'customer-form-dialog',
  templateUrl: 'customer-form-dialog.html',
  styleUrls: ['./customer-service-account.component.scss']
})
export class CustomerFormDialog {

  customerForm!: FormGroup;
  isValidForm: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomerFormDialog>,
    public router: Router,
    public sharedService: SharedService,
    public formbuilder: FormBuilder,
    public adminService: AdminService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.customerFormGroup();
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  customerFormGroup() {
    this.customerForm = this.formbuilder.group({
      name: [''],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  addCustomer() {
    if (this.customerForm.invalid) {
      this.isValidForm = true;
      return
    }
    else {
      let postData = {
        "Name": this.customerForm.value.name,
        "Username": this.customerForm.value.userName,
        "Emailid": this.customerForm.value.email,
        "Password": this.customerForm.value.password
      };
      this.spinnerService.show();
      this.adminService.addCustomerServiceUser(postData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.closeDialog();
          this.customerForm.reset();
          this.spinnerService.hide();
          // this.router.navigate(['/login']);
        } else {
          this.toastr.error(res?.message);
          this.spinnerService.hide();
        }
      });
    }
  }

}

// status Dialog

@Component({
  selector: 'customer-status-dialog',
  templateUrl: './customer-status-dialog.html',
  styleUrls: ['./customer-service-account.component.scss']
})
export class CustomerStatusDialogComponent {

  status: any;
  customerStatus: any;

  constructor(
    public dialogRef: MatDialogRef<CustomerStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public sharedService: SharedService,
    public _formbuilder: FormBuilder,
    public adminService: AdminService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.status = data?.status;
  }

  ngOnInit(): void {
  }

  selectedStatus(event: any) {
    this.customerStatus = event?.value
  }

  statusUpdate() {
    let postData = {
      "isActive": this.customerStatus
    };
    this.spinnerService.show();
    this.adminService.statusUpdate(this.data?.id, postData).subscribe((res) => {
      if (res?.status == true) {
        this.toastr.success(res?.message);
        this.closeDialog();
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

  closeDialog(): void {
    this.dialogRef.close();
  }

}
