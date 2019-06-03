import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagementViewComponent } from './employee-management-view.component';

describe('EmployeeManagementViewComponent', () => {
  let component: EmployeeManagementViewComponent;
  let fixture: ComponentFixture<EmployeeManagementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManagementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
