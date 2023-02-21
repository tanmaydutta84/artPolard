import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-inventory-item',
  templateUrl: './edit-inventory-item.component.html',
  styleUrls: ['./edit-inventory-item.component.scss']
})
export class EditInventoryItemComponent implements OnInit {

  panelOpenState = false;
  isValidForm: boolean = false;
  categoryList: any;
  categoryValue: any
  categoryForm!: FormGroup;
  inventoryForm!: FormGroup;

  ckeConfig: any;
  mycontent!: string;
  @ViewChild("myckeditor") ckeditor: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditInventoryItemComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.categoryFormGroup();
    this.invetoryFormGroup();
    this.setFormData();
  }

  ngOnInit(): void {
    // this.getItem();    
    this.getcategoryList();
  }

  onChange(event: any): void {
    // console.log(event);
    // console.log(this.mycontent);
    // console.log('ckeditor', this.ckeditor);

    //this.log += new Date() + "<br />";
  }

  getcategoryList() {
    this.spinnerService.show();
    this.apiService.categoryListByPopularity().subscribe((res) => {
      if (res?.status == true) {
        this.categoryList = res?.data;
        this.toastr.success(res?.message);
        this.spinnerService.hide();
      } else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.warning('Internal server error!');
      this.spinnerService.hide();
    })
  }

  categoryFormGroup() {
    this.categoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      // subCategory: ['', Validators.required]
      // description: ['', Validators.required],
    });
  }

  invetoryFormGroup() {
    this.inventoryForm = this.formBuilder.group({
      availability: ['', Validators.required],
      usages: ['', Validators.required],
      location: ['', Validators.required],
      miles: ['', Validators.required],
      stockNumber: ['', Validators.required],
      vin: ['', Validators.required],
      color: ['', Validators.required],
      trimColor: ['', Validators.required],
      conditions: ['', Validators.required],
      price: ['', Validators.required],
      priceType: ['', Validators.required],
      modelName: ['', Validators.required],
    });
  }

  setFormData() {
    console.log('data', this.data);
    this.categoryValue = this.data?.CategoryName;
    this.mycontent = this.data?.ItemDescription;
    this.categoryForm.controls['title'].setValue(this.data?.Itemtitle);
    this.categoryForm.controls['category'].setValue(this.data?.CategoryName);
    // this.categoryForm.controls['subCategory'].setValue('Bennington');
    // this.categoryForm.controls['description'].setValue(this.data?.ItemDescription);
    this.inventoryForm.controls['availability'].setValue(this.data?.Availability);
    this.inventoryForm.controls['usages'].setValue(this.data?.Usages);
    this.inventoryForm.controls['location'].setValue(this.data?.Location);
    this.inventoryForm.controls['miles'].setValue(this.data?.Miles);
    this.inventoryForm.controls['stockNumber'].setValue(this.data?.StockNumber);
    this.inventoryForm.controls['vin'].setValue(this.data?.Itemtitle);
    this.inventoryForm.controls['color'].setValue(this.data?.Color);
    this.inventoryForm.controls['trimColor'].setValue(this.data?.TrimColor);
    this.inventoryForm.controls['conditions'].setValue(this.data?.Conditions);
    this.inventoryForm.controls['price'].setValue(this.data?.Price);
    this.inventoryForm.controls['priceType'].setValue(this.data?.PriceType);
    this.inventoryForm.controls['modelName'].setValue(this.data?.ModelName);
    console.log('categoryFomr', this.categoryForm);

  }

  // getItem() {
  //   let postData = {
  //     "ItemID": this.data?.ItemID,
  //     "UserID": this.data?.UserID
  //   }
  //   this.apiService.getInventoryItemById(postData).subscribe((res) => {
  //     if (res?.status == true) {
  //       console.log(res);
  //       // this.setFormData(res?.data[0]);
  //     }
  //   });
  // }

  submitInventory() {
    if (this.categoryForm.invalid || this.inventoryForm.invalid) {
      this.isValidForm = true;
      return;
    } else {
      let postData = {
        "ItemID": this.data?.ItemID,
        "Title": this.categoryForm.value.title,
        "Category": this.categoryForm.value.category,
        // "subCategory": this.categoryForm.value.subCategory,
        "Availability": this.inventoryForm.value.availability,
        "ItemDescription": this.mycontent,
        "Usages": this.inventoryForm.value.usages,
        "Location": this.inventoryForm.value.location,
        "Miles": this.inventoryForm.value.miles,
        "StockNumber": this.inventoryForm.value.stockNumber,
        "Vin": this.inventoryForm.value.vin,
        "Color": this.inventoryForm.value.color,
        "TrimColor": this.inventoryForm.value.trimColor,
        "Conditions": this.inventoryForm.value.conditions,
        "Price": this.inventoryForm.value.price,
        "PriceType": this.inventoryForm.value.priceType,
        "ModelName": this.inventoryForm.value.modelName
      }
      this.spinnerService.show();
      this.apiService.editInventoryItem(this.data?.AuctionID, postData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.closeDialog();
          this.categoryForm.reset();
          this.spinnerService.hide();
        } else {
          this.toastr.error(res?.message);
          this.spinnerService.hide();
        }
      }, (error: any) => {
        this.toastr.warning('Internal server error!');
        this.spinnerService.hide();
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
