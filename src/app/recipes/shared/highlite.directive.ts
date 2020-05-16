import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector:  '[highlighter]'
})

export class HighlightDirective {
  @HostBinding('style.opacity') opacity = "1";

  @HostListener('mouseenter') mouseover() {
    this.opacity = "0.4";
  }

  @HostListener('mouseleave') mouseleave() {
    this.opacity = "1";
  }
}