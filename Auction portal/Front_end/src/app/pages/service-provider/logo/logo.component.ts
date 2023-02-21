import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ServicerProviderService } from '../service/service-provider.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  logoForm!: FormGroup
  imageSrcLogo: any;
  userId: any;
  isShowLogo: boolean = true;
  isValidForm: boolean = false;
  imgFile: any;

  constructor(
    public _formbuilder: FormBuilder,
    public servicerProviderService: ServicerProviderService,
    public toastr: ToastrService,
    private cookieService: CookieService
  ) {
    this.userId = this.cookieService.get('userId');
    this.logoFormGroup();
  }

  ngOnInit(): void {
  }

  logoFormGroup() {
    this.logoForm = this._formbuilder.group({
      logo: ['', Validators.required]
    });
  }

  onFileChangeLogo(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      let fileList: FileList = event.target.files[0];
      this.imgFile = fileList;
      reader.onload = () => {
        this.imageSrcLogo = reader.result as string;
        this.isShowLogo = false;
        // this.logoForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
    }
    // console.log('this.logoForm', this.logoForm);
  }

  addLogo() {
    if (this.logoForm.invalid) {
      this.isValidForm = true;
      return
    } else {
      const formData = new FormData();

      formData.append('logo', this.imgFile);
      formData.append('UserID', this.userId);
      formData.append('status', 'Pending');

      this.servicerProviderService.addLogo(formData).subscribe((res:any) => {
        if (res?.status == true) {
          this.imageSrcLogo = "";
          this.isShowLogo = true;
          this.toastr.success(res?.message);
        } else {
          this.toastr.error(res?.message);
        }
      });
    }
  }

}
