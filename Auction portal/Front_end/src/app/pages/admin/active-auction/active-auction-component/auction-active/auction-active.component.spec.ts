import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionActiveComponent } from './auction-active.component';

describe('AuctionActiveComponent', () => {
  let component: AuctionActiveComponent;
  let fixture: ComponentFixture<AuctionActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
