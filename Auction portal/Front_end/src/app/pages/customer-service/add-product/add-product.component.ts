import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { SharedService } from '../../../services/shared.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

export interface DemoColor {
  name: string;
  color: string;
}

interface Food {
  value: string;
  viewValue: string;
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
    private apiService: ApiService
  ) {
    this.sharedService.isShowSidebar = true;
    this.sharedService.isShowHeader = false;
    this.sharedService.isShowFooter = false;
    this.productFormGroup();
  }

  ngOnInit(): void { }

  productFormGroup() {
    this.productForm = this.formBuilder.group({
      productId: [],
      productName: [],
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
      updated: [],
      miles: [],
      location: [],
      desc: []
    });
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
  // chips end
  // select start
  foods: Food[] = [
    { value: 'electronic-0', viewValue: 'Electronic' },
    { value: 'fashion-1', viewValue: 'Fashion' },
    { value: 'fitness-2', viewValue: 'Fitness' },
  ];
  // select end
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
    let formData = new FormData();

    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    formData.append('Product_Name', this.productForm.value.productName);
    

    this.apiService.addProduct(formData).subscribe((res) => {

    });
  }

  // dropzone drag and drop image
  files: File[] = [];

  onSelect(event: any) {
    this.isFileUpload = true;    
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {    
    this.files.splice(this.files.indexOf(event), 1);
  }
}
