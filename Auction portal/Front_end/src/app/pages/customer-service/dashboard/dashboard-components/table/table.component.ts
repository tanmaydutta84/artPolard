import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerServiceService } from '../../../service/customer-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogComponent } from '../../../../common/common-dialog/common-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-viewdetail-dialog',
  templateUrl: 'viewdetail-dialog.html',
  styleUrls: ['./table.component.scss']
})
export class ViewDetailDialogComponent implements OnInit {

  imageSrcLogo: any;
  registerUpdateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ViewDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _formbuilder: FormBuilder,
    public customerServiceService: CustomerServiceService,
    private spinnerService: NgxSpinnerService
  ) {
    this.registerUpdateFormGroup();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  registerUpdateFormGroup() {
    this.registerUpdateForm = this._formbuilder.group({
      firstName: [this.data?.firstName + this.data?.lastName, Validators.required],
      email: [this.data?.email, Validators.required],
      // lastName: [this.data?.lastName, Validators.required],
      phone: [this.data?.phone, Validators.required],
      company: [this.data?.company, Validators.required],
      dealer: ['', Validators.required],
      businessType: [this.data?.Business_type, Validators.required],
      dealerAccount: [this.data?.Dealer_Account, Validators.required],
      website: [this.data?.Website, Validators.required],
      address1: [this.data?.Address1, Validators.required],
      // address2: [this.data?.Address2, Validators.required],
      city: [this.data?.city, Validators.required],
      state: [this.data?.state, Validators.required],
      postalCode: [this.data?.postalcode, Validators.required],
      country: [this.data?.country, Validators.required],
      logo: ['', Validators.required]
    });
  }

  onFileChangeLogo(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrcLogo = reader.result as string;

        // this.myForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
    }
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  // 'select'
  displayedColumns: string[] = ['srNo', 'logo', 'name', 'email', 'status', 'view', 'action'];
  dataSource = new MatTableDataSource<any>();
  // selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(
    public dialog: MatDialog,
    public customerServiceService: CustomerServiceService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  openDialog(data: any) {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.data = this.dataSource
    const dialogRef = this.dialog.open(ViewDetailDialogComponent, {
      width: '700px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    // console.log('dialogConfig.data', dialogRef.componentInstance['data'][0]);
  }

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getAllUserList();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.openDeleteDialog();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  getAllUserList() {
    this.spinnerService.show();
    this.customerServiceService.userList().subscribe((res) => {
      if (res?.status == true) {
        this.toastr.success(res?.message);
        let data = res?.data.sort((a: any, b: any) => moment(b.created_at).unix() - moment(a.date).unix());
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  OpenStatusDialog(id: any, status: any) {
    const dialogRef = this.dialog.open(UserStatusDialogComponent, {
      width: '500px',
      data: {
        id: id,
        status: status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUserList();
    });
  }

  deleteUser(id: any) {
    this.openDeleteDialog(id);
  }

  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.spinnerService.show();
        this.customerServiceService.deleteUser(id).subscribe((res) => {
          if (res?.status == true) {
            this.toastr.success(res?.message);
            this.getAllUserList();
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
@Component({
  selector: 'user-status-dialog',
  templateUrl: './user-status-dialog.html',
  styleUrls: ['./table.component.scss']
})
export class UserStatusDialogComponent {

  status: any;
  userStatus: any;

  constructor(
    public dialogRef: MatDialogRef<UserStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public router: Router,
    public sharedService: SharedService,
    public _formbuilder: FormBuilder,
    public customerServiceService: CustomerServiceService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.status = data?.status;
  }

  ngOnInit(): void {
  }

  selectedStatus(event: any) {
    this.userStatus = event?.value
  }

  statusUpdate() {
    let postData = {
      "Dealer_Account": this.userStatus
    };
    this.spinnerService.show();
    this.customerServiceService.userStatusUpdate(this.data?.id, postData).subscribe((res) => {
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


/** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

/** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

/** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }


// export interface PeriodicElement {
//   name: string;
//   status: string;
//   position: number;
//   weight: string;
//   symbol: string;
//   view: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', status: 'Pending', weight: 'abc@gmail.com', symbol: 'H', view: 'View Details' },
//   { position: 2, name: 'Helium', status: 'Pending', weight: 'abc@gmail.com', symbol: 'He', view: 'View Details' },
//   { position: 3, name: 'Lithium', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Li', view: 'View Details' },
//   { position: 4, name: 'Beryllium', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Be', view: 'View Details' },
//   { position: 5, name: 'Boron', status: 'Pending', weight: 'abc@gmail.com', symbol: 'B', view: 'View Details' },
//   { position: 6, name: 'Carbon', status: 'Pending', weight: 'abc@gmail.com', symbol: 'C', view: 'View Details' },
//   { position: 7, name: 'Nitrogen', status: 'Pending', weight: 'abc@gmail.com', symbol: 'N', view: 'View Details' },
//   { position: 8, name: 'Oxygen', status: 'Pending', weight: 'abc@gmail.com', symbol: 'O', view: 'View Details' },
//   { position: 9, name: 'Fluorine', status: 'Pending', weight: 'abc@gmail.com', symbol: 'F', view: 'View Details' },
//   { position: 10, name: 'Neon', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Ne', view: 'View Details' },
//   { position: 11, name: 'Sodium', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Na', view: 'View Details' },
//   { position: 12, name: 'Magnesium', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Mg', view: 'View Details' },
//   { position: 13, name: 'Aluminum', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Al', view: 'View Details' },
//   { position: 14, name: 'Silicon', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Si', view: 'View Details' },
//   { position: 15, name: 'Phosphorus', status: 'Pending', weight: 'abc@gmail.com', symbol: 'P', view: 'View Details' },
//   { position: 16, name: 'Sulfur', status: 'Pending', weight: 'abc@gmail.com', symbol: 'S', view: 'View Details' },
//   { position: 17, name: 'Chlorine', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Cl', view: 'View Details' },
//   { position: 18, name: 'Argon', status: 'Pending', weight: 'abc@gmail.com', symbol: 'Ar', view: 'View Details' },
//   { position: 19, name: 'Potassium', status: 'Pending', weight: 'abcxyz1@gmail.com', symbol: 'K', view: 'View Details' },
//   { position: 20, name: 'Calcium', status: 'Pending', weight: 'abc001@gmail.com', symbol: 'Ca', view: 'View Details' },
// ];
