import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceLoginComponent } from './customer-service-login.component';

describe('CustomerServiceLoginComponent', () => {
  let component: CustomerServiceLoginComponent;
  let fixture: ComponentFixture<CustomerServiceLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
