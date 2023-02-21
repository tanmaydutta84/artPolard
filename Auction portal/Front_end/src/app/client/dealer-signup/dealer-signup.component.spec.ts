import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSignupComponent } from './dealer-signup.component';

describe('DealerSignupComponent', () => {
  let component: DealerSignupComponent;
  let fixture: ComponentFixture<DealerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
