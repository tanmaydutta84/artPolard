import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-active-auction',
  templateUrl: './active-auction.component.html',
  styleUrls: ['./active-auction.component.scss']
})
export class ActiveAuctionComponent implements OnInit {

  itemList: any = [];
  displayedColumns: string[] = ['srNo', 'year', 'image', 'title', 'description', 'category', 'price', 'publish', 'sold'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private apiService: ApiService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getItemList();
  }

  selectedToggle(event: any) {    
    if (event?.value == "0") {
      this.getItemList();
    } else if (event?.value == "1") {
      this.getActiveItemList();
    } else if (event?.value == "2") {
      this.getSoldItemList();
    } else {
      this.itemList();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getItemList() {
    this.spinnerService.show();
    this.adminService.itemList().subscribe((res) => {
      if (res?.status == true) {
        this.itemList = res?.data;
        this.itemList.forEach((element: any) => {
          element.Images = JSON.parse(element.Images)
        });
        this.dataSource = new MatTableDataSource(this.itemList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  getActiveItemList() {
    this.spinnerService.show();
    this.apiService.getPublishList().subscribe((res) => {
      if (res?.status == true) {
        this.itemList = res?.data;
        this.itemList.forEach((element: any) => {
          element.Images = JSON.parse(element.Images)
        });
        this.dataSource = new MatTableDataSource(this.itemList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  getSoldItemList() {
    this.spinnerService.show();
    this.adminService.soldItemList().subscribe((res) => {
      if (res?.status == true) {
        this.itemList = res?.data;
        this.itemList.forEach((element: any) => {
          element.Images = JSON.parse(element.Images)
        });
        this.dataSource = new MatTableDataSource(this.itemList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
