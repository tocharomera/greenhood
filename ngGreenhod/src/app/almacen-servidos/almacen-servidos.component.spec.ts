import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenServidosComponent } from './almacen-servidos.component';

describe('AlmacenServidosComponent', () => {
  let component: AlmacenServidosComponent;
  let fixture: ComponentFixture<AlmacenServidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenServidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenServidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
