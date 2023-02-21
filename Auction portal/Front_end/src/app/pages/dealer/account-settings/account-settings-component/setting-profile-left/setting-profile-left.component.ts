import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-setting-profile-left',
  templateUrl: './setting-profile-left.component.html',
  styleUrls: ['./setting-profile-left.component.scss']
})
export class SettingProfileLeftComponent implements OnInit {

  profileSrcLogo: any;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) {
    this.profileSrcLogo = this.apiService?.logoPath + this.cookieService.get('image');
  }

  onprofileChangeLogo(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.profileSrcLogo = reader.result as string;

        // this.myForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
    }
  }

  ngOnInit(): void {
  }

}
