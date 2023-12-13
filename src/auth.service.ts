import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    const authDataString = localStorage.getItem('authData');

    if (authDataString !== null) {
      const authData = JSON.parse(authDataString);
      return authData && authData.isAdmin;
    }

    return false
  }


}



