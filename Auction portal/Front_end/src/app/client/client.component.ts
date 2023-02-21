import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  template: `
  <router-outlet></router-outlet>
`,
})
export class ClientComponent implements OnInit {

  constructor(public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

}
