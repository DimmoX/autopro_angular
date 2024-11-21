import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() textHeader: string = '';

  // private _contenidoHtml: SafeHtml = '';
  
  // constructor(private sanitizer: DomSanitizer) {}

  // @Input()
  // set textHeader(value: string) {
  //   this._contenidoHtml = this.sanitizer.bypassSecurityTrustHtml(value);
  // }

  // get contenidoHtml(): SafeHtml {
  //   return this._contenidoHtml;
  // }
}
