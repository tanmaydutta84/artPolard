import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { SharedService } from '../../../services/shared.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

export interface DemoColor {
  name: string;
  color: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isFileUpload: boolean = false;
  files: any = [];
  categoryList: any = [];
  ckeConfig: any;
  mycontent!: string;
  @ViewChild("myckeditor") ckeditor: any;

  availableColors: DemoColor[] = [
    { name: 'none', color: 'gray' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  fruits = [{ name: 'Product1' }, { name: 'Product2' }, { name: 'Product3' }];

  constructor(
    public sharedService: SharedService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private cookieService: CookieService
  ) {
    this.sharedService.isShowSidebar = true;
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    this.productFormGroup();
  }

  ngOnInit(): void {
    this.getcategoryList();
  }

  productFormGroup() {
    this.productForm = this.formBuilder.group({
      productName: [],
      productCategory: [],
      price: [],
      priceType: [],
      stockNumber: [],
      vin: [],
      modelName: [],
      modelType: [],
      modelTypeStyle: [],
      manufacturerName: [],
      manufacturerYear: [],
      color: [],
      trimName: [],
      trimColor: [],
      condition: [],
      usage: [],
      miles: [],
      location: [],
      availability:[]
    });
  }

  getcategoryList() {
    this.spinnerService.show();
    this.apiService.categoryListByPopularity().subscribe((res) => {
      if (res?.status == true) {
        this.categoryList = res?.data;
        this.toastr.success(res?.message);
        this.spinnerService.hide();
      }
      else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error');
      this.spinnerService.hide();
    })
  }

  // chips start
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.isFileUpload == true) {
      this.saveProduct();
    } else {
      this.step++;
    }
  }

  prevStep() {
    this.step--;
  }

  saveProduct() {
    let formData: any = new FormData();
    formData.append('UserID', this.cookieService.get('userId'));
    formData.append('Itemtitle', this.productForm.value.productName);
    formData.append('Category', this.productForm.value.productCategory);
    formData.append('Itemlink', '');
    formData.append('ItemDescription', this.mycontent);
    formData.append('Price', this.productForm.value.price);
    formData.append('PriceType', this.productForm.value.priceType);
    formData.append('StockNumber', this.productForm.value.stockNumber);
    formData.append('Vin', this.productForm.value.vin);
    formData.append('Manufacturer', this.productForm.value.manufacturerName);
    formData.append('Year', this.productForm.value.manufacturerYear);
    formData.append('Color', this.productForm.value.color);
    formData.append('ModelType', this.productForm.value.modelType);
    formData.append('ModelName', this.productForm.value.modelName);
    formData.append('TrimName', this.productForm.value.trimName);
    formData.append('Conditions', this.productForm.value.condition);
    formData.append('Usages', this.productForm.value.usage);
    formData.append('Location', this.productForm.value.location);
    formData.append('Miles', this.productForm.value.miles);
    formData.append('Availability', this.productForm.value.availability);
    this.files.forEach((element: any) => {
      formData.append('image', element);
    });
    this.spinnerService.show();
    this.apiService.addProduct(formData).subscribe((res) => {
      if (res?.status == true) {
        this.productForm.reset();
        this.files = [];
        this.toastr.success(res?.message);
        this.spinnerService.hide();
      }
      else {
        this.toastr.error(res?.message);
        this.spinnerService.hide();
      }
    }, (error: any) => {
      this.toastr.error('Internal server error');
      this.spinnerService.hide();
    });
  }

  // dropzone drag and drop image

  onSelect(event: any) {
    this.isFileUpload = true;
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
