import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationBuilderComponent } from './registration-builder.component';

describe('RegistrationBuilderComponent', () => {
  let component: RegistrationBuilderComponent;
  let fixture: ComponentFixture<RegistrationBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
