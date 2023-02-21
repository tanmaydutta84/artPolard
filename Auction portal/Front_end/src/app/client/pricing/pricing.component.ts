import { Component, ViewChild, OnInit,Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  displayedColumns: string[] = ['service', 'charge'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  constructor() { }

  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  service: string;
  charge: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {service: 'Boldface Title', charge: '$10'},
  {service: 'Colored Title', charge: '$2.20'},
  {service: 'Featured Listings', charge: '$1'},
  {service: 'Highlight', charge: '$1.45'},
  {service: 'Scheduled Listing', charge: '$3'},
  {service: 'Showcase Listings', charge: '$0'},
  {service: 'Subtitle', charge: '$1.20'},
];
