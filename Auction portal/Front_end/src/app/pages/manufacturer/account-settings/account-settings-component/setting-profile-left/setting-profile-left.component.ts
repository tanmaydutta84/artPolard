import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-profile-left',
  templateUrl: './setting-profile-left.component.html',
  styleUrls: ['./setting-profile-left.component.scss']
})
export class SettingProfileLeftComponent implements OnInit {

  profileSrcLogo: any;

  constructor() { }

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
