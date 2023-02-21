import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-all-auction',
  templateUrl: './all-auction.component.html',
  styleUrls: ['./all-auction.component.scss']
})
export class AllAuctionComponent implements OnInit {

  itemList: any = [];
  displayedColumns: string[] = ['srNo', 'year', 'image', 'title', 'description', 'category', 'price', 'publish', 'sold'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getItemList();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
