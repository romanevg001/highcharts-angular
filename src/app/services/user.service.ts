import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  hasPermission(): boolean {
    return false;
  }
}
