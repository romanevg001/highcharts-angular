import { Directive, Optional } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatButtonModule, MatButton } from '@angular/material/button';

@Directive({
  selector: 'button[mat-button]',
  standalone: true,
})
export class MatButtonDirective {
  constructor(
    private userervice: UserService,
    @Optional() private matButton: MatButton,

  ) {
    console.log('mat-button', this.matButton);

    
    this.matButton.disabled = !this.userervice.hasPermission()
   // this.matButton..disabled = !this.userervice.hasPermission()
  }
}
