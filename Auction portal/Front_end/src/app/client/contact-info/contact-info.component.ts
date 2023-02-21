import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) {
    this.sharedService.isShowHeader = true;
    this.sharedService.isShowFooter = true;
  }

  ngOnInit(): void {
  }

}
