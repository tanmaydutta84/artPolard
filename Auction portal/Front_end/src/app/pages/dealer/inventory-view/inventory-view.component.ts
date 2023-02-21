import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})
export class InventoryViewComponent implements OnInit {

  userId: any;
  itemId: any;
  itemData: any;
  itemAttributes: any;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {
    this.userId = this.cookieService.get('userId');
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.itemId = params.id
      });
    this.getItem();
  }

  cleanString(str: any) {
    str = str.replace('"[', '[');
    str = str.replace(']"', ']');
    return str;
  }

  getItem() {
    let postData = {
      "ItemID": this.itemId,
      // "UserID": this.userId
    }
    this.apiService.getInventoryItemById(postData).subscribe((res) => {
      if (res?.status == true) {
        this.itemData = res?.data[0];
        this.itemAttributes = JSON.parse(res?.data[0]?.Attributes);
        this.toastr.success(res?.message);
      } else {
        this.toastr.error(res?.message);
      }
    }, (error) => {
      this.toastr.error("Internal server error!");
    });
  }

}
