import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibidosConsuComponent } from './recibidos-consu.component';

describe('RecibidosConsuComponent', () => {
  let component: RecibidosConsuComponent;
  let fixture: ComponentFixture<RecibidosConsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibidosConsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibidosConsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
