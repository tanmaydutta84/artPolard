import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastBuyerComponent } from './past-buyer.component';

describe('PastBuyerComponent', () => {
  let component: PastBuyerComponent;
  let fixture: ComponentFixture<PastBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
