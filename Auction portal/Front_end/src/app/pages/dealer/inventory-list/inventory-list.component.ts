import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api.service';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';
import { QuoteByPhoneComponent } from '../../common/quote-by-phone/quote-by-phone.component';
import { RequestQuoteComponent } from '../../common/request-quote/request-quote.component';
import { EditInventoryItemComponent } from '../edit-inventory-item/edit-inventory-item.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  xmlData: any = [];
  userId: any;
  xmlFile: any;
  displayedColumns: string[] = ['srNo', 'year', 'image', 'title', 'description', 'category', 'price', 'publish', 'sold', 'itemInfo', 'action'];
  dataSource = new MatTableDataSource<any>();
  // selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.userId = this.cookieService.get('userId');
  }

  ngOnInit(): void {
    this.getXmlFile();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // openQuotePhoneDialog() {
  //   const dialogRef = this.dialog.open(QuoteByPhoneComponent, {
  //     width: '500px',
  //   });
  // }

  // openRequestQuote() {
  //   const dialogRef = this.dialog.open(RequestQuoteComponent, {
  //     width: '500px',
  //   });
  // }

  // select start
  foods: Food[] = [
    { value: 'auction-0', viewValue: 'Auction Date' },
    { value: 'year-1', viewValue: 'Year' },
    { value: 'model-2', viewValue: 'Model' },
  ];

  getXmlFile() {
    this.spinnerService.show();
    this.apiService.getXmlFileData(this.userId).subscribe((res) => {
      if (res?.status == true) {
        this.spinnerService.hide();
        let tempArray = res?.data.sort((a: any, b: any) => moment(b.ItemcreatedAT).unix() - moment(a.date).unix());
        tempArray.forEach((element: any) => {
          element.Images = JSON.parse(element?.Images)
        });
        this.dataSource = new MatTableDataSource(tempArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.toastr.success(res?.message);
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

  publishItem(element: any, event: boolean) {
    if (event == true) {
      let postData = {
        "ItemID": element?.ItemID,
        "IsPublished": event
      }
      this.spinnerService.show();
      this.apiService.setPublishStatus(element.AuctionID, postData).subscribe((res) => {
        if (res?.status == true) {
          this.spinnerService.hide();
          this.toastr.success(res?.message);
          this.getXmlFile();
          this.spinnerService.hide();
        } else {
          this.toastr.error(res?.message);
        }
      }, (error) => {
        this.toastr.error("Internal server error!");
        this.spinnerService.hide();
      });
    }
    else {
      const dialogRef = this.dialog.open(CommonDialogComponent, {
        width: '500px',
        data: {
          type: "info",
          title: "Change published item",
          message: "Are you sure you want to pull these items?",
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          let postData = {
            "ItemID": element?.ItemID,
            "IsPublished": event
          }
          this.spinnerService.show();
          this.apiService.setPublishStatus(element.AuctionID, postData).subscribe((res) => {
            if (res?.status == true) {
              this.spinnerService.hide();
              this.toastr.success(res?.message);
              this.getXmlFile();
            } else {
              this.toastr.error(res?.message);
              this.spinnerService.hide();
            }
          }, (error) => {
            this.toastr.error("Internal server error!");
            this.spinnerService.hide();
          });
        } else {
          this.getXmlFile();
        }
      });
    }
  }

  OpenEditDialog(element: {}) {
    const dialogRef = this.dialog.open(EditInventoryItemComponent, {
      // width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getXmlFile();
      }
    });
  }

  openDeleteDialog(auctionId: number, itemId: string, userId: number) {
    // event.stopPropagation();
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '500px',
      data: {
        title: "Delete inventory item",
        message: "Are you sure you want to delete this item?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        let postData = {
          "ItemID": itemId,
          "UserID": userId
        }
        this.spinnerService.show();
        this.apiService.deleteItemById(auctionId, postData).subscribe((res) => {
          if (res?.status == true) {
            this.spinnerService.hide();
            this.toastr.success(res?.message);
            this.getXmlFile();
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
