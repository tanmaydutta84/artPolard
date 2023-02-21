import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) {
    this.sharedService.isShowHeader = true;
    this.sharedService.isShowFooter = true;
  }

  ngOnInit(): void {
  }

}
