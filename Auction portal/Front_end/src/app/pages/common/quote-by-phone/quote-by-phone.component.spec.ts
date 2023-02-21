import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteByPhoneComponent } from './quote-by-phone.component';

describe('QuoteByPhoneComponent', () => {
  let component: QuoteByPhoneComponent;
  let fixture: ComponentFixture<QuoteByPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteByPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteByPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
