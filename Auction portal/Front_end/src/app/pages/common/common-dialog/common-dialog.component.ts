import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  type: any
  title: any;
  message: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

}
