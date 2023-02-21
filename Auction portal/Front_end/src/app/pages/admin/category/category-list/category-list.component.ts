import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonDialogComponent } from '../../../../pages/common/common-dialog/common-dialog.component';
import { ApiService } from '../../../../services/api.service';
import { AdminService } from '../../service/admin.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';
import { AddSubSubCategoryComponent } from '../add-sub-sub-category/add-sub-sub-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  catDisplayedColumns: string[] = ['srNo', 'catName', 'action'];
  catDataSource = new MatTableDataSource<any>();

  subCatDisplayedColumns: string[] = ['srNo', 'subCatName', 'action'];
  subCatDataSource = new MatTableDataSource<any>();

  subSubCatDisplayedColumns: string[] = ['srNo', 'subSubCatName', 'action'];
  subSubCatDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true })
  paginator1!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private adminService: AdminService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getcategoryList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.catDataSource.filter = filterValue.trim().toLowerCase();
  }

  getcategoryList() {
    let subCatArr: any = [];
    let subSubCatArr: any = [];
    this.spinnerService.show();
    this.apiService.categoryList().subscribe((res) => {
      if (res?.status == true) {
        res?.data.forEach((element: any) => {
          if (element?.subCate) {
            subCatArr = [...subCatArr, ...element?.subCate];
          }
        });
        subCatArr.forEach((element: any) => {
          if (element?.subCate) {
            subSubCatArr = [...subSubCatArr, ...element?.subCate];
          }
        });
        this.toastr.success(res?.message);
        let catData = res?.data.sort((a: any, b: any) => moment(b.createdAT).unix() - moment(a.date).unix());
        let subCatData = subCatArr.sort((a: any, b: any) => moment(b.createdAT).unix() - moment(a.date).unix());
        let subSubCatData = subSubCatArr.sort((a: any, b: any) => moment(b.createdAT).unix() - moment(a.date).unix());
        this.catDataSource = new MatTableDataSource(catData);
        this.subCatDataSource = new MatTableDataSource(subCatData);
        this.subSubCatDataSource = new MatTableDataSource(subSubCatData);
        this.catDataSource.paginator = this.paginator;
        this.subCatDataSource.paginator = this.paginator;
        this.subSubCatDataSource.paginator = this.paginator;
        this.catDataSource.sort = this.sort;
        this.subCatDataSource.sort = this.sort;
        this.subSubCatDataSource.sort = this.sort;
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

  openCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getcategoryList();
      }
    });
  }

  openSubCategory() {
    const dialogRef = this.dialog.open(AddSubCategoryComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getcategoryList();
      }
    });
  }

  openSubSubCategory() {
    const dialogRef = this.dialog.open(AddSubSubCategoryComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getcategoryList();
      }
    });
  }

  OpenCatEditDialog(id: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: {
        type: "Category",
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getcategoryList();
      }
    });
  }

  OpenCatDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        title: "Delete category",
        message: "Are you sure you want to delete this category?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.spinnerService.show();
        this.adminService.deleteCategoryById(id).subscribe((res) => {
          if (res?.status == true) {
            this.toastr.success(res?.message);
            this.getcategoryList();
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

  OpenSubCatEditDialog(id: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: {
        type: "Sub_Category",
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getcategoryList();
      }
    });
  }

  OpenSubCatDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        title: "Delete sub category",
        message: "Are you sure you want to delete this sub category?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.spinnerService.show();
        this.adminService.deleteCategoryById(id).subscribe((res) => {
          if (res?.status == true) {
            this.toastr.success(res?.message);
            this.getcategoryList();
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

  OpenSubSubCatEditDialog(id: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: {
        type: "Sub_Sub_Category",
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getcategoryList();
      }
    });
  }

  OpenSubSubCatDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        title: "Delete sub sub category",
        message: "Are you sure you want to delete this sub sub category?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.spinnerService.show();
        this.adminService.deleteCategoryById(id).subscribe((res) => {
          if (res?.status == true) {
            this.toastr.success(res?.message);
            this.getcategoryList();
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
