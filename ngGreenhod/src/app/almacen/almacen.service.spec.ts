import { TestBed, inject } from '@angular/core/testing';
import { AlmacenVMService } from './almacen.service';


describe('PersonasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlmacenVMService]
    });
  });

  it('should be created', inject([AlmacenVMService], (service: AlmacenVMService) => {
    expect(service).toBeTruthy();
  }));
});
