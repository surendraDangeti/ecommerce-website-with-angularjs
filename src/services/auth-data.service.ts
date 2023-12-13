import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor() { }

  AuthData:any = false  

  getLocalStorageData(): any | null {
    if (typeof localStorage !== 'undefined' && typeof localStorage !== undefined && 
    typeof localStorage !== null && localStorage
    ) {
      const localStorageData = localStorage?.getItem('authData');

      if (this.verifyData(localStorageData)) {
        this.AuthData = true
        return JSON.parse(localStorageData as string);
      } else {
        console.log('localStorage data is not available or not valid', localStorage);
        this.AuthData = false
        return null;
      }
    } else {
      console.error('localStorage is not available');
      this.AuthData = false
      return null;
    }
  }

  getAuthData(): any | string {
    if (typeof localStorage !== 'undefined') {
      const authDataString = localStorage.getItem('authData') || '';

      if (this.verifyData(authDataString)) {
        const authData = JSON.parse(authDataString); 

        if (authData && authData.token) {
          this.AuthData = true
          return authData;
        }
      }

      return ''; 
    } else {
      console.error('localStorage is not availableeee');
      return '';
    }
  }

  verifyData(data: any): boolean {
    return data !== undefined && data !== null && data !== '';
  }
}
