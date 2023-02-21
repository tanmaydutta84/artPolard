import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonDialogComponent } from '../../../common/common-dialog/common-dialog.component';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-dealer-logo',
  templateUrl: './dealer-logo.component.html',
  styleUrls: ['./dealer-logo.component.scss']
})
export class DealerLogoComponent implements OnInit {

  displayedColumns: string[] = ['srno', 'logo', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  // selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public adminService: AdminService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllLogoList();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openStatusDialog(event: any) {
    const dialogRef = this.dialog.open(LogoEditDialogComponent, {
      width: '400px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLogoList();
    });
  }

  getAllLogoList() {
    this.spinnerService.show();
    this.adminService.LogoList().subscribe((res) => {
      if (res?.status == true) {
        this.toastr.success(res?.message);
        let data = res?.data.sort((a: any, b: any) => moment(b.createdAt).unix() - moment(a.date).unix());
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

  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        title: "Delete logo",
        message: "Are you sure you want to delete this logo?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.spinnerService.show();
        this.adminService.deleteLogo(id).subscribe((res) => {
          if (res?.status == true) {
            this.toastr.success(res?.message);
            this.getAllLogoList();
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

}

@Component({
  selector: 'app-logoedit-dialog',
  templateUrl: './logoedit-dialog.html',
  styleUrls: ['./dealer-logo.component.scss']
})
export class LogoEditDialogComponent implements OnInit {

  Logostatus: any;
  logoData: any;

  constructor(
    public dialogRef: MatDialogRef<LogoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminService: AdminService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.getAllLogoList();
  }

  // getAllLogoList() {
  //   this.adminService.LogoList().subscribe((res) => {
  //     if (res?.status == true) {
  //       this.toastr.success(res?.message);
  //       this.logoData = res?.data;
  //     } else {
  //       this.toastr.error(res?.message);
  //     }
  //   });
  // }

  selectedStatus(value: any) {
    this.Logostatus = value;
  }

  updateLogo() {
    let postData = {
      "logo_id": this.data?.logo_id,
      "status": this.Logostatus
    };
    this.spinnerService.show();
    if (this.data?.logo_id) {
      this.adminService.updateLogoDetails(postData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.dialogRef.close();
          this.spinnerService.hide();
        } else {
          this.toastr.error(res?.message);
          this.dialogRef.close();
          this.spinnerService.hide();
        }
      }, (error) => {
        this.toastr.error("Internal server error!");
        this.spinnerService.hide();
      });
    }
  }
}



// export interface PeriodicElement {
//   dealer: string;
//   status: string;
//   position: number;
//   symbol: string;
//   action: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, dealer: 'Hydrogen', status: 'Pendding', symbol: 'H', action: '' },
//   { position: 2, dealer: 'Helium', status: 'Pendding', symbol: 'He', action: '' },
//   { position: 3, dealer: 'Lithium', status: 'Pendding', symbol: 'Li', action: '' },
//   { position: 4, dealer: 'Beryllium', status: 'Pendding', symbol: 'Be', action: '' },
//   { position: 5, dealer: 'Boron', status: 'Pendding', symbol: 'B', action: '' },
//   { position: 6, dealer: 'Carbon', status: 'Pendding', symbol: 'C', action: '' },
//   { position: 7, dealer: 'Nitrogen', status: 'Pendding', symbol: 'N', action: '' },
//   { position: 8, dealer: 'Oxygen', status: 'Pendding', symbol: 'O', action: '' },
//   { position: 9, dealer: 'Fluorine', status: 'Pendding', symbol: 'F', action: '' },
//   { position: 10, dealer: 'Neon', status: 'Pendding', symbol: 'Ne', action: '' },
//   { position: 11, dealer: 'Sodium', status: 'Pendding', symbol: 'Na', action: '' },
//   { position: 12, dealer: 'Magnesium', status: 'Pendding', symbol: 'Mg', action: '' },
//   { position: 13, dealer: 'Aluminum', status: 'Pendding', symbol: 'Al', action: '' },
//   { position: 14, dealer: 'Silicon', status: 'Pendding', symbol: 'Si', action: '' },
//   { position: 15, dealer: 'Phosphorus', status: 'Pendding', symbol: 'P', action: '' },
//   { position: 16, dealer: 'Sulfur', status: 'Pendding', symbol: 'S', action: '' },
//   { position: 17, dealer: 'Chlorine', status: 'Pendding', symbol: 'Cl', action: '' },
//   { position: 18, dealer: 'Argon', status: 'Pendding', symbol: 'Ar', action: '' },
//   { position: 19, dealer: 'Potassium', status: 'Pendding', symbol: 'K', action: '' },
//   { position: 20, dealer: 'Calcium', status: 'Pendding', symbol: 'Ca', action: '' },
// ];
