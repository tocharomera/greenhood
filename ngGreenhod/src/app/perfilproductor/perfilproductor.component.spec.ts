import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilproductorComponent } from './perfilproductor.component';

describe('PerfilproductorComponent', () => {
  let component: PerfilproductorComponent;
  let fixture: ComponentFixture<PerfilproductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilproductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilproductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
