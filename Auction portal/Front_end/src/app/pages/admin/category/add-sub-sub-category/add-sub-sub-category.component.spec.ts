import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubSubCategoryComponent } from './add-sub-sub-category.component';

describe('AddSubSubCategoryComponent', () => {
  let component: AddSubSubCategoryComponent;
  let fixture: ComponentFixture<AddSubSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubSubCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
