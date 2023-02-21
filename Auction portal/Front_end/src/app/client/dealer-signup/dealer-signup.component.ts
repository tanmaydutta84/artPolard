import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../services/shared.service";

@Component({
  selector: 'app-dealer-signup',
  templateUrl: './dealer-signup.component.html',
  styleUrls: ['./dealer-signup.component.scss']
})
export class DealerSignupComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) {
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;

  }

  ngOnInit(): void {
  }

}
