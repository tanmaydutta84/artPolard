import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  displayedColumns: string[] = ['srNo', 'year', 'image', 'title', 'description', 'category', 'price', 'sold', 'itemInfo'];
  dataSource = new MatTableDataSource<any>();

  itemList: any = [];

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.getItem(params.id);
      });
  }

  getItem(id: any) {
    this.spinnerService.show();
    this.apiService.filterByCategoryId(id).subscribe((res) => {
      if (res?.status == true) {
        let tempArray = this.itemList = res?.data;
        tempArray.forEach((element: any) => {
          element.Images = JSON.parse(element.Images)
        });
        this.dataSource = new MatTableDataSource(tempArray);
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

}
