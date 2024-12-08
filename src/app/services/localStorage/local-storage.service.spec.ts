import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    spyOn(localStorage, 'setItem'); // Espía el método setItem de localStorage
    spyOn(localStorage, 'removeItem'); // Espía el método removeItem de localStorage
    spyOn(localStorage, 'clear'); // Espía el método clear de localStorage
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if the code is running in a browser', () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      expect(service.isBrowser).toBeTrue();
    } else {
      expect(service.isBrowser).toBeFalse();
    }
  });

  it('should set item in localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Test' };
    
    service.setItem(key, value);
    
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it('should get item from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"name": "Test"}'); // Espía y simula la respuesta de localStorage

    const key = 'testKey';
    const expectedValue = { name: 'Test' };
    
    const result = service.getItem(key);
    
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(expectedValue);
  });

  it('should return null if item is not found', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simula que no se encuentra el item

    const result = service.getItem('nonExistentKey');
    
    expect(result).toBeNull();
  });

  it('should remove item from localStorage', () => {
    const key = 'testKey';
    
    service.removeItem(key);
    
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should clear localStorage', () => {
    service.clear();
    
    expect(localStorage.clear).toHaveBeenCalled();
  });
});