import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../services/shared.service';
import { CustomerServiceService } from '../service/customer-service.service';

@Component({
  selector: 'app-look-and-feel',
  templateUrl: './look-and-feel.component.html',
  styleUrls: ['./look-and-feel.component.scss'],
})
export class LookAndFeelComponent implements OnInit {

  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  logoForm!: FormGroup;
  bannerForm!: FormGroup;
  siteLookForm!: FormGroup;
  imageSrcLogo: any;
  imageSrcBanner: any;
  Newcolor: any;
  panelOpenState = false;
  step = 0;
  isValidLogoForm: boolean = false;
  isValidBannerForm: boolean = false;
  isValidSiteLookForm: boolean = false;
  imgFileLogo: any;
  imgFileBg: any;

  colorCtr: AbstractControl = new FormControl(null);

  constructor(
    public router: Router,
    public sharedService: SharedService,
    public _formbuilder: FormBuilder,
    public customerServiceService: CustomerServiceService,
    public toastr: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {
    this.logoFormGroup();
    this.bannerFormGroup();
    this.siteLookFormGroup();
  }

  ngOnInit(): void { }

  logoFormGroup() {
    this.logoForm = this._formbuilder.group({
      logo: ['', Validators.required]
    });
  }

  bannerFormGroup() {
    this.bannerForm = this._formbuilder.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      description: [''],
      backgroundImage: ['', Validators.required]
    });
  }

  siteLookFormGroup() {
    this.siteLookForm = this._formbuilder.group({
      font: ['', Validators.required],
      fontSize: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.logoForm.invalid) {
      this.isValidLogoForm = true;
      this.toastr.error('Please fill opend tab');
      return
    } else {
      this.step++;
    }

    if (this.bannerForm.invalid) {
      this.isValidBannerForm = true;
      this.toastr.error('Please fill opend tab');
      return
    } else {
      this.step++;
    }

    if (this.siteLookForm.invalid) {
      this.isValidSiteLookForm = true;
      this.toastr.error('Please fill opend tab');
      return
    } else {
      this.step++;
    }

  }

  prevStep() {
    this.step--;
  }

  onSelectChange(event: any) {    
  }

  onFileChangeLogo(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      let fileList: FileList = event.target.files[0];
      this.imgFileLogo = fileList;
      reader.onload = () => {
        this.imageSrcLogo = reader.result as string;

        // this.logoForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
    }
    // console.log('this.logoForm', this.logoForm);
  }

  onFileChangeBanner(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let fileList: FileList = event.target.files[0];
      this.imgFileBg = fileList;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrcBanner = reader.result as string;

        // this.bannerForm.value.backgroundImage({
        //   fileSource: reader.result,
        // });
      };
    }
  }

  saveFormData() {
    if (this.logoForm.invalid || this.bannerForm.invalid || this.siteLookForm.invalid) {
      this.isValidLogoForm = true;
      this.isValidBannerForm = true;
      this.isValidSiteLookForm = true;
      this.toastr.error('Please fill opend tab');
      return
    } else {
      const formData = new FormData();

      formData.append('logo', this.imgFileLogo);
      formData.append('banner_title', this.bannerForm.value.title);
      formData.append('banner_subtitle', this.bannerForm.value.subTitle);
      formData.append('description', this.bannerForm.value.description);
      formData.append('banner_image', this.imgFileBg);
      formData.append('font', this.siteLookForm.value.font);
      formData.append('font_size', this.siteLookForm.value.fontSize);
      formData.append('color', this.siteLookForm.value.color);
      this.spinnerService.show();
      this.customerServiceService.addTemplate(formData).subscribe((res) => {
        if (res?.status == true) {
          this.toastr.success(res?.message);
          this.logoForm.reset();
          this.bannerForm.reset();
          this.siteLookForm.reset();
          this.spinnerService.hide();
        }
        else {
          this.toastr.error(res?.message);
          this.spinnerService.hide();
        }
      }, (error) => {
        this.toastr.error("Internal server error!");
        this.spinnerService.hide();
      });
    }
  }
}
