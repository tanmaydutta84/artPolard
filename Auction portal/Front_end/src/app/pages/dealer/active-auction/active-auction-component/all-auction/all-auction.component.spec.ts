import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAuctionComponent } from './all-auction.component';

describe('AllAuctionComponent', () => {
  let component: AllAuctionComponent;
  let fixture: ComponentFixture<AllAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAuctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
