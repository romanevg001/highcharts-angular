import {
  Directive,
  Optional,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: 'button[mat-button]',
  standalone: true,
})
export class MatButtonDirective implements AfterViewInit {
  button: HTMLButtonElement = this.el.nativeElement;
  constructor(
    private userervice: UserService,

    @Optional() private el: ElementRef,
    @Optional() private renderer: Renderer2,
    @Optional() private matTooltip: MatTooltip
  ) {
    this.matTooltip.message = "You don't have permission";
  }

  private reject(e: MouseEvent | SubmitEvent) {
    e.stopPropagation();
    return;
  }

  ngAfterViewInit(): void {
    if (!this.userervice.hasPermission()) {
      this.button.addEventListener('click', this.reject);
      this.button.addEventListener('submit', this.reject);
      this.renderer.addClass(this.button, 'fake-disable');
      this.renderer.addClass(this.button, 'mat-mdc-button-disabled');
    }
  }
}
