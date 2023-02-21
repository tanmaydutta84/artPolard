import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerLogoComponent } from './dealer-logo.component';

describe('DealerLogoComponent', () => {
  let component: DealerLogoComponent;
  let fixture: ComponentFixture<DealerLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
