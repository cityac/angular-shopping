import { Directive, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  
  @HostListener ('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor(private renderer: Renderer2) {}
}

