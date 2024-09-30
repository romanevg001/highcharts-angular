import {
  Directive,
  Optional,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: 'button[mat-button]',
  standalone: true,
  hostDirectives: [MatTooltip],
})
export class MatButtonDirective implements AfterViewInit {
  button: HTMLButtonElement = this.el.nativeElement;
  constructor(
    private userervice: UserService,

    @Optional() private el: ElementRef,
    @Optional() private renderer: Renderer2,
    @Optional() private matTooltip: MatTooltip,
    @Optional() private matButton: MatButton
  ) {
    this.matButton.disabled = !this.userervice.hasPermission();
  }

  ngAfterViewInit(): void {
    if (!this.userervice.hasPermission()) {
      this.matTooltip.message = "You don't have permission";
      this.renderer.addClass(this.button, 'modify-disable');
    }
  }
}
