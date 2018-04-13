import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmsgComponent } from './allmsg.component';

describe('AllmsgComponent', () => {
  let component: AllmsgComponent;
  let fixture: ComponentFixture<AllmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
