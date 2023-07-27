import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInFlag: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInFlag = value;
  }
}
