import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingProfileLeftComponent } from './setting-profile-left.component';

describe('SettingProfileLeftComponent', () => {
  let component: SettingProfileLeftComponent;
  let fixture: ComponentFixture<SettingProfileLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingProfileLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingProfileLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
