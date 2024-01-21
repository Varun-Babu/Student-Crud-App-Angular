import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuAddEditComponentComponent } from './stu-add-edit-component.component';

describe('StuAddEditComponentComponent', () => {
  let component: StuAddEditComponentComponent;
  let fixture: ComponentFixture<StuAddEditComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StuAddEditComponentComponent]
    });
    fixture = TestBed.createComponent(StuAddEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
