import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredCheckComponent } from './required-check.component';

describe('RequiredCheckComponent', () => {
  let component: RequiredCheckComponent;
  let fixture: ComponentFixture<RequiredCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
