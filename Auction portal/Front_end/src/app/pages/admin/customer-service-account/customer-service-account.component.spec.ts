import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceAccountComponent } from './customer-service-account.component';

describe('CustomerServiceAccountComponent', () => {
  let component: CustomerServiceAccountComponent;
  let fixture: ComponentFixture<CustomerServiceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerServiceAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
