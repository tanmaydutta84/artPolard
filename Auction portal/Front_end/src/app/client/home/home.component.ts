import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    public route: Router
  ) {
    this.sharedService.isShowHeader = true;
    this.sharedService.isShowFooter = true;
    this.sharedService.businessType = "";
  }

  ngOnInit(): void {
  }

  redirectToSignUp() {
    this.sharedService.businessType = "Dealer";
    this.route.navigate(['/signup']);
  }

  signUpManufacturer() {
    this.sharedService.businessType = "Manufacturer";
    this.route.navigate(['/signup']);
  }

  signUpServiceProvider() {
    this.sharedService.businessType = "ServiceProvider";
    this.route.navigate(['/signup']);
  }
}
