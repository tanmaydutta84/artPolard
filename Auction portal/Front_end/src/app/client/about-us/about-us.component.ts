import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) {
    this.sharedService.isShowHeader = true;
    this.sharedService.isShowFooter = true;
  }


  ngOnInit(): void {
  }

}
